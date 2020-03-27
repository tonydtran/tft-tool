import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'

// Documentation: https://react-bootstrap.github.io/components/navbar/#navbars-mobile-friendly

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="#home">
        TFT Tool <small className="text-muted">BETA</small>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <Link to="/signup" label="Sign up" />
          <Link to="/signin" label="Sign in" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Link = ({ to, label }) => {
  const match = useRouteMatch(to)

  return (
    <Nav.Link active={!!match} eventKey={'#'} as={NavLink} to={to}>
      {label}
    </Nav.Link>
  )
}

export default NavBar
