import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FcGoogle } from "react-icons/fc";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import '../App.css'
import { border, borderRadius } from '@mui/system';
import { account } from '../appWrite/services';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: "1px solid #ff8a00",
    borderRadius:"10px",
  };

const LoginForm = ({handleClose, open}) => {

  const navigate = useNavigate();

  const [err2, setErr2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());

    const promise = account.createEmailPasswordSession(
      formObj.email,
      formObj.password
    )

    promise.then(
       response => {
        console.log(response)
        const userId = response.$id; // Get the user ID
        navigate(`/dashboard/${userId}`); // Redirect to dashboard with user ID
       }, 
       error => {
        console.log(error)
        setErr2(error.message); 
       }
      )
   
  }

  return (
    <div>
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
            <form action="" onSubmit={handleSubmit}>
              <TextField id="outlined-basic" size='small' name='email' label="Email" type='email' variant="outlined" style={{ width: "17.5vw" }} />
              <TextField id="outlined-basic" size='small' name='password' label="Password" type='password' variant="outlined" style={{ width: "17.5vw" }} />
              <div className="error" style={{display: err2 ? "block" : "none"}}>{err2}</div>
              <Button variant="contained" style={{ width: "17.5vw" }}>login</Button>
              <span>forgot password? click here</span>
              <Button className='googleBtn' type='submit' variant="contained" style={{ width: "17.5vw", background: "#fff", color: "#000", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                <FcGoogle style={{ fontSize: "1.2rem" }} /> Google
              </Button>
            </form>
          </div>
          
        </Box>
      </Modal>
    </div>
  )
}

LoginForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,        
  };

export default LoginForm
