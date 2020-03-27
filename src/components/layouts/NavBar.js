import React from 'react'
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
          <Nav.Link href="#">Sign in</Nav.Link>
          <Nav.Link href="#">Sign up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
