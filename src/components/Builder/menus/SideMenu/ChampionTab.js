/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { StoreContext } from '../../../Store'
import colors from '../../../../vars/colors'

const ChampionTab = () => {
  const { state: { championSet, traitSet } } = useContext(StoreContext)

  const [champions, setChampions] = useState(Object.values(championSet))
  const [sortBy, setSortBy] = useState('name')
  const [byOrigin, setByOrigin] = useState('all')
  const [byClass, setByClass] = useState('all')

  useEffect(() => {
    let orderedChampions = Object.values(championSet)

    if (byOrigin !== 'all') {
      orderedChampions = orderedChampions.filter(champion => {
        return champion.traits.indexOf(byOrigin) !== -1
      })
    }

    if (byClass !== 'all') {
      orderedChampions = orderedChampions.filter(champion => {
        return champion.traits.indexOf(byClass) !== -1
      })
    }

    if (sortBy === 'name') {
      orderedChampions.sort((a, b) => {
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
        return 0
      })
    } else {
      orderedChampions.sort((a, b) => {
        if (a.cost > b.cost) return 1
        if (a.cost < b.cost) return -1
        return 0
      })
    }

    setChampions(orderedChampions)
  }, [sortBy, byOrigin, byClass])

  const onDragStart = (event, data) => {
    event.stopPropagation()
    event.dataTransfer.setData('newChampData', JSON.stringify(data))
    event.dataTransfer.setData('source', 'sideMenu')
  }

  const onDragOver = event => {
    event.preventDefault()
  }

  const resetFilters = () => {
    setSortBy('name')
    setByOrigin('all')
    setByClass('all')
  }

  return (
    <>
      <Form.Group>
        <Form.Label>Sort by</Form.Label>
        <Form.Row className="d-flex">
          <ToggleButtonGroup
            name="sortBy"
            type="radio"
            value={sortBy}
            onChange={val => setSortBy(val)}
            className="w-100"
          >
            <ToggleButton value="name" type="radio" name="sortBy">Name</ToggleButton>
            <ToggleButton value="cost" type="radio" name="sortBy">Cost</ToggleButton>
          </ToggleButtonGroup>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>Origin</Form.Label>
        <Form.Control
          as="select"
          custom
          value={byOrigin}
          onChange={e => setByOrigin(e.target.value)}
        >
          <option value="all">All</option>
          {
            Object.values(traitSet).map(trait => {
              if (trait.type === 'origin') {
                return (
                  <option key={trait.id} value={trait.id}>{trait.name}</option>
                )
              }
              return null
            })
          }
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Class</Form.Label>
        <Form.Control
          as="select"
          custom
          value={byClass}
          onChange={e => setByClass(e.target.value)}
        >
          <option value="all">All</option>
          {
            Object.values(traitSet).map(trait => {
              if (trait.type === 'class') {
                return (
                  <option key={trait.id} value={trait.id}>{trait.name}</option>
                )
              }
              return null
            })
          }
        </Form.Control>
      </Form.Group>
      <Form.Group className="d-flex justify-content-center mt-2">
        <Button variant="outline-danger" size="sm" onClick={resetFilters}>
          <i className="fas fa-undo-alt mr-1" />Reset filters
        </Button>
      </Form.Group>
      <div className="d-flex flex-wrap justify-content-center mt-4">
        {champions.map(champion => (
          <Item
            key={champion.id}
            draggable
            onDragStart={e => onDragStart(e, champion)}
            onDragOver={onDragOver}
            {...champion}
          />
        ))}
      </div>
    </>
  )
}

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

export default React.memo(ChampionTab)
