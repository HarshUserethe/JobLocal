import '../App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #dfdfdf',
  boxShadow: 24,
  p: 4,
};

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
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


const handlleReg = () => {
    window.location.href = "/#register"
}


  return (
    <div className='navbar'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="btn-wrappers">
          <h3 style={{fontWeight: "500"}}>Please Log-in your account.</h3>

          </div>
          <div id='candidateLogin'  className="form-wrapper">
            <form action="">
              <TextField id="outlined-basic" size='small' label="Email" type='email' variant="outlined" style={{ width: "17.5vw" }} />
              <TextField id="outlined-basic" size='small' label="Password" type='password' variant="outlined" style={{ width: "17.5vw" }} />
              <Button variant="contained" style={{ width: "17.5vw" }}>login</Button>
              <span>forgot password? click here</span>
              <Button variant="contained" style={{ width: "17.5vw", background: "#fff", color: "#000", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                <FcGoogle style={{ fontSize: "1.2rem" }} /> Google
              </Button>
            </form>
          </div>
          
        </Box>
      </Modal>
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
          <Button  onClick={handlleReg} variant="contained" id='regButton' style={{ backgroundColor: "#384BFF", fontSize: "1rem" }}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
