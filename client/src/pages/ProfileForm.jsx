import React, { useEffect, useState } from "react";
import TopNavigation from "../components/TopNavigation";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { useParams } from "react-router-dom";
import axios, { all } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';
const fetchUri = import.meta.env.VITE_FETCH_URI;

const steps = [
  "Update General Information",
  "Work Experience & Projects",
  "Add Skills & Resume",
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
} from "@mui/material";
import { fontFamily, fontSize } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { City, Country, State } from "country-state-city";

const ProfileForm = () => {
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(countryData[100]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [isoCode, setIsoCode] = useState();

  //states of india here --->
  useEffect(() => {
    if (country) {
      setStateData(State.getStatesOfCountry(country?.isoCode) || []);
    }
  }, [country]);

  //fetching cities of state
  useEffect(() => {
    setCityData(City.getCitiesOfCountry("IN"));
  }, []);

  const navigate = useNavigate();
  const notify = () => toast("Profile Updated Successfully");
  const { userid } = useParams();
  const [isResumeLink, setResumeLink] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    objective: "",
    email: "",
    phone: "",
    gender: "",
    jobSector: "",
    DOB: "",
    permanentAddress: {
      houseNo: "",
      city: "",
      state: "",
      pin: "",
    },
    currentAddress: {
      houseNo: "",
      city: "",
      state: "",
      pin: "",
    },
    sameAsPermAddress: false,
    education: {
      degree: "",
      stream: "",
      institute: "",
      year: "",
      cgpa: "",
    },
    workExperience: [
      {
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        about: "",
      },
    ],
    project: [
      {
        name: "",
        start: "",
        end: "",
        about: "",
        link: "",
      },
    ],
    keySkills: [],
    newSkill: "",
    links: {
      github: "",
      linkedin: "",
      portfolio: "",
      other: "",
    },
    jobType: "",
    resumeLink: "",
  });

 
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [fullName, setFullName] = useState("JOBSEEKER");
  const [fileInfo, setFileInfo] = useState({
    name: "No file selected",
    size: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the file type is allowed
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, DOC, and DOCX files are allowed!");
        return;
      }
      //Generate unique id
      // let uniqueId = Math.floor(1000000 + Math.random() * 9000000).toString();

      // Update file information and resume link in formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        resumeLink: "./uploads/" + userid + file.name, // Set file name in formData
      }));

      // Update file info state
      setFileInfo({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB", // Convert size to MB
      });

      setSelectedFile(file); // Save the selected file for upload
    }
  };

  const handleSubmitResumeFile = async () => {
    const userId = userid;
    try {
      const formData2 = new FormData();
      formData2.append("resume", selectedFile); // Append the file to FormData

      // Send the file to the server using axios
      const response = await axios.post(
        `${fetchUri}/upload/${userId}`,
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      
      console.log(response.data); // Optional: Log the response data
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [IOScode, setISOcode] = useState(null);

  const handleAddressChange = (type, e) => {
    const { name, value } = e.target;

    const selectedState = e.target.value;
    const selectedStateData = stateData.find(
      (state) => state.name === selectedState
    );
    const isoCodeOfState = selectedStateData ? selectedStateData.isoCode : "";
    setISOcode(isoCodeOfState);

    setFormData((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [name]: value,
      },
    }));
  };

  const handleEducationChange = (event, value) => {
    // Ensure value is set correctly in the formData
    setFormData((prevState) => ({
      ...prevState,
      education: {
        ...prevState.education,
        degree: value || '', // Set selected value or an empty string
      },
    }));
  };


  const handleSameAddressCheck = (e) => {
    const { checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      sameAsPermAddress: checked,
      currentAddress: checked
        ? prevState.permanentAddress
        : {
            houseNo: "",
            city: "",
            state: "",
            pin: "",
          },
    }));
  };

  const handleWorkExpChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkExperiences = formData.workExperience.map((exp, i) =>
      i === index ? { ...exp, [name]: value } : exp
    );
    setFormData((prevState) => ({
      ...prevState,
      workExperience: updatedWorkExperiences,
    }));
  };

  const handleAddWorkExperience = () => {
    setFormData((prevState) => ({
      ...prevState,
      workExperience: [
        ...prevState.workExperience,
        { role: "", company: "", startDate: "", endDate: "", about: "" },
      ],
    }));
  };

  const handleRemoveWorkExperience = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      workExperience: prevState.workExperience.filter((_, i) => i !== index),
    }));
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      links: {
        ...prevState.links,
        [name]: value,
      },
    }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = formData.project.map((proj, i) =>
      i === index ? { ...proj, [name]: value } : proj
    );
    setFormData((prevState) => ({
      ...prevState,
      project: updatedProjects,
    }));
  };

  const handleAddProject = () => {
    setFormData((prevState) => ({
      ...prevState,
      project: [
        ...prevState.project,
        { name: "", start: "", end: "", about: "", link: "" },
      ],
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
        newSkill: "",
      }));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      keySkills: prevState.keySkills.filter((_, i) => i !== index),
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
  };

  const handleJobSector = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      jobSector: val,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${fetchUri}/profile/update/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        const parsedError = JSON.parse(errorResponse);
        setErrorMessage(parsedError);
        alert("Error occured");
      }

      //checking user selected resume file or not
      if (selectedFile) {
        handleSubmitResumeFile();
      } else {
        console.log("User hasn't submit resume.");
      }
      console.log(formData)
     
      fetchUserProfileData();
    } catch (error) {
      console.log(error);
      alert(error);
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
      const response = await axios.get(`${fetchUri}/get/userdata/${userid}`);
      const userData = response.data;

      setUserInfo(userData);
      setFullName(userData.fullname);
      setResumeLink(userData.resumeLink);
      setIsEmailVerified(userData.emailVerified);
      // Update form data
      setFormData({
        fullname: userData.fullname || "",
        objective: userData.objective || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "Not Specified",
        jobSector: userData.jobSector || "Not Specified",
        jobType: userData.jobType || "Not Specified",
        DOB: formatDate(userData.DOB) || null, // Ensure this is formatted correctly if needed
        permanentAddress: {
          houseNo: userData.permanentAddress?.houseNo || "",
          city: userData.permanentAddress?.city || "Not Specified",
          state: userData.permanentAddress?.state || "Not Specified",
          pin: userData.permanentAddress?.pin || "",
        },
        currentAddress: {
          houseNo: userData.currentAddress?.houseNo || "",
          city: userData.currentAddress?.city || "Not Specified",
          state: userData.currentAddress?.state || "Not Specified",
          pin: userData.currentAddress?.pin || "",
        },
        sameAsPermAddress: userData.sameAsPermAddress || false,
        education: {
          degree: userData.education[0]?.degree || "",
          stream: userData.education[0]?.stream || "",
          institute: userData.education[0]?.institute || "",
          year: userData.education[0]?.year || "",
          cgpa: userData.education[0]?.cgpa || "",
        },
        workExperience:
          userData.workExperience?.map((work) => ({
            role: work.role || "",
            company: work.company || "",
            startDate: work.startDate ? formatDate(work.startDate) : null,
            endDate: work.endDate ? formatDate(work.endDate) : null,
            about: work.about || "",
          })) || [],
        project:
          userData.project?.map((proj) => ({
            name: proj.name || "",
            start: proj.start ? formatDate(proj.start) : null,
            end: proj.end ? formatDate(proj.end) : null,
            about: proj.about || "",
            link: proj.link || "",
          })) || [],
        keySkills: userData.keySkills || [],
        links: {
          github: userData.links?.github || "",
          linkedin: userData.links?.linkedin || "",
          portfolio: userData.links?.portfolio || "",
          other: userData.links?.other || "",
        },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, [userid]);

  const handleVerifyEmail = async () => {
    try {
      if (userid) {
        setIsLoading(true);
        const response = await axios.get(`${fetchUri}/sent/${userid}`); // Replace with your backend URL
        console.log(response.data);
        setIsSent(true);
        setIsLoading(false);
      } else {
        alert("user not found");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("Error sending verification email.");
    }
  };

  //CODE FOR STEPPRT - MATERIAL UI
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    scrollToTop();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollToTop();
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (activeStep === 2) {
      handleFormSubmit();
      setActiveStep(0);
      setCompleted({});
      navigate(`/dashboard/${userid}`);
    } else {
      handleFormSubmit();
      setCompleted({
        ...completed,
        [activeStep]: true,
      });
      handleNext();
      scrollToTop();
    }
  };

  //fetch degree - diploma list
const [degreeData, setDegreeData] = useState([]);
useEffect(() => {
  const handleFetchDegree = async () => {
    try {
      const response = await axios.get('/src/apis/degrees_and_diplomas.json');
      const data = response.data;
      setDegreeData(data.degrees_and_diplomas)     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  handleFetchDegree();
 
}, [degreeData])
  
 
  return (
    <>
      {/* <Header/> */}
      <TopNavigation />
      <div className="form-top">
        <h1>
          Hi <span style={{ color: "#ff8a00" }}>{fullName}</span>,
        </h1>
        <h2>Update Your Profile Here!</h2>
        <p>Keep your profile up to date for better job recommendation.</p>
      </div>
      <div className="stepper-main">
        <div className="stepperConatiner">
          <Box sx={{ width: "100%", py: 5 }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, mx: 2 }}>
                    All steps completed - you&apos;re all set!
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography
                    sx={{ mt: 2, mb: 1, py: 1, px: 2 }}
                    style={{ fontFamily: "satoshi" }}
                  >
                    Step {activeStep + 1}
                  </Typography>
                </React.Fragment>
              )}
            </div>
          </Box>
        </div>
      </div>
      <div className="form-main-div">
        <div className="form-sidebar"></div>
        <div className="form-container">
          <Container
            className="cont-font"
            maxWidth="lg"
            sx={{ mt: 1, mb: 5, pb: 10 }}
          >
            <form className="profile-form-fnt">
              <Grid container spacing={3}>
                {/* General Information */}
                <Grid
                  className="general-information"
                  style={{ display: activeStep === 0 ? "flex" : "none" }}
                  container
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      General Information
                    </Typography>
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
                      placeholder="In 350"
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
                    <div className="verify-stuf">
                      {isEmailVerified ? (
                        <Button color="success" size="small">
                          Email Verified
                        </Button>
                      ) : (
                        <Button
                          onClick={handleVerifyEmail}
                          color="error"
                          size="small"
                        >
                          {isSent ? (
                            <span style={{ color: "green" }}>Link Sent</span>
                          ) : (
                            <span>Verify Email</span>
                          )}
                        </Button>
                      )}
                      {isLoading ? (
                        <p className="sv1">Sending Verification Link ...</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      type="number"
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
                        <MenuItem className="capi-txt" value="male">
                          Male
                        </MenuItem>
                        <MenuItem className="capi-txt" value="female">
                          Female
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Not Specified">
                          Not Specified
                        </MenuItem>
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
                        <MenuItem
                          className="capi-txt"
                          value="Information Technology"
                        >
                          Information Technology
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Finance">
                          Finance
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Healthcare">
                          Healthcare
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Education">
                          Education
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Marketing">
                          Marketing
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Not Specified">
                          Not Specified
                        </MenuItem>
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
                          textTransform: "uppercase",
                        },
                      }}
                      sx={{
                        input: {
                          "::placeholder": {
                            textTransform: "uppercase",
                          },
                        },
                      }}
                    />
                  </Grid>

                  {/* Permanent Address */}
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Permanent Address
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="House No / Street"
                      name="houseNo"
                      value={formData.permanentAddress.houseNo}
                      onChange={(e) =>
                        handleAddressChange("permanentAddress", e)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>City</InputLabel>
                      <Select
                        name="city"
                        value={formData.permanentAddress.city}
                        onChange={(e) =>
                          handleAddressChange("permanentAddress", e)
                        }
                        label="City"
                      >
                        {cityData
                          .filter((city) => {
                            if (IOScode) {
                              return IOScode === city.stateCode;
                            } else {
                              return city;
                            }
                          }) // Filter cities based on the condition
                          .map((city, index) => {
                            return (
                              <MenuItem
                                className="capi-txt"
                                key={index}
                                value={city.name}
                              >
                                {city.name}
                              </MenuItem>
                            );
                          })}
                        <MenuItem className="capi-txt" value="Not Specified">
                          Not Specified
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        name="state"
                        value={formData.permanentAddress.state}
                        onChange={(e) =>
                          handleAddressChange("permanentAddress", e)
                        }
                        label="State"
                      >
                        {stateData?.length > 0 ? (
                          stateData.map((state) => (
                            <MenuItem
                              className="capi-txt"
                              key={state.name}
                              value={state.name}
                            >
                              {state.name}
                            </MenuItem>
                          ))
                        ) : (
                          <p>No states available</p>
                        )}
                        <MenuItem className="capi-txt" value="Not Specified">
                          Not Specified
                        </MenuItem>
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
                      onChange={(e) =>
                        handleAddressChange("permanentAddress", e)
                      }
                      inputProps={{ maxLength: 6 }}
                    />
                  </Grid>

                  {/* Current Address */}
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Current Address
                    </Typography>
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
                          onChange={(e) =>
                            handleAddressChange("currentAddress", e)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>City</InputLabel>
                          <Select
                            name="city"
                            value={formData.currentAddress.city}
                            onChange={(e) =>
                              handleAddressChange("currentAddress", e)
                            }
                            label="City"
                          >
                            {cityData
                              .filter((city) => {
                                if (IOScode) {
                                  return IOScode === city.stateCode;
                                } else {
                                  return city;
                                }
                              }) // Filter cities based on the condition
                              .map((city, index) => {
                                return (
                                  <MenuItem
                                    className="capi-txt"
                                    key={index}
                                    value={city.name}
                                  >
                                    {city.name}
                                  </MenuItem>
                                );
                              })}
                            <MenuItem
                              className="capi-txt"
                              value="Not Specified"
                            >
                              Not Specified
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>State</InputLabel>
                          <Select
                            name="state"
                            value={formData.currentAddress.state}
                            onChange={(e) =>
                              handleAddressChange("currentAddress", e)
                            }
                            label="State"
                          >
                            {stateData?.length > 0 ? (
                              stateData.map((state) => (
                                <MenuItem
                                  className="capi-txt"
                                  key={state.name}
                                  value={state.name}
                                >
                                  {state.name}
                                </MenuItem>
                              ))
                            ) : (
                              <p>No states available</p>
                            )}
                            <MenuItem
                              className="capi-txt"
                              value="Not Specified"
                            >
                              Not Specified
                            </MenuItem>
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
                          onChange={(e) =>
                            handleAddressChange("currentAddress", e)
                          }
                          inputProps={{ maxLength: 6 }}
                        />
                      </Grid>
                    </>
                  )}

                  {/* Education */}
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Education
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <TextField
                      fullWidth
                      label="Degree"
                      name="degree"
                      value={formData.education.degree}
                      onChange={handleEducationChange}
                    /> */}
                    <Autocomplete
  disablePortal
  options={degreeData || []}  // Ensure it's an empty array instead of empty string
  name="degree"
  value={formData.education.degree || null}  // Handle default value when no option is selected
  onChange={handleEducationChange}
  renderInput={(params) => <TextField {...params} label="Degree" />}
  isOptionEqualToValue={(option, value) => option === value}  // Customize equality check
  renderOption={(props, option) => (
    <li 
      {...props} 
      style={{ 
        ...props.style, // Maintain default styles
        color: '#000', // Set text color to black
      }}
    >
      {option}
    </li>
  )}
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
                </Grid>

                {/* WORK EXPERIENCE */}
                <Grid
                  className="work-experiance"
                  style={{
                    display: activeStep === 1 ? "flex" : "none",
                    marginTop: "1vw",
                  }}
                  container
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Work Experience
                    </Typography>
                    <p style={{ fontSize: ".8rem", color: "#384BFF" }}>
                      Freshers can include their internships as part of their
                      work experience.
                    </p>

                    {formData.workExperience.map((exp, index) => (
                      <React.Fragment key={index}>
                        <div
                          className="frm-flx"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          <p
                            className="prj-lable-2"
                            style={{
                              fontSize: ".8rem",
                              width: "100%",
                              color: "#052F5F",
                            }}
                          >
                            Work Experience - {index + 1}
                          </p>
                          {formData.workExperience.length > 1 && (
                            <RemoveCircleIcon
                              onClick={() => handleRemoveWorkExperience(index)}
                              style={{ color: "#e15454", cursor: "pointer" }}
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
                                  textTransform: "uppercase",
                                },
                              }}
                              sx={{
                                input: {
                                  "::placeholder": {
                                    textTransform: "uppercase",
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
                                  textTransform: "uppercase",
                                },
                              }}
                              sx={{
                                input: {
                                  "::placeholder": {
                                    textTransform: "uppercase",
                                  },
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="About Work"
                              placeholder="In 350"
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
                        <Button
                          onClick={handleAddWorkExperience}
                          variant="outlined"
                          color="primary"
                          size="large"
                        >
                          Add More
                        </Button>
                      </Grid>
                    )}
                  </Grid>

                  {/* PROJECTS */}
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Projects
                    </Typography>
                    {formData.project.map((proj, index) => (
                      <React.Fragment key={index}>
                        <div
                          className="frm-flx"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          <p
                            className="prj-lable"
                            style={{ fontSize: ".8rem" }}
                          >
                            Project- {index + 1}
                          </p>
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
                        <Button
                          onClick={handleAddProject}
                          variant="outlined"
                          color="primary"
                          size="large"
                        >
                          Add More
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {/* KEY SKILLS */}
                <Grid
                  className="skill-set"
                  style={{
                    display: activeStep === 2 ? "flex" : "none",
                    marginTop: "1vw",
                  }}
                  container
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Key Skills
                    </Typography>
                  </Grid>

                  {formData.keySkills.length >= 1 ? (
                    <Grid item xs={12}>
                      <div className="skills-container">
                        {formData.keySkills.map((skill, index) => (
                          <span key={index} className="skilltag">
                            {skill ? skill : " "}
                            <RemoveCircleOutlineIcon
                              onClick={() => handleRemoveSkill(index)}
                              className="f-icon"
                            />
                          </span>
                        ))}
                      </div>
                    </Grid>
                  ) : (
                    " "
                  )}

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
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Job Preference
                    </Typography>
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
                        <MenuItem className="capi-txt" value="Full-Time">
                          Full-Time
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Part-Time">
                          Part-Time
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Internship">
                          Internship
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Contract">
                          Contract
                        </MenuItem>
                        <MenuItem className="capi-txt" value="Not Specified">
                          Not Specified
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* LINKS */}
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Add Links
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <GitHubIcon style={{ fontSize: "2rem" }} />
                    <TextField
                      fullWidth
                      label="GitHub Profile Link"
                      name="github"
                      variant="standard"
                      value={formData.links.github}
                      onChange={handleLinkChange}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <LinkedInIcon
                      style={{ fontSize: "2rem", color: "#0077B5" }}
                    />
                    <TextField
                      fullWidth
                      label="LinkedIn Profile Link"
                      name="linkedin"
                      variant="standard"
                      value={formData.links.linkedin}
                      onChange={handleLinkChange}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <BusinessCenterIcon
                      style={{ fontSize: "2rem", color: "#000" }}
                    />
                    <TextField
                      fullWidth
                      label="Your Portfolio Link"
                      name="portfolio"
                      variant="standard"
                      value={formData.links.portfolio}
                      onChange={handleLinkChange}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <InsertLinkIcon style={{ fontSize: "2rem" }} />
                    <TextField
                      fullWidth
                      label="Other Link"
                      name="other"
                      variant="standard"
                      value={formData.links.other}
                      onChange={handleLinkChange}
                    />
                  </Grid>

                  {/* RESUME UPLOAD FORM */}
                  <div className="bline"></div>
                  <Grid item xs={12}>
                    <Typography
                      className="formSection"
                      variant="h6"
                      gutterBottom
                    >
                      Attach Resume
                    </Typography>

                    <Grid item xs={12} sm={6}>
                      <div className="resume-upload">
                        <div className="file-info">
                          <div className="filename">{fileInfo.name}</div>
                          <div className="filesize">{fileInfo.size}</div>
                        </div>

                        <Button
                          component="label"
                          variant="contained"
                          style={{
                            width: "23vw",
                            fontSize: "1rem",
                            height: "3vw",
                          }}
                          // style={{ backgroundColor: "#BF40BF" }}
                          color="primary"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload files
                          <input
                            type="file"
                            hidden
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                        </Button>
                        {isResumeLink !== null ? (
                          <div className="isUploaded">
                            You already uploaded your resume. to change upload
                            it again or to view{" "}
                            <span
                              style={{
                                color: "blue",
                                fontStyle: "italic",
                                textDecoration: "underline",
                              }}
                            >
                              Click Here.
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="note">
                          Supported formats: doc, docx, pdf, up to 2MB
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <div className="bline"></div>
                <Grid item xs={12}>
                  <div className="stepper-buttons">
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Next
                      </Button>
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          <Typography
                            variant="caption"
                            sx={{ display: "flex" }}
                            style={{
                              fontFamily: "satoshi",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: ".9rem",
                              color: "#DD1717",
                              fontWeight: "500",
                            }}
                          >
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1
                              ? "Finish"
                              : "Complete Step"}
                          </Button>
                        ))}
                    </Box>
                  </div>
                  <div className="btns-container" style={{ display: "none" }}>
                    <Button
                      className="btnstyle"
                      onClick={handleCancel}
                      variant="contained"
                      color="error"
                      size="large"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btnstyle"
                      onClick={handleFormSubmit}
                      variant="contained"
                      style={{ backgroundColor: "#052F5F" }}
                      size="large"
                    >
                      Update
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
