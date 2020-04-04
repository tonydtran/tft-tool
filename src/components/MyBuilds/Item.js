/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import { formatDistance } from 'date-fns'
import colors from '../../vars/colors'

const Item = ({ isPublic, title, lastUpdate }) => (
  <Container>
    <div className="d-flex justify-content-between align-items-baseline">
      <div className="d-flex align-items-baseline">
        {
          isPublic
            ? <i className="fas fa-lock mr-2 text-warning" />
            : <i className="fas fa-unlock mr-2 text-info" />
        }
        <strong>
          {title}
        </strong>
      </div>
      <span className="small text-muted text-nowrap">
        {formatDistance(lastUpdate, Date.now())} ago
      </span>
    </div>
  </Container>
)

const Container = styled.div`
  margin-top: 1.25rem;
  border-radius: 0.25rem;
  border: 2px solid ${colors.secondary};
  padding: 1.25rem;

  &:hover, &:active {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    cursor: pointer;
  }
`

export default Item
