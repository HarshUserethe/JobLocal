import '../App.css';
import TextField from '@mui/material/TextField';
import TopNavigation from '../components/TopNavigation';
import CursorFollower from '../components/CursorFollower';
 

const Form = () => {
    
  return (
    <div style={{backgroundColor:"#f8f8f8d8"}}>
     <CursorFollower />
     <TopNavigation />
      <div className="heading">
      <h3 style={{fontWeight: "500"}}>Please Register your account.</h3>
      </div>
      <div className="form-page">
      <form action="">
     <div className="frm">
     <TextField id="outlined-basic" size='small' style={{width:"25vw"}} label="First Name" variant="outlined" />
     <TextField id="outlined-basic" size='small' style={{width:"25vw"}} label="First Name" variant="outlined" />
     </div>

     <div className="frm">
     <TextField id="outlined-basic" size='small' style={{width:"25vw"}} label="Email Address" type='email' variant="outlined" />
     <TextField id="outlined-basic" size='small' style={{width:"25vw"}} label="Mobile Number" type='number' variant="outlined" />
     </div>

     
     <div className="frm">
     <TextField id="outlined-basic" size='small' style={{width:"25vw"}} label="Permanent Address" type='text' variant="outlined" />
     <TextField id="outlined-basic" size='small' style={{width:"25vw"}} label="City" type='text' variant="outlined" />
     </div>

     
     <div className="frm">
     <TextField id="outlined-basic" size='small' style={{width:"25vw"}} label="State" type='text' variant="outlined" />
     <TextField id="outlined-basic" size='small' style={{width:"25vw"}} label="Pin Code" type='number' variant="outlined" />
     </div>
      </form>
      </div>
    </div>
  )
}

export default Form
