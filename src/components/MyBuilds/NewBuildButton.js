/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import colors from '../../vars/colors'

const NewBuildButton = ({ large }) => {
  const history = useHistory()

  const onClick = () => {
    history.push('/builds/new')
  }

  const iconCn = large
    ? 'fas fa-plus-circle fa-3x mb-3'
    : 'fas fa-plus-circle mr-2'

  return (
    <Container large={large} onClick={onClick}>
      <i className={iconCn} />
      <strong>Start a new build</strong>
    </Container>
  )
}

const Container = styled.div`
  box-shadow: 0 0 0 2px ${colors.primary};
  border-radius: 0.25rem;
  padding: ${({ large }) => large
    ? '3rem 1rem'
    : '1rem'
  };
  display: flex;
  flex-direction: ${({ large }) => large
    ? 'column'
    : 'row'
  };
  align-items: center;
  justify-content: center;
  background-color: ${colors.secondary};
  color: ${colors.info};

  &:hover, &:active {
    transform: scale(1.05);
    cursor: pointer;
    transition: transform 300ms;
    background-color: ${colors.light};
    color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.light};
  }
`

export default NewBuildButton
