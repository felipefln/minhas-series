import React, { useState } from 'react'
import { 
  Navbar, 
  NavbarBrand, 
  Collapse, 
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} 
  from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  const [open, setOpen ] =useState(false)
  const toggle = () => {
    setOpen(!open)
  }
  return (
    <Navbar color='light' light expand='md'>
      <div className='container'>
        <NavbarBrand tag={Link} to='/'>Minhas Series</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={open} navbar>
            <Nav className='ml-auto'>
              <NavItem>
                <NavLink href='/series'>
                  Séries
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/generos'>
                  Genêros
                </NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </div>
      </Navbar>
  )
}

export default Header;