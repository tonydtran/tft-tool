import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Card } from 'react-bootstrap'
import styled from 'styled-components'

import { StoreContext } from '../../Store'
import { countTraits } from '../../../helpers/board'
import colors from '../../../vars/colors'

const Traits = ({ id, board, className }) => {
  const { state: { viewport } } = useContext(StoreContext)
  const traits = countTraits(board)

  return (
    <Container className={className} viewport={viewport}>
      {
        traits.map(trait => {
          const levelStyle = trait.levels.filter(level => level.isActive)[0]
          return (
            <Trait key={`${id}-${trait.id}`}>
              <TraitIcon
                levelStyle={levelStyle}
                image={trait.image}
              />
              <Count>{trait.count}</Count>
              <TraitDetails>
                <p className="mb-1">{trait.name}</p>
                <p>
                  {
                    trait.levels.map((level, index) => (
                      <Level key={`${id}-${trait.id}-${index}`} isActive={level.isActive}>
                        {level.min}<i className="fas fa-angle-right" />
                      </Level>
                    ))
                  }
                </p>
              </TraitDetails>
            </Trait>
          )
        })
      }
    </Container>
  )
}

export const CollaspableTraits = ({ className, ...rest }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Accordion className={className}>
      <Card bg="dark">
        <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => setExpanded(!expanded)}>
          <CollapseToggle expanded={expanded}>
            <p className="font-weight-bold m-0">Synergies</p>
            <i className="fas fa-caret-down fa-lg" />
          </CollapseToggle>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-0">
            <Traits {...rest} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

const Container = styled.div`
  background-color: ${colors.dark};
  padding: 1rem;
  border-radius: 4px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-columns: ${({ viewport }) => viewport === 'desktop' ?  '1fr 1fr' : '1fr'};
  grid-auto-rows: auto;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
`

const Trait = styled.div`
  display: flex;
  width: 100%;
`

const TraitIcon = styled.div`
  box-shadow: 0 0 0 1px black;
  border-radius: 4px;
  background-color: ${({ levelStyle }) => (
    levelStyle
      ? colors[levelStyle.style]
      : colors['trait-default']
  )};
  min-width: 40px;
  height: 40px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
`

const Count = styled.div`
  font-family: Open Sans;
  font-weight: bold;
  margin: 0 0 0 0.5rem;
  border-radius: 4px;
  background-color: ${colors.gray};
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  max-height: 40px;
`

const TraitDetails = styled.div`
  margin-left: 0.5rem;
  font-size: 0.9rem;
  background-color: ${colors.secondary};
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  width: 100%;
  max-height: 40px;

  p {
    margin: 0;
    line-height: 0.9rem;
  }
`

const Level = styled.span`
  font-family: Open Sans;
  font-size: 0.8rem;
  font-weight: ${({ isActive }) => isActive ? 'bolder' : 'lighter'};
  color: ${({ isActive }) => isActive ? colors.white : colors.gray};

  i {
    font-weight: 600;
    margin: 0 0.5rem;
    color: ${colors.gray};
  }

  &:last-child {
    i {
      display: none;
    }
  }
`

const CollapseToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  i {
    transition: 300ms;
    ${({ expanded }) => expanded ? 'transform: rotate(180deg)' : null};
  }

  &:hover {
    cursor: pointer;
  }
`

Traits.propTypes = {
  id: PropTypes.string,
  board: PropTypes.object,
}

export default Traits