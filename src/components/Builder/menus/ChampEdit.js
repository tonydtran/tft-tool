import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import colors from '../../../vars/colors'
import champions from '../../../data/champions.json'

const ChampEdit = ({ id: boxId, row, onBoxUpdate, champ = {} }) => {
  const toggleChamp = newChamp => {
    onBoxUpdate({
      boxId,
      row,
      champ: newChamp.id === champ.id ? {} : newChamp
    })
  }

  return (
    <>
      <Header className="bg-secondary" closeButton>
        <Modal.Title>
          <i className="fas fa-edit mr-2" /> Box edit
        </Modal.Title>
      </Header>
      <Modal.Body className="bg-dark">
        <strong>Select champion</strong>
        <ChampionsContainer>
          {
            Object.values(champions).map(champion => (
              <Champion
                key={champion.id}
                onClick={() => toggleChamp(champion)}
                active={champion.id === champ.id}
                {...champion}
              />
            ))
          }
        </ChampionsContainer>
      </Modal.Body>
    </>
  )
}

const Header = styled(Modal.Header)`
  button {
    font-size: 2rem;
  }
`

const ChampionsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Champion = styled.div`
  width: 3rem;
  height: 3rem;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  box-shadow: ${({ active }) => active ? `0 0 1px 4px ${colors.success}`: null };
  transform: ${({ active }) => active ? 'scale(1.1)' : null };
  margin: 2px;
  border-radius: 2px;
`

export default React.memo(ChampEdit)
