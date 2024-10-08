import React, { useEffect, useState } from 'react';
import TopNavigation from "../components/TopNavigation";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const notify = () => toast("Profile Updated Successfully");
  const  { userid } = useParams();

  const [formData, setFormData] = useState({
    fullname: '',
    objective: '',
    email: '',
    phone: '',
    gender: '',
    jobSector: '',
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
    workExperience: [{
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      about: ''
    }],
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
    jobType: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [fullName, setFullName] = useState('HARSH');

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

  const handleWorkExpChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkExperiences = formData.workExperience.map((exp, i) => 
      i === index ? { ...exp, [name]: value } : exp
    );
    setFormData(prevState => ({
      ...prevState,
      workExperience: updatedWorkExperiences
    }));
  };

  const handleAddWorkExperience = () => {
    setFormData(prevState => ({
      ...prevState,
      workExperience: [...prevState.workExperience, { role: '', company: '', startDate: '', endDate: '', about: '' }]
    }));
  };

  const handleRemoveWorkExperience = (index) => {
    setFormData(prevState => ({
      ...prevState,
      workExperience: prevState.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handleLinkChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      links:{
        ...prevState.links,
        [name]: value
      }
    }));
  };

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
  };

  const handleAddSkill = (e) => {
    const skill = formData.newSkill.trim();
    if (skill) {
      setFormData((prevState) => ({
        ...prevState,
        keySkills: [...prevState.keySkills, skill],
        newSkill: ''
      }));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === ',' || event.key === 'Enter') {
      event.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      keySkills: prevState.keySkills.filter((_, i) => i !== index)
    }));
  };

  const handleCancel = () => {
    navigate(`/dashboard/${userid}`);
  };

  const handleJobType = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      jobType: val, 
    }));
  }

  const handleJobSector = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      jobSector: val, 
    }));
  }


  const handleFormSubmit = async () => {
   
    try {
      const response = await fetch(`http://localhost:5000/profile/update/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if(!response.ok){
        const errorResponse = await response.text();
        const parsedError = JSON.parse(errorResponse);
        setErrorMessage(parsedError);
        alert("Error occured")
      }
      
      notify();
      fetchUserProfileData();

    } catch (error) {
      console.log(error)
      alert(error)
      setErrorMessage(error.message);
    }

  };

  // Convert MongoDB date to YYYY-MM-DD format
 
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Extracting the date part
    };


// Fetch user profile data
const fetchUserProfileData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/get/userdata/${userid}`);
    const userData = response.data;

    setUserInfo(userData);
    setFullName(userData.fullname)
    // Update form data
    setFormData({
      fullname: userData.fullname || " ",
      objective: userData.objective || " ",
      email: userData.email || " ",
      phone: userData.phone || " ",
      gender: userData.gender || "Not Specified",
      jobSector: userData.jobSector || "Not Specified",
      jobType: userData.jobType || "Not Specified",
      DOB: formatDate(userData.DOB) || " ", // Ensure this is formatted correctly if needed
      permanentAddress: {
        houseNo: userData.permanentAddress?.houseNo || " ",
        city: userData.permanentAddress?.city || "Not Specified",
        state: userData.permanentAddress?.state || "Not Specified",
        pin: userData.permanentAddress?.pin || " ",
      },
      currentAddress: {
        houseNo: userData.currentAddress?.houseNo || " ",
        city: userData.currentAddress?.city || "Not Specified",
        state: userData.currentAddress?.state || "Not Specified",
        pin: userData.currentAddress?.pin || " ",
      },
      sameAsPermAddress: userData.sameAsPermAddress || false,
      education: {
        degree: userData.education[0]?.degree || " ",
        stream: userData.education[0]?.stream || " ",
        institute: userData.education[0]?.institute || " ",
        year: userData.education[0]?.year || " ",
        cgpa: userData.education[0]?.cgpa || " ",
      },
      workExperience: userData.workExperience?.map(work => ({
        role: work.role || " ",
        company: work.company || " ",
        startDate: formatDate(work.startDate) || " ",
        endDate: formatDate(work.endDate) || " ",
        about: work.about || " "
      })) || [{}],
      project: userData.project?.map(proj => ({
        name: proj.name || " ",
        start: formatDate(proj.start) || " ",
        end: formatDate(proj.end) || " ",
        about: proj.about || " ",
        link: proj.link || " "
      })) || [{}],
      keySkills: userData.keySkills || [],
      links: {
        github: userData.links?.github || " ",
        linkedin: userData.links?.linkedin || " ",
        portfolio: userData.links?.portfolio || " ",
        other: userData.links?.other || " "
      },
    });

  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

useEffect(() => {
  fetchUserProfileData();
}, [userid]);

  

  return (
    <>
      <TopNavigation />
      <ToastContainer />
      <div className="form-top">
        <h1>Hi <span style={{color: "#ff8a00"}}>{fullName}</span>,</h1>
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
              <Grid item xs={12} sm={12}>
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
                    <MenuItem className='capi-txt' value="Not Specified">Not Specified</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Job Sector</InputLabel>
                  <Select
                    name="jobSector"
                    value={formData.jobSector}
                    onChange={(e) => handleJobSector(e.target.value)}
                    label="Job Sector"
                  >
                    <MenuItem className='capi-txt' value="Information Technology">Information Technology</MenuItem>
                    <MenuItem className='capi-txt' value="Finance">Finance</MenuItem>
                    <MenuItem className='capi-txt' value="Healthcare">Healthcare</MenuItem>
                    <MenuItem className='capi-txt' value="Education">Education</MenuItem>
                    <MenuItem className='capi-txt' value="Marketing">Marketing</MenuItem>
                    <MenuItem className='capi-txt' value="Not Specified">Not Specified</MenuItem>
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
                      textTransform: 'uppercase',
                    },
                  }}
                  sx={{
                    input: {
                      '::placeholder': {
                        textTransform: 'uppercase',
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
                    <MenuItem className='capi-txt' value="Not Specified">Not Specified</MenuItem>
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
                    <MenuItem className='capi-txt' value="Not Specified">Not Specified</MenuItem>
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
                        <MenuItem className='capi-txt' value="Not Specified">Not Specified</MenuItem>
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
                        <MenuItem className='capi-txt' value="Not Specified">Not Specified</MenuItem>
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
              
              {formData.workExperience.map((exp, index) => (
                <React.Fragment key={index}>
                  <div className="frm-flx" style={{display: "flex", justifyContent:"space-between", alignItems:"start"}}>
                    <p className="prj-lable-2" style={{fontSize:".8rem", width:"100%", color:"#052F5F"}}>Work Experience - {index + 1}</p>
                    {formData.workExperience.length > 1 && (
                      <RemoveCircleIcon 
                        onClick={() => handleRemoveWorkExperience(index)} 
                        style={{color:"#e15454", cursor: "pointer"}} 
                      />
                    )}
                  </div>
                  <Grid container spacing={3} mb={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Role"
                        name="role"
                        value={exp.role}
                        onChange={(e) => handleWorkExpChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleWorkExpChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        name="startDate"
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleWorkExpChange(index, e)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: {
                            textTransform: 'uppercase',
                          },
                        }}
                        sx={{
                          input: {
                            '::placeholder': {
                              textTransform: 'uppercase',
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
                        value={exp.endDate}
                        onChange={(e) => handleWorkExpChange(index, e)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: {
                            textTransform: 'uppercase',
                          },
                        }}
                        sx={{
                          input: {
                            '::placeholder': {
                              textTransform: 'uppercase',
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
                        value={exp.about}
                        onChange={(e) => handleWorkExpChange(index, e)}
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 350 }}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
              
              {formData.workExperience.length < 3 && (
                <Grid item xs={12}>
                  <Button onClick={handleAddWorkExperience} variant="outlined" color="primary" size="large">
                    Add More
                  </Button>
                </Grid>
              )}
              </Grid>


              {/* PROJECTS */}
              <Grid item xs={12}>
                <Typography className='formSection' variant="h6" gutterBottom>Projects</Typography>
                {formData.project.map((proj, index) => (    
                  <React.Fragment key={index}>
                    <div className="frm-flx" style={{display: "flex", justifyContent:"space-between", alignItems:"start"}}>
                      <p className="prj-lable" style={{fontSize:".8rem"}}>Project- {index + 1}</p>
                    </div>
                    <Grid container spacing={3} mb={5}>
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
                  </React.Fragment>
                ))}
                {formData.project.length < 3 && (
                  <Grid item xs={12}>
                    <Button onClick={handleAddProject} variant="outlined" color="primary" size="large">
                      Add More
                    </Button>
                  </Grid>
                )}
              </Grid>

              {/* KEY SKILLS */}
              <Grid item xs={12}>
                <Typography className='formSection' variant="h6" gutterBottom>Key Skills</Typography>
              </Grid>

              <Grid item xs={12}>
                <div className="skills-container"> 
                  {formData.keySkills.map((skill, index) => (
                    <span key={index} className='skilltag'>
                      {skill ? skill : " "} 
                      <RemoveCircleOutlineIcon 
                        onClick={() => handleRemoveSkill(index)} 
                        className='f-icon' 
                      />
                    </span>
                  ))}
                </div>
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Add Skill"
                  name="keySkills"
                  value={formData.newSkill}
                  onChange={handleKeySkillsChange}
                  onKeyDown={handleKeyPress}
                />
              </Grid>

              {/* JOB TYPE */}
              <Grid item xs={12}>
                <Typography className='formSection' variant="h6" gutterBottom>Job Preference</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Job Preference</InputLabel>
                  <Select
                    name="jobType"
                    onChange={(e) => handleJobType(e.target.value)}
                    value={formData.jobType}
                    label="Select Job Preference"
                  >
                    <MenuItem className='capi-txt' value="Full-Time">Full-Time</MenuItem>
                    <MenuItem className='capi-txt' value="Part-Time">Part-Time</MenuItem>
                    <MenuItem className='capi-txt' value="Internship">Internship</MenuItem>
                    <MenuItem className='capi-txt' value="Contract">Contract</MenuItem>
                    <MenuItem className='capi-txt' value="Not Specified">Not Specified</MenuItem>
                  </Select>
                </FormControl>
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