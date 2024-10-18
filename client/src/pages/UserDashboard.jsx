import { account } from "../appWrite/services";
import { useNavigate ,useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../App.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import DrawerMenu from "../components/DrawerMenu";
import UserResume from "../components/UserResume";
import UserHome from "../components/UserHome";
import UserSupport from "../components/UserSupport";
import UserCredits from "../components/UserCredits";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'; 
import ProfileModal from "../components/ProfileModal";
const fetchUri = import.meta.env.FETCH_URI;
import axios from 'axios';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userid, setUserid] = useState();
  const [state, setState] = useState('Home');
  const id = useParams()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

 
  useEffect(() => {
    const findUserId = () => {
      setUserid(localStorage.getItem("userid"));
    };

    findUserId();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    // Optionally, redirect to the home page or login page
    navigate("/"); // Or wherever you want to redirect after logout
  };

  const turncateString = (str, maxlength) => {
    if(str.length >= maxlength){
      const modifiedString = str.substring(0, maxlength)
      const expectedString = modifiedString + "..."
      return expectedString
    }
  }


  const renderComponent = () => {
   switch(state){
    case 'Resume':
    return <UserResume />

    case 'Support':
      return <UserSupport />

      case 'Credits':
        return <UserCredits />
      
        case 'Update Info':
        return navigate(`/profile/${id.userid}`)
         
        case 'Logout':
          return handleLogout();
          
        default:
          return <UserHome />
   }

  }

 

  return (
    <div>
      <Header />
      <div className="grid-container">
        <div className="container-item" id="user-profile-area" style={{ backgroundColor: "#F8F9FA" }}>
          <div className="proflie-card">
          <div className="cam-logo" onClick={handleOpen} title="Upload profile picture">
          <AddAPhotoIcon className="camera-icon" style={{cursor:"pointer", fontSize:".8rem", color:"gray"}} />
          </div>
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              sx={{ width: 58, height: 58, }}
              style={{border:"2px solid #13b100"}}
            />
           <div className="profile-info">
           <div className="p-name">Harsh Userethe</div>
            <div className="p-education">{turncateString('B.Tech in Computer Science', 22)}</div>
            <div className="p-college">{turncateString('Sagar Institute Of Research & Technology, Bhopal', 30)}</div>
           </div>
            <Button variant="contained" size="small" style={{marginTop:"10px", backgroundColor:"#384BFF", borderRadius:"500px", fontFamily:"satoshi",fontSize:".7rem", textTransform:"capitalize"}} >View Profile</Button>
          </div>

          <div className="dash-menu">
             <DrawerMenu setState={setState} />
          </div>
        </div>
        <div className="container-item" style={{ backgroundColor: "#F8F9FA", padding:"10px" }}>
          <div className="center-content">
            {renderComponent()}
          </div>
        </div>
        <div className="container-item" style={{ backgroundColor: "#dfdfdf" }}>
          3
        </div>
      </div>
      <ProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserDashboard;
