import '../App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";
import LoginForm from './LoginForm';
import RegForm from './RegForm';



const TopNavigation = () => {

  //NAVIGATION LIST ----->
  const navigationList = [
    {name: "Home", url:"/"},
    {name: "Feature", url:"#feature"},
    {name: "About", url:"#about"},
    {name: "Pricing", url:"#pricing"},
    {name: "Contact", url:"#contact"},
    
  ]

  const [open, setOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleRegOpen = () => setRegOpen(true);
  const handleRegClose = () => setRegOpen(false);





  return (
    <div className='navbar'>
    <LoginForm handleClose = {handleClose} open={open} />
    <RegForm handleRegClose = {handleRegClose} regOpen = {regOpen} />
      <div className="cont-wrapper">
        <div className="logo-space">
          <span>JOBS</span> <span>LOCAL</span>
        </div>
        <div className="nav-menu">
        
        {
          navigationList.map((navlist, index) => (
          <li key={index} className='list-ls'>
          <Link to={navlist.url} className="navlist-col">
            {navlist.name}
          </Link>
          </li>
          ))
        }

          {/* <li>
          <NavLink to="/" className={({isActive, isPending}) => isPending ? "pending" : isActive ? "active" : " "}>
            Home
          </NavLink>
          </li> */}

        </div>
        <div className="acc-buttons">
          <Button  onClick={handleOpen} style={{ color: "#000", fontSize: "1rem"}} id='loginbutton'>Login</Button>
          <Button  onClick={handleRegOpen} variant="contained" id='regButton' style={{ backgroundColor: "#384BFF", fontSize: "1rem" }}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
