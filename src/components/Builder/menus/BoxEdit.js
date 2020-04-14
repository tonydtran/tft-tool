import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { StoreContext } from '../../Store'
import colors from '../../../vars/colors'

const BoxEdit = ({ id: boxId, row, onBoxUpdate, champ = {}, items = [], carry }) => {
  const { state: { championSet, itemSet, traitSet } } = useContext(StoreContext)
  const [currentBox, setCurrentBox] = useState({ boxId, row, champ, items, carry })

  const toggleChamp = newChamp => {
    setCurrentBox({
      ...currentBox,
      champ: newChamp.id === currentBox.champ.id ? {} : newChamp,
      carry: newChamp.id === currentBox.champ.id ? false : carry
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

  const toggleCarry = event => {
    setCurrentBox({
      ...currentBox,
      carry: event.target.checked
    })
  }

  const reset = () => {
    setCurrentBox({
      ...currentBox,
      champ: {},
      items: [],
      carry: false
    })
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
        {
          currentBox.champ.id && (
            <Section>
              <strong>Selection</strong>
              <Selection>
                <div className="d-flex justify-content-around mb-3">
                  <div className="d-flex flex-column align-items-center">
                    <StaticItem image={championSet[currentBox.champ.id].image} className="box-edit-selection" />
                    <div className="d-flex mt-2 ml-0">
                      {
                        championSet[currentBox.champ.id].traits.map(trait => (
                          <Trait key={trait} image={traitSet[trait].image} />
                        ))
                      }
                    </div>
                  </div>
                  {
                    (currentBox.items.length > 0 || currentBox.carry) && (
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex">
                          {
                            currentBox.items.map(item => (
                              <StaticItem key={item} image={itemSet[item].image} className="box-edit-selection" />
                            ))
                          }
                        </div>
                        {
                          currentBox.carry && (
                            <Label>
                              <i className="fas fa-crown mr-2" />CARRY
                            </Label>
                          )
                        }
                      </div>
                    )
                  }
                </div>
                <div className="d-flex justify-content-center">
                  <Button variant="outline-danger" size="sm" onClick={reset}>
                    <i className="fas fa-undo-alt mr-1" />Reset
                  </Button>
                </div>
              </Selection>
            </Section>
          )
        }
        <Section>
          <div className="d-flex justify-content-between">
            <strong>Select champion</strong>
            <Checkbox
              type="switch"
              name="carry"
              id="carry"
              label="Carry"
              disabled={!champ.id}
              onChange={toggleCarry}
              checked={currentBox.carry}
            />
          </div>
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
          currentBox.champ.id && (
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
    margin-top: 1.5rem;
  }
`

const Selection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: ${colors.secondary};
  margin-top: 1rem;

  .box-edit-selection {
    border-radius: 0.25rem;
    box-shadow: 0 0 0 2px ${colors.dark};

    & + * {
      margin-left: 0.5rem;
    }
  }
`

const Label = styled.div`
  padding: 0.25rem 1rem 0.25rem;
  background-color: ${colors.yellow};
  color: ${colors.white};
  font-weight: bolder;
  line-height: 16px;
  vertical-align: middle;
  border-radius: 16px;
  margin-top: 0.75rem;
`

const Checkbox = styled(Form.Check)`
  input, label {
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
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
  transition: transform 300ms;

  &:hover {
    transform: scale(1.1);
    filter: none;
    box-shadow: 0 0 1px 4px ${colors.success};
    z-index: 2;
    cursor: pointer;
  }
`

const StaticItem = styled.div`
  width: 3rem;
  height: 3rem;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  margin: 2px;
  border-radius: 2px;
`

const Trait = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  margin-top: 0.20rem;

  & + * {
    margin-left: 0.5rem;
  }
`

export default React.memo(BoxEdit)
