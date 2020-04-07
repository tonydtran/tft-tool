import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import colors from '../../../vars/colors'
import championSet from '../../../data/champions.json'
import itemSet from '../../../data/items.json'

const ChampEdit = ({ id: boxId, row, onBoxUpdate, champ = {}, items = [], carry }) => {
  const [currentBox, setCurrentBox] = useState({ boxId, row, champ, items, carry })

  const toggleChamp = newChamp => {
    setCurrentBox({
      ...currentBox,
      champ: newChamp.id === currentBox.champ.id ? {} : newChamp
    })
  }

  const toggleItems = item => {
    if (currentBox.items.indexOf(item.id) !== -1) {
      setCurrentBox({
        ...currentBox,
        items: currentBox.items.filter(currentItems => currentItems !== item.id)
      })
    } else {
      if (items.length <= 3) {
        setCurrentBox({
          ...currentBox,
          items: [...currentBox.items, item.id]
        })
      }
    }
  }

  useEffect(() => {
    onBoxUpdate(currentBox)
  }, [onBoxUpdate, currentBox])

  return (
    <>
      <Header className="bg-secondary" closeButton>
        <Modal.Title>
          <i className="fas fa-edit mr-2" /> Box edit
        </Modal.Title>
      </Header>
      <Modal.Body className="bg-dark">
        <Section>
          <strong>Select champion</strong>
          <ItemsContainer>
            {
              Object.values(championSet).map(champion => {
                const active = champion.id === currentBox.champ.id
                const grayed = currentBox.champ.id && (champion.id !== currentBox.champ.id)
                return (
                  <Item
                    key={champion.id}
                    onClick={() => toggleChamp(champion)}
                    active={active}
                    grayed={grayed}
                    {...champion}
                  />
                )
              })
            }
          </ItemsContainer>
        </Section>
        {
          champ.id && (
            <Section>
              <strong>Select items</strong>
              <ItemsContainer>
                {
                  Object.values(itemSet).map(item => {
                    const active = currentBox.items.indexOf(item.id) !== -1
                    const grayed = !active && currentBox.items.length === 3
                    return (
                      <Item
                        key={item.id}
                        onClick={() => toggleItems(item)}
                        active={active}
                        grayed={grayed}
                        {...item}
                      />
                    )
                  })
                }
              </ItemsContainer>
            </Section>
          )
        }
      </Modal.Body>
    </>
  )
}

const Header = styled(Modal.Header)`
  button {
    font-size: 2rem;
  }
`

const Section = styled.div`
  & + * {
    margin-top: 2rem;
  }
`

const ItemsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Item = styled.div`
  width: 3rem;
  height: 3rem;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  box-shadow: ${({ active }) => active ? `0 0 1px 4px ${colors.success}`: null };
  transform: ${({ active }) => active ? 'scale(1.1)' : null };
  z-index: ${({ active }) => active ? 2 : 'auto' };
  filter: ${({ grayed }) => grayed ? 'grayscale(100)' : null };
  margin: 2px;
  border-radius: 2px;
`

export default React.memo(ChampEdit)
