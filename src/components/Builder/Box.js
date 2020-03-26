import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
    />
  )
}

const Container = styled.div`
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
  transform: ${({ dragHovering }) => dragHovering ? 'scale(1.3)' : 'none'};

  &:hover {
    transform: ${({ dragHovering, champ }) => !dragHovering ? 'scale(1.1)' : 'none'}
  }
`

Box.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default React.memo(Box)
