import '../App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate, Navigate } from "react-router-dom";
import LoginForm from './LoginForm';
import RegForm from './RegForm';



const TopNavigation = () => {

  const navigate = useNavigate();

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
  

  const handleOpen = () => {
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userid'); 
      // Check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true; // No token, treat as expired

    try {
      const decoded = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Get current time in seconds
      return decoded.exp < currentTime; // Compare token expiration with current time
    } catch (error) {
      return true; // If token is invalid or can't be decoded, treat it as expired
    }
  };

  isTokenExpired();
  // If the token is expired, remove it from localStorage and redirect to login
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token'); 
    setOpen(true)
    return (
      <>
        <Navigate to="/" 
          state={{ message: 'Session expired. Please log in again.' }}
        />;
        
      </>
    ) // Redirect to login page
  }


  navigate(`/dashboard/${userid}`);

  };
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
