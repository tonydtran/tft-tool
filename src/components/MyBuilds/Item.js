/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import { formatDistance } from 'date-fns'
import colors from '../../vars/colors'

const Item = ({ id, isPublic, title, lastUpdate, onClick }) => (
  <Container onClick={() => onClick(id)}>
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
  box-shadow: 0 0 0 2px ${colors.secondary};
  padding: 1.25rem;

  &:hover, &:active {
    background-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primary};
    cursor: pointer;
  }
`

export default Item
