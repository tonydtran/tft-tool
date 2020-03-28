import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink, useRouteMatch } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'

import viewports from '../../vars/viewports'

import { FirebaseContext } from '../Firebase'
import { AuthUserContext } from '../Session'

// Documentation: https://react-bootstrap.github.io/components/navbar/#navbars-mobile-friendly

const NavBar = () => {
  const firebase = useContext(FirebaseContext)
  const authUser = useContext(AuthUserContext)

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand as={NavLink} to="/">
        TFT Tool <small className="text-muted">BETA</small>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <NavContainer>
          {
            !authUser
            ? (
                <>
                  <Link to="/signup" label="Sign up" />
                  <Link to="/signin" label="Sign in" />
                </>
              )
            : <Nav.Link onClick={firebase.doSignOut}>Logout</Nav.Link>
          }
        </NavContainer>
      </Navbar.Collapse>
    </Navbar>
  )
}

const NavContainer = styled(Nav)`
  margin-top: 0;

  @media ${viewports.mobile} {
    margin-top: 16px;
  }
`

const Link = ({ to, label }) => {
  const match = useRouteMatch(to)

  return (
    <Nav.Link active={!!match} eventKey={'#'} as={NavLink} to={to}>
      {label}
    </Nav.Link>
  )
}

export default NavBar
