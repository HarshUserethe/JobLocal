import React, { useState } from 'react';
import TopNavigation from "../components/TopNavigation";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    objective: '',
    email: '',
    phone: '',
    gender: '',
    jobType: '',
    DOB: '',
    permanentAddress: {
      houseNo: '',
      city: '',
      state: '',
      pin: '',
    },
    currentAddress: {
      houseNo: '',
      city: '',
      state: '',
      pin: '',
    },
    sameAsPermAddress: false,
    education: {
      degree: '',
      stream: '',
      institute: '',
      year: '',
      cgpa: '',
    },
    workExperiance: {
        role: '',
        company: '',
        startDate: '',
        endDate: '',
        about: ''
    },
    project: [{
        name: '',
        start: '',
        end: '',
        about: '',
        link: ''
    }],
    keySkills:[],
    newSkill: '',
    links: {
        github: '',
        linkedin: '',
        portfolio: '',
        other: ''
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (type, e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [name]: value
      }
    }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      education: {
        ...prevState.education,
        [name]: value
      }
    }));
  };

  const handleSameAddressCheck = (e) => {
    const { checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      sameAsPermAddress: checked,
      currentAddress: checked ? prevState.permanentAddress : {
        houseNo: '',
        city: '',
        state: '',
        pin: '',
      }
    }));
  };

  const handleWorkExpChange = (e) => {
   const {name, value} = e.target;
   setFormData(prevState => ({
    ...prevState,
    workExperiance:{
        ...prevState.workExperiance,
        [name]: value
    }
   }))
  }
  const handleLinkChange = (e) => {
   const {name, value} = e.target;
   setFormData(prevState => ({
    ...prevState,
    links:{
        ...prevState.links,
        [name]: value
    }
   }))
  }

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = formData.project.map((proj, i) => 
        i === index ? { ...proj, [name]: value } : proj
    );
    setFormData(prevState => ({
        ...prevState,
        project: updatedProjects
    }));
};

const handleAddProject = () => {
    setFormData(prevState => ({
        ...prevState,
        project: [...prevState.project, { name: '', start: '', end: '', about: '', link: '' }]
    }));
};

const handleKeySkillsChange = (e) => {
    setFormData({ ...formData, newSkill: e.target.value }); 
}

const handleAddSkill = (e) => {
    const skill = formData.newSkill.trim();
    if (skill) {
      setFormData((prevState) => ({
        ...prevState,
        keySkills: [...prevState.keySkills, skill], // Add new skill to the array
        newSkill: '' // Clear the input field
      }));
    }
}

const handleKeyPress = (event) => {
    if (event.key === ' ' || event.key === ',' || event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior (e.g., adding space in the input)
      handleAddSkill(); // Add skill on key press
    }
}

const handleRemoveSkill = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      keySkills: prevState.keySkills.filter((_, i) => i !== index) // Remove skill at the specified index
    }));
}

const handleCancel = () => {
    navigate('/');
}

  const handleFormSubmit = () => {
    console.log(formData)
  }

  return (
    <>
      <TopNavigation />
      <div className="form-top">
        <h1>Hi <span style={{color: "#ff8a00"}}>Harsh</span>,</h1>
        <h2>Update Your Profile Here!</h2>
        <p>Keep your profile up to date for better job recommendation.</p>
      </div>

<div className="form-container">
<Container className='cont-font' maxWidth="lg" sx={{ mt: 5, mb: 5, pb: 10 }}>
        <form className='profile-form-fnt'>
          <Grid container spacing={3}>
            {/* General Information */}
            <Grid item xs={12}>
              <Typography className='formSection' variant="h6" gutterBottom>General Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Objective"
                placeholder='In 350'
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                multiline
                rows={4}
                inputProps={{ maxLength: 350 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type='number'
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem className='capi-txt' value="male">Male</MenuItem>
                  <MenuItem className='capi-txt' value="female">Female</MenuItem>
                  <MenuItem className='capi-txt' value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Job Sector</InputLabel>
                <Select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  label="Job Sector"
                >
                  <MenuItem className='capi-txt' value="it">Information Technology</MenuItem>
                  <MenuItem className='capi-txt' value="finance">Finance</MenuItem>
                  <MenuItem className='capi-txt' value="healthcare">Healthcare</MenuItem>
                  <MenuItem className='capi-txt' value="education">Education</MenuItem>
                  <MenuItem className='capi-txt' value="marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Date of Birth"
    name="DOB"
    type="date"
    value={formData.DOB}
    onChange={handleChange}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      style: {
        textTransform: 'uppercase', // Makes the placeholder uppercase
      },
    }}
    sx={{
      input: {
        '::placeholder': {
          textTransform: 'uppercase', // Ensures that placeholder is uppercase
        },
      },
    }}
  />
</Grid>


            {/* Permanent Address */}
            <Grid item xs={12}>
              <Typography className='formSection' variant="h6" gutterBottom>Permanent Address</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="House No / Street"
                name="houseNo"
                value={formData.permanentAddress.houseNo}
                onChange={(e) => handleAddressChange('permanentAddress', e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <Select
                  name="city"
                  value={formData.permanentAddress.city}
                  onChange={(e) => handleAddressChange('permanentAddress', e)}
                  label="City"
                >
                  <MenuItem className='capi-txt' value="city1">City 1</MenuItem>
                  <MenuItem className='capi-txt' value="city2">City 2</MenuItem>
                  <MenuItem className='capi-txt' value="city3">City 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={formData.permanentAddress.state}
                  onChange={(e) => handleAddressChange('permanentAddress', e)}
                  label="State"
                >
                  <MenuItem className='capi-txt' value="state1">State 1</MenuItem>
                  <MenuItem className='capi-txt' value="state2">State 2</MenuItem>
                  <MenuItem className='capi-txt' value="state3">State 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PIN"
                name="pin"
                type="number"
                value={formData.permanentAddress.pin}
                onChange={(e) => handleAddressChange('permanentAddress', e)}
                inputProps={{ maxLength: 6 }}
              />
            </Grid>

            {/* Current Address */}
            <Grid item xs={12}>
              <Typography className='formSection' variant="h6" gutterBottom>Current Address</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.sameAsPermAddress}
                    onChange={handleSameAddressCheck}
                    name="sameAsPermAddress"
                  />
                }
                label="Same as Permanent Address"
              />
            </Grid>
            {!formData.sameAsPermAddress && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="House No"
                    name="houseNo"
                    value={formData.currentAddress.houseNo}
                    onChange={(e) => handleAddressChange('currentAddress', e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                      name="city"
                      value={formData.currentAddress.city}
                      onChange={(e) => handleAddressChange('currentAddress', e)}
                      label="City"
                    >
                      <MenuItem className='capi-txt' value="city1">City 1</MenuItem>
                      <MenuItem className='capi-txt' value="city2">City 2</MenuItem>
                      <MenuItem className='capi-txt' value="city3">City 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      value={formData.currentAddress.state}
                      onChange={(e) => handleAddressChange('currentAddress', e)}
                      label="State"
                    >
                      <MenuItem className='capi-txt' value="state1">State 1</MenuItem>
                      <MenuItem className='capi-txt' value="state2">State 2</MenuItem>
                      <MenuItem className='capi-txt' value="state3">State 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="PIN"
                    name="pin"
                    type="number"
                    value={formData.currentAddress.pin}
                    onChange={(e) => handleAddressChange('currentAddress', e)}
                    inputProps={{ maxLength: 6 }}
                  />
                </Grid>
              </>
            )}

            {/* Education */}
            <Grid item xs={12}>
              <Typography className='formSection' variant="h6" gutterBottom>Education</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={formData.education.degree}
                onChange={handleEducationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stream"
                name="stream"
                value={formData.education.stream}
                onChange={handleEducationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Institute"
                name="institute"
                value={formData.education.institute}
                onChange={handleEducationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Completion Year"
                name="year"
                type="number"
                value={formData.education.year}
                onChange={handleEducationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CGPA / Percentage"
                name="cgpa"
                value={formData.education.cgpa}
                onChange={handleEducationChange}
              />
            </Grid>

           {/* WORK EXPERIENCE */}
            <Grid item xs={12}>
              <Typography className='formSection' variant="h6" gutterBottom>Work Experience</Typography>
              <p style={{fontSize:".8rem", color:"#384BFF"}}>Freshers can include their internships as part of their work experience.</p>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Role"
                name="role"
                value={formData.workExperiance.role}
                onChange={handleWorkExpChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="company"
                value={formData.workExperiance.company}
                onChange={handleWorkExpChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Start Date"
    name="startDate"
    type="date"
    value={formData.workExperiance.startDate}
    onChange={handleWorkExpChange}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      style: {
        textTransform: 'uppercase', // Makes the placeholder uppercase
      },
    }}
    sx={{
      input: {
        '::placeholder': {
          textTransform: 'uppercase', // Ensures that placeholder is uppercase
        },
      },
    }}
  />
</Grid>

<Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="End Date"
    name="endDate"
    type="date"
    value={formData.workExperiance.endDate}
    onChange={handleWorkExpChange}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      style: {
        textTransform: 'uppercase', // Makes the placeholder uppercase
      },
    }}
    sx={{
      input: {
        '::placeholder': {
          textTransform: 'uppercase', // Ensures that placeholder is uppercase
        },
      },
    }}
  />
</Grid>

<Grid item xs={12}>
              <TextField
                fullWidth
                label="About Work"
                placeholder='In 350'
                name="about"
                value={formData.workExperiance.about}
                onChange={handleWorkExpChange}
                multiline
                rows={4}
                inputProps={{ maxLength: 350 }}
              />
            </Grid>

            {/* PROJECTS */}
    <Grid item xs={12}>
  <Typography className='formSection' variant="h6" gutterBottom>Projects</Typography>
  {/* <p className="prj-lable" style={{fontSize:".8rem"}}>Project- 1</p> */}
  {formData.project.map((proj, index) => (    
<>
<div className="frm-flx" style={{display: "flex", justifyContent:"space-between", alignItems:"start"}}>
<p className="prj-lable" style={{fontSize:".8rem"}}>Project- {index + 1}</p>
{/* {formData.project.length > 1 ? <RemoveCircleIcon onClick={() => handleRemoveProject(index)} style={{color:"red"}} /> : null} */}
</div>
<Grid container spacing={3} key={index} mb={5}>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Project Name"
          name="name"
          value={proj.name}
          onChange={(e) => handleProjectChange(index, e)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Start Date"
          name="start"
          type="date"
          value={proj.start}
          onChange={(e) => handleProjectChange(index, e)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="End Date"
          name="end"
          type="date"
          value={proj.end}
          onChange={(e) => handleProjectChange(index, e)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="About"
          name="about"
          value={proj.about}
          onChange={(e) => handleProjectChange(index, e)}
          multiline
          rows={2}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Project Link"
          name="link"
          value={proj.link}
          onChange={(e) => handleProjectChange(index, e)}
        />
      </Grid>
    </Grid>
</>
  ))}
  {
  formData.project.length < 3 ? (
    <Grid item xs={12}>
      <Button onClick={handleAddProject} variant="outlined" color="primary" size="large">
        Add More
      </Button>
    </Grid>
  ) : null
}
</Grid>


  {/* KEY SKILLS */}
            <Grid item xs={12}>
              <Typography className='formSection' variant="h6" gutterBottom>Key Skills</Typography>
            </Grid>

            <Grid item xs={12}>
            <div className="skills-container"> 
                {formData.keySkills.map((skill, index) => (
                    <span  key={index} className='skilltag'>{skill} <RemoveCircleOutlineIcon onClick={() => handleRemoveSkill(index)} className='f-icon' /></span>
                ))}
            </div>
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="About Work"
                name="keySkills"
                value={formData.newSkill}
                onChange={handleKeySkillsChange}
                onKeyDown={handleKeyPress}
              />
            </Grid>

              {/* LINKS */}
              <Grid item xs={12}>
              <Typography className='formSection' variant="h6" gutterBottom>Add Links</Typography>
            </Grid>

            <Grid item xs={6} style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:"15px"}}>
             <GitHubIcon style={{fontSize:"2rem"}} />
              <TextField
                fullWidth
                label="GitHub Profile Link"
                name="github"
                variant='standard'
                value={formData.links.github}
                onChange={handleLinkChange}
              />
            </Grid>

            <Grid item xs={6} style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:"15px"}}>
             <LinkedInIcon style={{fontSize:"2rem", color:"#0077B5"}} />
              <TextField
                fullWidth
                label="LinkedIn Profile Link"
                name="linkedin"
                variant='standard'
                value={formData.links.linkedin}
                onChange={handleLinkChange}
              />
            </Grid>

            <Grid item xs={6} style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:"15px"}}>
             <BusinessCenterIcon style={{fontSize:"2rem", color:"#000"}} />
              <TextField
                fullWidth
                label="Your Portfolio Link"
                name="portfolio"
                variant='standard'
                value={formData.links.portfolio}
                onChange={handleLinkChange}
              />
            </Grid>

            <Grid item xs={6} style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:"15px"}}>
             <InsertLinkIcon style={{fontSize:"2rem"}} />
              <TextField
                fullWidth
                label="Other Link"
                name="other"
                variant='standard'
                value={formData.links.other}
                onChange={handleLinkChange}
              />
            </Grid>

            <Grid item xs={12}>
<div className="btns-container">
<Button className='btnstyle' onClick={handleFormSubmit} variant="contained" color="primary" size="large">
                Update
              </Button>
<Button className='btnstyle' onClick={handleCancel} variant="contained" color="error" size="large">
                Cancel
              </Button>
</div>
            </Grid>
          </Grid>
        </form>
      </Container>
</div>
    </>
  );
};

export default ProfileForm;