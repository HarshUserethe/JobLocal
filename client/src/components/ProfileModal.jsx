import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { borderRadius, display } from '@mui/system';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const fetchUri = import.meta.env.VITE_FETCH_URI;  


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius:"10px",
    boxShadow: 2,
    p: 4,
  };

const ProfileModal = ({open, setOpen}) => {

    const handleClose = () => setOpen(false);
    const { userid }= useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    const notify = () => toast("Your profile is updated successfully!");


    const handleImageChange = (event) => {
    //   if (event.target.files && event.target.files[0]) {
    //     const file = event.target.files[0];
    //     setSelectedImage(URL.createObjectURL(file));
    //   }
    const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB. Please upload a smaller image.");
      return;
    }
    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
    setUploadedImage(file);
  }
    };

    const handleUploadProfile = async () => {
        const userId = userid;
    try {
      const formData2 = new FormData();
      formData2.append('profile', uploadedImage); // Append the file to FormData

      // Send the file to the server using axios
      const response = await axios.post(`${fetchUri}/upload/profile/picture/${userId}`, formData2, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      console.log(response.data); // Optional: Log the response data
    } catch (error) {
      console.error(error);
    }
    }

  
    const handleUpload = () => {
      // Handle the image upload process here
      console.log("Image uploaded");
      handleUploadProfile();
      notify();
      handleClose();
    };
  

  return (
<>
<ToastContainer />
<Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-picture-upload-modal-title"
      aria-describedby="profile-picture-upload-modal-description"
    >
      <Box sx={style}>
        <Typography id="profile-picture-upload-modal-title" style={{display:"flex", justifyContent:"center", flexDirection:"column"}} component="h2">
         <h3 style={{fontSize:"1.2rem", fontWeight:"500", fontFamily:"Poppins", textAlign:"center"}}>Upload your profile image</h3>
         <p style={{color:"#000",fontWeight:"300", fontSize:".8rem", textAlign:"center"}} >For best results, please upload an image in .jpg or .png format with a maximum size of 2MB.</p>
        </Typography>

<div className="drag-area">
            {/* Display the uploaded image or a default avatar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2}}>
         <div className="outer-ring" style={{border:"2px solid #384BFF", borderRadius:"50%", padding:"3px"}}>
         <Avatar
            src={selectedImage}
            sx={{ width: 100, height: 100 }}

          />
         </div>
        </Box>

        {/* Button to upload the image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:"column" }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-profile-pic"
            type="file"
            name='profile'
            onChange={handleImageChange}
          />
          <span style={{color:"#000",fontWeight:"300", fontSize:".7rem", textAlign:"center", marginBottom:"5px"}}>You can only upload image format PNG or JPG</span>
          <label htmlFor="upload-profile-pic">
            <div className="upp" style={{border:"1px solid #384BFF", borderRadius:"500px"}}>
            <IconButton color="primary" component="span" style={{display:'flex', gap:'5px'}}>
            <span style={{fontSize:".8rem"}}>Click to upload</span>
              <PhotoCamera style={{fontSize:"1rem"}} />
            </IconButton>
            </div>
          </label>
        </Box>


        {/* Button to submit/upload */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleUpload}
          style={{borderRadius:"500px"}}
          disabled={!selectedImage}  // Disable button until an image is selected
        >
          Upload Picture
        </Button>
</div>
      </Box>
    </Modal>
</>
  )
}


ProfileModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}

export default ProfileModal
