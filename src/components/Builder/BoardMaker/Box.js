import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Hexagon from 'react-hexagon'

import colors from '../../../vars/colors'
import { StoreContext } from '../../Store'

const Box = ({ data, boardId, onChange, onClick, canAddChamp }) => {
  const store = useContext(StoreContext)
  const { addMessage, state: { itemSet } } = store

  const [dragHovering, setDragHovering] = useState(false)

  const onDragStart = event => {
    event.stopPropagation()
    event.dataTransfer.setData('originData', JSON.stringify(data))
    event.dataTransfer.setData('originBoardId', boardId)
  }

  const onDragOver = event => {
    event.preventDefault()
    if (!dragHovering) setDragHovering(true)
  }

  const onDrop = event => {
    const originData = event.dataTransfer.getData('originData')
    const originBoardId = event.dataTransfer.getData('originBoardId')
    onChange(JSON.parse(originData), data, originBoardId)
    setDragHovering(false)
  }

  const onDragEnter = event => {
    event.preventDefault()
  }

  const onDragLeave = event => {
    event.preventDefault()
    setDragHovering(false)
  }

  const onBoxClick = () => {
    if (canAddChamp || (data.champ && data.champ.id)) {
      onClick({ ...data })
    } else {
      addMessage(
        'Limit reached',
        'Be realistic... you cannot put more than 10 champs on the board!',
        3000
      )
    }
  }

  return (
    <Container
      draggable={!!data.champ}
      onDragStart={e => onDragStart(e)}
      onDrop={e => onDrop(e)}
      onDragOver={e => onDragOver(e)}
      onDragEnter={e => onDragEnter(e)}
      onDragLeave={e => onDragLeave(e)}
      dragHovering={dragHovering}
      onClick={onBoxClick}
      {...data}
    >
      <HexContainer
        backgroundImage={data.champ ? data.champ.image : null}
        backgroundScale={1.01}
        champ={data.champ}
        dragHovering={dragHovering}
      />
      <ItemContainer carry={data.carry}>
        {
          data.items && data.items.map(item => (
            <Item
              key={`${data.champ.id}-${item}`}
              image={itemSet[item].image}
              onClick={() => console.log('delete')}
            />
          ))
        }
      </ItemContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  transition: transform 300ms;

  &:hover, &:active {
    transform: scale(1.1);
    z-index: 2;
    cursor: grab;
  }
`

const HexContainer = styled(Hexagon)`
  width: 100%;

  polygon {
    stroke-width: 16px !important;
    fill: ${({ backgroundImage, dragHovering, champ }) => {
      if (dragHovering) {
        return `${colors.primary} !important`
      } else {
        if (backgroundImage) {
          return undefined
        } else {
          return `${colors.dark} !important`
        }
      }
    }};
    stroke: ${({ champ }) => {
      if (champ) {
        switch (champ.cost) {
          case 2: return `${colors.cost2} !important;`
          case 3: return `${colors.cost3} !important;`
          case 4: return `${colors.cost4} !important;`
          case 5: return `${colors.cost5} !important;`
          default: return `${colors.cost1} !important;`
        }
      } else {
        return `${colors.secondary} !important;`
      }
    }};
  }
`

const ItemContainer = styled.div`
  position: absolute;
  width: 120%;
  height: 34%;
  top: 85%;
  left: -10%;
  display: flex;
  justify-content: center;
  ${'' /* z-index: ${({ carry }) => carry ? '3' : 'auto'}; */}
`

const Item = styled.div`
  display: block;
  width: calc(100% / 3);
  height: 100%;
  border-radius: 50%;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 0 0 1px ${colors.gray};

  &:hover {
    cursor: no-drop;
    box-shadow: 0 0 0 1px ${colors.gray},
      inset 0 0 0 15px rgba(231, 76, 60, 0.5);
  }

  & + * {
    margin-left: 2px;
  }
`

Box.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default React.memo(Box)
