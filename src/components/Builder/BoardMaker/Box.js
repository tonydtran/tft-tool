import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Hexagon from 'react-hexagon'

import itemsDataset from '../../../data/items.json'
import colors from '../../../vars/colors'

const Box = ({ data, onChange, onClick }) => {
  const [dragHovering, setDragHovering] = useState(false)

  const onDragStart = event => {
    event.dataTransfer.setData('originData', JSON.stringify(data))
  }

  const onDragOver = event => {
    event.preventDefault()
  }

  const onDrop = event => {
    const originData = event.dataTransfer.getData('originData')
    onChange(JSON.parse(originData), data)
    setDragHovering(false)
  }

  const onDragEnter = event => {
    event.preventDefault()
    setDragHovering(true)
  }

  const onDragLeave = event => {
    event.preventDefault()
    setDragHovering(false)
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
      onClick={() => onClick({...data})}
      {...data}
    >
      <HexContainer
        backgroundImage={data.champ ? data.champ.image : null}
        backgroundScale={1.01}
        champ={data.champ}
      />
      <ItemContainer>
        {
          data.items && data.items.map(item => (
            <Item
              key={`${data.champ.id}-${item}`}
              image={itemsDataset[item].image}
            />
          ))
        }
      </ItemContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  transform: ${({ dragHovering, carry }) => {
    if (dragHovering) return 'scale(1.3)'
    if (carry) return 'scale(1.2)'
    return 'none'
  }};
  z-index: ${({ carry }) => carry ? '1' : 'auto'};

  &:hover {
    transform: ${({ dragHovering }) => !dragHovering ? 'scale(1.1)' : 'none'};
    z-index: 2;
  }

  &:active {
    transform: scale(1.1);
    z-index: 2;
  }
`

const HexContainer = styled(Hexagon)`
  width: 10vw;

  polygon {
    stroke-width: 16px !important;
    fill: ${({ backgroundImage }) => backgroundImage ? null : `${colors.dark} !important`};
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
  width: 100%;
  bottom: -0.6vw;
  display: flex;
  justify-content: center;
`

const Item = styled.div`
  display: block;
  height: 3vw;
  width: 3vw;
  border-radius: 2px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: contain;
  background-position: center;
  box-shadow: inset 0 0 1px 0 white;
`

Box.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default React.memo(Box)
