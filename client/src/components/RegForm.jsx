import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FcGoogle } from "react-icons/fc";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import '../App.css'
import { useState } from 'react';
import { account } from '../appWrite/services';
import { ID } from 'appwrite';
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

const RegForm = ({handleRegClose,regOpen}) => {

  const navigate = useNavigate();

  const [err, setErr] = useState('')
  const [err2, setErr2] = useState('');

  const checkPhoneNumber = (value) => {
   if(value.length === 10){
    setErr('');
   }else{
    setErr("Please enter valid phone number.")
   }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const form = e.target;
      const formData = new FormData(form);
      const formObj = Object.fromEntries(formData.entries());
  
      if (formObj.phone.length !== 10 || formObj.phone.length < 10) {
        setErr2('Invalid information, please check it again.');
      } else {
        const userID = ID.unique();
  
        // Use await to handle the account.create method
        const response = await account.create(
          userID,
          formObj.email,
          formObj.password,
          formObj.phone,
          formObj.fullname
        );
  
        console.log(response);
        const userId = response.$id; // Get the user ID
        navigate(`/dashboard/${userId}`); // Redirect to dashboard with user ID
      }
    } catch (error) {
      console.log(error);
      setErr2(error.message); // Handle the error
    }
  };



  return (
    <div>
        <Modal
        open={regOpen}
        onClose={handleRegClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="btn-wrappers">
          <h3 style={{fontWeight: "500"}}>Please create your account.</h3>

          </div>
          
          <div id='candidateLogin'  className="form-wrapper">
            <form action="" onSubmit={handleSubmit}>
            <TextField id="outlined-basic" size='small' name='fullname' label="Full Name" type='text' variant="outlined" style={{ width: "17.5vw" }} required />
            <TextField  onChange={(e) => checkPhoneNumber(e.target.value)} name='phone' id="outlined-basic" size='small' label="Phone Number" type='number' variant="outlined" required style={{ width: "17.5vw" }}  sx={{ input: { color: err ? "red" : "green" } }}  />
             <div className="error" style={{display: err ? "block" : "none"}}>{err}</div>
              <TextField id="outlined-basic" size='small' name='email' label="Email" type='email' variant="outlined" style={{ width: "17.5vw" }} required />
              <TextField id="outlined-basic" size='small' name='password' label="Password" type='password' variant="outlined" style={{ width: "17.5vw" }} required />
              <div className="error" style={{display: err2 ? "block" : "none"}}>{err2}</div>
              <Button type='submit' variant="contained" style={{ width: "17.5vw" }}>Create account</Button>
              <span>or signup with</span>
              <Button variant="contained" style={{ width: "17.5vw", background: "#fff", color: "#000", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                <FcGoogle style={{ fontSize: "1.2rem" }} /> Google
              </Button>
            </form>
          </div>
          
        </Box>
      </Modal>
    </div>
  )
}

RegForm.propTypes = {
    handleRegClose: PropTypes.func.isRequired,
    regOpen: PropTypes.bool.isRequired,        
  };

export default RegForm
