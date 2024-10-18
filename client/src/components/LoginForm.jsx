import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import '../App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
const fetchUri = import.meta.env.VITE_FETCH_URI;
import axios from 'axios';



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
   const [err, setErr] = useState('');
   const [otp, setOtp] = useState('');
   const [phoneNumber, setPhoneNumber] = useState(null)
   const [loading, setLoading] = useState(false)
   const [otpContainer, setOtpContianer] = useState(false);
 
   const checkPhoneNumber = (value) => {
    if (value.length === 10) {
      setErr('');
    } else {
      setErr("Please enter a valid 10-digit phone number.");
    }
  };

  const handleOTPSent = async (e) => {
    e.preventDefault()

    try {
    setLoading(true)
    const mobileNumber = phoneNumber;

    const response = await axios.post(`${fetchUri}/login/sentotp`,{
      phone: mobileNumber,
    });
  
    if(response.status === 200){
      setOtpContianer(true);
    }
    setLoading(false);

    } catch (error) {
    console.log(error)
    setLoading(false)
    setErr2(error.response.data.message)
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true)
    const response = await fetch(`${fetchUri}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Wrap phoneNumber in an object
      body: JSON.stringify({ phone: phoneNumber })
    });
    

    if (!response.ok) {
        const errorMessage = await response.text();
        const parsedError = JSON.parse(errorMessage);
        setErr2(parsedError.err);
        setLoading(false);
        return;
      }

      const result = await response.json();
      const userFromResult = await result.user
      localStorage.setItem('token', result.token);
      localStorage.setItem('userid', userFromResult._id); 

      navigate(`/dashboard/${userFromResult._id}`)

  } catch (error) {
    if(!phoneNumber){
      setErr('Please enter valid phone number')
    }
    console.log('Error during login:', error);
  }
};

  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* LOGIN MAIN BOX */}

        {
          !otpContainer ? 
            <Box sx={style}>
          <div className="btn-wrappers" style={{display:"flex", flexDirection:"column"}}>
          <h3 style={{fontWeight: "500", fontSize: "1.4rem"}}>Please Log-in your account.</h3>
          <h3 style={{fontSize:".7rem", color:"gray"}}>Login with your registerd mobile number.</h3>

          </div>
          
          <div id='candidateLogin'  className="form-wrapper">
            <form action="">
              <TextField onChange={(e) => {setPhoneNumber(e.target.value), checkPhoneNumber(e.target.value)}} className="outlined-basic" size='small' name='phone' label="Phone Number" type='Number' variant="outlined" style={{ width: "17.5vw" }}   sx={{ input: { color: err ? "red" : "green" } }} />
              <div className="error" style={{display: err2 ? "block" : "none"}}>{err2}</div>
              <div className="error" style={{ display: err ? "block" : "none" }}>{err}</div>
              <Button onClick={handleOTPSent} variant="contained" style={{ width: "17.5vw" }}>{loading ? "LOADING..." : "SEND OTP"}</Button>
              <span style={{fontSize:".9rem", color:"gray", textAlign:"center"}}>Don't have an account? <span style={{color:"blue", cursor:"pointer"}}>Create your account now.</span></span>
            </form>

            
          </div>
          
        </Box>
           : 
            <div className="otp-container">
             <div className="center-otp-div">
             <div className="otp-head">
              <h4>Enter 4 Digit OTP Code</h4>
              <p>OTP code sent to your registerd number.</p>
             </div>
             <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  border: "1px solid #1976D2",
                  borderRadius: "8px",
                  width: " 50px",
                  height: "50px",
                  fontSize: "16px",
                  color: "#000",
                  fontWeight: "400",
                  caretColor: "blue"
                }}
              />
             <div className="otp-wrapper">
              <Button onClick={handleSubmit} variant="contained" style={{ width: "225px", height:"45px", marginTop: "20px" }}>
                VERIFY OTP
              </Button>
             <p>Never share your OTP with anyone</p>
             </div>
             </div>
            </div>
         
        }



      </Modal>
    </div>
  )
}

 LoginForm.propTypes = {
     handleClose: PropTypes.func.isRequired,
     open: PropTypes.bool.isRequired,        
   };

export default LoginForm
