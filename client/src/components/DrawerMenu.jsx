import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "../App.css";
import DescriptionIcon from '@mui/icons-material/Description';
import HelpIcon from '@mui/icons-material/Help';
import Person4Icon from '@mui/icons-material/Person4';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';

const DrawerMenu = ({setState}) => {

  const items = [
    // ['Resume', 'Credits', 'Update Info', 'Support', 'Logout']
    {name: "Home", icon: <HomeIcon />},
    {name: 'Resume', icon: <DescriptionIcon />},
    {name: 'Credits', icon: <LocalOfferIcon />},
    {name: 'Update Info', icon: <Person4Icon />},
    {name: 'Support', icon: <HelpIcon />},
    {name: 'Logout', icon: <LogoutIcon />},
  ]

const [activeItem, setActiveItem] = useState('Home');


  const handlePropState = (name) => {
   setState(name)
   setActiveItem(name)
  }

  return (
    <div>
      <div className="dr-lable" style={{fontSize:"1.2rem", fontWeight:"500"}}>Quick Links</div>
      <div className="menu-area">
      <List>
        {items.map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton onClick={() => handlePropState(text.name)} 
            >
              <ListItemIcon className='listIcons' style={{ color: activeItem === text.name ? '#ff8a00' : '#000'}}>
               {text.icon}
              </ListItemIcon>
              <ListItemText className='listItemText' primary={text.name} 
                style={{
                  color: activeItem === text.name ? '#ff8a00' : '#000', // Change color if active
                  textTransform: "capitalize",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* <div className="branding">
        <div className="logo-space" style={{fontSize:".7rem", width:"100%", justifyContent:"start", opacity:"70%", height:"10%"}}>
          <span>JOBS</span><span>LOCAL</span>
        </div>
        <p style={{fontSize:".6rem", color:"gray"}}>Local Jobs, Bright Careers</p>
       
      </div> */}
      </div>
    </div>
  )
}

DrawerMenu.PropTypes= {
setState: PropTypes.func.isRequired,
}

export default DrawerMenu
