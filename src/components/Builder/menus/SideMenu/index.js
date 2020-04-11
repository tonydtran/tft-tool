/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'

import colors from '../../../../vars/colors'

import ChampionTab from './ChampionTab'

const SideMenu = () => {
  const [activeTab, setActiveTab] = useState('champions')

  return (
    <Container bg="drak">
      <Card.Header>
        <Nav variant="tabs" fill>
          <Nav.Item>
            <Link
              active={activeTab === 'champions'}
              onClick={() => setActiveTab('champions')}
            >
              Champions
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              active={activeTab === 'items'}
              onClick={() => setActiveTab('items')}
            >
              Items
            </Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column">
          <div className={activeTab === 'champions' ? 'd-block' : 'd-none'}>
            <ChampionTab />
          </div>
        </div>
      </Card.Body>
    </Container>
  )
}

const Container = styled(Card)`
  width: 100%;
`

const Link = styled(Nav.Link)`
  background-color: ${({ active }) => active ? colors.dark : 'transparent'} !important;

  &:hover {
    background-color: ${({ active }) => active ? colors.dark : colors.gray} !important;
  }
`

export default React.memo(SideMenu)
