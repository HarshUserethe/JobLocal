import { account } from "../appWrite/services";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
 

const UserDashboard = () => {
 
  const navigate = useNavigate();
  const [userid, setUserid] = useState();

useEffect(() => {
  const findUserId = () => {
    setUserid(localStorage.getItem('userid'))
  }

  findUserId();
}, [])


  const handleLogout = async() => {
    localStorage.removeItem('token');
    // Optionally, redirect to the home page or login page
    navigate('/'); // Or wherever you want to redirect after logout  
  }


  return (
    <div>
      <h4>User's Dashboard</h4>
      <Button
        onClick={handleLogout}
        variant="contained"
        style={{ width: "17.5vw" }}
      >
        logout
      </Button>
    </div>
  );
};

export default UserDashboard;
