import { account } from "../appWrite/services";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const UserDashboard = () => {
 
  const navigate = useNavigate();

  const handleLogout = async() => {
    
    try {
      
      const result = await  account.deleteSession('current');
      console.log(result);
      navigate('/');

    } catch (error) {
      
      console.log(error)

    }
    
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
