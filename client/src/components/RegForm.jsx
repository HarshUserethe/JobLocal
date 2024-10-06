import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OtpInput from 'react-otp-input';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase/firebase_config';
import { useNavigate } from "react-router-dom";

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
  borderRadius: "10px",
};

const RegForm = ({ handleRegClose, regOpen }) => {

  const navigate = useNavigate();

  const [err, setErr] = useState('');
  const [err2, setErr2] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    if (!regOpen) {
      setIsSubmit(false);
      setErr2('');
      setErr('');
    }
  }, [regOpen]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handleSendOtp();
        }
      });
    }
  };

  const handleSendOtp = async () => {
    try {
      setupRecaptcha();
      const formattedPhoneNumber = `+91${phoneNumber}`; // Assuming Indian phone numbers
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setIsSubmit(true);
      setLoading(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErr2("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await confirmationResult.confirm(otp);
      // Phone number verified successfully
      console.log("Phone number verified!");
      // Here you can proceed with user registration or login
      handleRegClose();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErr2("Invalid OTP. Please try again.");
    }
  };

  const checkPhoneNumber = (value) => {
    if (value.length === 10) {
      setErr('');
    } else {
      setErr("Please enter a valid 10-digit phone number.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());

    if (formObj.phone.length !== 10) {
      setErr2('Invalid phone number, please check it again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObj)
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
      
      navigate(`/dashboard/${userFromResult.userid}`)
      // If the response is OK, proceed with OTP sending
      // handleSendOtp();
    } catch (error) {
      console.log(error);
      setErr2(error.message);
      setLoading(false);
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
            <h3 style={{ fontWeight: "500", fontSize: "1.4rem" }}>
              {!isSubmit ? "Please create your account." : "OTP sent to your phone."}
            </h3>
          </div>

          {!isSubmit ? (
            <div id='candidateLogin' className="form-wrapper">
              <form action="" method='post' onSubmit={handleSubmit}>
                <TextField className="outlined-basic" size='small' name='fullname' label="Full Name" type='text' variant="outlined" style={{ width: "100%" }} required />
                <TextField
                  onChange={(e) => {
                    checkPhoneNumber(e.target.value);
                    setPhoneNumber(e.target.value);
                  }}
                  name='phone'
                  className="outlined-basic"
                  size='small'
                  label="Phone Number"
                  type='number'
                  variant="outlined"
                  required
                  style={{ width: "100%" }}
                  sx={{ input: { color: err ? "red" : "green" } }}
                />
                <div className="error" style={{ display: err ? "block" : "none" }}>{err}</div>
                <TextField className="outlined-basic" size='small' name='email' label="Email" type='email' variant="outlined" style={{ width: "100%" }} required />
                <TextField className="outlined-basic" size='small' name='password' label="Password" type='password' variant="outlined" style={{ width: "100%" }} required />
                <div className="error" style={{ display: err2 ? "block" : "none" }}>{err2}</div>
                <Button type='submit' variant="contained" style={{ width: "100%" }}>
                  {/* {loading ? "SENDING..." : "SEND OTP"} */} CREATE ACCOUNT
                </Button>
                <div className="line"></div>
                <span style={{fontSize:".7rem", textAlign:"center", color:"gray"}}>Please enter a correct email and phone number. Your information is securely protected with us.</span>
                <div className="tag"> <span style={{color:"orange"}}>JOBS</span><span style={{color:"#384BFF", fontWeight:"600", opacity:"70%"}}>LOCAL</span></div>
                <div id="recaptcha-container"></div>
              </form>
            </div>
          ) : (
            <div className="otp-container">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  border: "1px solid #1976D2",
                  borderRadius: "8px",
                  width: "40px",
                  height: "40px",
                  fontSize: "16px",
                  color: "#000",
                  fontWeight: "400",
                  caretColor: "blue"
                }}
              />
              <Button onClick={handleVerifyCode} variant="contained" style={{ width: "50%", marginTop: "20px" }}>
                VERIFY OTP
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default RegForm;