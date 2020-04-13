/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'

import { StoreContext } from '../../../Store'
import colors from '../../../../vars/colors'

const ItemTab = () => {
  const { state: { itemSet } } = useContext(StoreContext)

  const baseComponents = useMemo(() => {
    return Object.values(itemSet).reduce((acc, item) => {
      if (item.id < 10) {
        return {
          ...acc,
          [item.id]: item
        }
      } else {
        return {...acc}
      }
    }, {})
  }, [itemSet])

  const completeItems = useMemo(() => {
    return Object.values(itemSet).filter(item => item.id > 10)
  }, [itemSet])

  const [filter, setFilter] = useState()
  const [items, setItems] = useState(completeItems)

  useEffect(() => {
    let filteredItems = completeItems

    if (filter) {
      filteredItems = filteredItems.filter(item => {
        return `${item.id}`.includes(`${filter}`)
      })
    }

    setItems(filteredItems)
  }, [filter])

  const toggleFilter = componentId => {
    setFilter(filter === componentId ? null : componentId)
  }

  const onDragStart = (event, data) => {
    event.stopPropagation()
    event.dataTransfer.setData('newItem', JSON.stringify(data.id))
    event.dataTransfer.setData('source', 'itemTab')
  }

  const onDragOver = event => {
    event.preventDefault()
  }

  return (
    <>
      <p className="mb-0">Sort by base component</p>
      <ItemContainer className="mt-2">
        {
          Object.values(baseComponents).map(component => (
            <Item
              key={component.name}
              onClick={() => toggleFilter(component.id)}
              active={component.id === filter}
              inactive={!!filter && (component.id !== filter)}
              {...component}
            />
          ))
        }
      </ItemContainer>
      <ItemContainer>
        {
          items.map(item => (
            <Item
              key={item.name}
              draggable
              onDragStart={e => onDragStart(e, item)}
              onDragOver={onDragOver}
              {...item}
            />
          ))
        }
      </ItemContainer>
    </>
  )
}

const ItemContainer = styled.div`
  padding: 1rem;
  background-color: ${colors.secondary};
  border-radius: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1.5rem;
`

const Item = styled.div`
  ${({ draggable }) => {
    if (draggable) {
      return `
        width: 4vw;
        max-width: 3.5rem;
        height: 4vw;
        max-height: 3.5rem;
      `
    } else {
      return `
        width: 3vw;
        max-width: 3rem;
        height: 3vw;
        max-height: 3rem;
      `
    }
  }};
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  margin: 4px;
  border-radius: 2px;
  transition: transform 300ms;
  ${({ active }) => active
    ? `box-shadow: 0 0 1px 4px ${colors.success}`
    : undefined
  };
  ${({ inactive }) => inactive
    ? 'filter: grayscale(100%)'
    : undefined
  };

  &:hover, &:active {
    transform: scale(1.1);
    box-shadow: 0 0 1px 4px ${colors.success};
    z-index: 2;
    ${({ draggable, active }) => draggable
      ? 'cursor: grab'
      : active
        ? 'cursor: no-drop'
        : 'cursor: pointer'
    };
  }
`

export default React.memo(ItemTab)
