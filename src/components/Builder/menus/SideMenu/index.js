import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'

import { StoreContext } from '../../../Store'
import colors from '../../../../vars/colors'

const SideMenu = () => {
  const { state: { championSet } } = useContext(StoreContext)

  const onDragStart = (event, data) => {
    event.stopPropagation()
    event.dataTransfer.setData('newChampData', JSON.stringify(data))
    event.dataTransfer.setData('source', 'sideMenu')
  }

  const onDragOver = event => {
    event.preventDefault()
  }

  return (
    <Container bg="drak">
      <Card.Body>
        <div className="d-flex flex-column">
          <div className="d-flex flex-wrap justify-content-center">
            {Object.values(championSet).map(champion => (
              <Item
                key={champion.id}
                draggable
                onDragStart={e => onDragStart(e, champion)}
                onDragOver={e => onDragOver(e)}
                {...champion}
              />
            ))}
          </div>
        </div>
      </Card.Body>
    </Container>
  )
}

const Container = styled(Card)`
  max-width: 40rem;
`

const Item = styled.div`
  width: 5vw;
  max-width: 4rem;
  height: 5vw;
  max-height: 4rem;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  margin: 4px;
  border-radius: 2px;
  transition: transform 300ms;

  &:hover, &:active {
    transform: scale(1.1);
    cursor: grab;
    box-shadow: 0 0 1px 4px ${colors.success};
    z-index: 2;
  }
`

export default React.memo(SideMenu)