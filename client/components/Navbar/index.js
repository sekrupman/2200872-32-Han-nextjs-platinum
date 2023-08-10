import React, { useState, useEffect } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import Image from 'next/image';

//import api
import { UserTotalScore } from '../../api/userGamesApi';

function navbar(args){
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [activeToken, setActiveToken] = useState({data: []})
   const [totalSkor, setTotalSkor] = useState(0);

  useEffect(() => {
    try {
        const id = localStorage.getItem('tokenId')
        const username = localStorage.getItem('tokenUsername')
        const avatar = localStorage.getItem('tokenAvatar')

        if (username) {
            const newToken = {id, username, avatar}
            setActiveToken({data: newToken})

            UserTotalScore(id).then(async (result) => {
                if (result!== undefined) {
                    setTotalSkor(Number(result.data))
                }
            })
        } 
    } catch (error) {
        console.log(error)
    }
}, []); 

async function handleSubmit() {
    await localStorage.removeItem('tokenId');
    await localStorage.removeItem('tokenUsername');
    await localStorage.removeItem('tokenAvatar');
    await window.location.replace('/')
}
    return(
        <div>
      <Navbar  style={{ backgroundColor: '#4E67EB' }} dark expand="md">
    <NavbarBrand href="/"><Image src="/images/logo.jpeg" width={50} height={50} /></NavbarBrand>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>
      <Nav className="left-panel" navbar>
        <NavItem>
          <NavLink href="/community">Community</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about-us">About Us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/share">Share</NavLink>
        </NavItem>            
      </Nav>
    </Collapse>
      
    {activeToken.data.username ? 
  <Nav className='right-panel' dark expand="md">
    <NavItem>
      <img src={activeToken.data.avatar} alt="" width={50} height={50} />
    </NavItem>
    <NavItem>
      <NavLink className="text-white">Hello, {activeToken.data.username}</NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="text-white">Your Score: {totalSkor}</NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="text-white" onClick={handleSubmit}style={{ cursor: 'pointer' }}
    onMouseOver={(e) => e.target.style.cursor = 'pointer'}
    onMouseOut={(e) => e.target.style.cursor = 'auto'}>
        Logout
      </NavLink>
    </NavItem>
  </Nav>
 : (
    <div>
        <Nav>
        <NavItem>
  <NavLink className="text-white">Hello, Guest</NavLink>
</NavItem>
    <NavItem>
          <NavLink href="/LoginPage "className="text-white" >Login</NavLink>
        </NavItem>
    <NavItem>
          <NavLink href="/RegisterPage" className="text-white">Register</NavLink>
        </NavItem>
        </Nav>
</div>
)}
</Navbar>
    </div>
    )
}

export default navbar