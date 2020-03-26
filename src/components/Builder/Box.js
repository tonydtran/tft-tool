import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import itemsDataset from '../../data/items.json'

const Box = ({ data, onChange }) => {
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
      {...data}
    >
      <ItemContainer>
        {
          data.items.map(item => (
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
  display: block;
  height: 2.4rem;
  width: 2.4rem;
  background-color: #767D92;
  box-shadow: ${({ champ }) => {
    if (champ) {
      switch (champ.cost) {
        case 2: return `0 0 1px 3px #11b288;`
        case 3: return `0 0 1px 3px #207ac7;`
        case 4: return `0 0 1px 3px #c440da;`
        case 5: return `0 0 1px 3px #ffb93b;`
        default: return `0 0 1px 3px grey;`
      }
    } else {
      return `0 0 2px 2px black;`
    }
  }};
  border-radius: 2px;
  background-image: ${({ champ }) => champ ? `url(${champ.image})` : ''};
  background-size: contain;
  transform: ${({ dragHovering, carry }) => {
    if (dragHovering) return 'scale(1.3)'
    if (carry) return 'scale(1.2)'
    return 'none'
  }};
  z-index: ${({ carry }) => carry ? '1' : 'auto' };

  &:hover {
    transform: ${({ dragHovering }) => !dragHovering ? 'scale(1.1)' : 'none'};
    z-index: 2;
  }

  &:active {
    transform: scale(1.1);
    z-index: 2;
  }
`

const ItemContainer = styled.div`
  position: absolute;
  bottom: -0.4rem;
  display: flex;
  justify-content: center;
`

const Item = styled.div`
  display: block;
  height: 0.8rem;
  width: 0.8rem;
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
