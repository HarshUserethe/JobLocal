import "../App.css";
import HeroImage from "../assets/new.png";
import breakerSVG from "../assets/wave.svg";
import Button from 'react-bootstrap/Button';
import { GrDocumentText } from "react-icons/gr";
import CursorFollower from "./CursorFollower";
 

const HeroPage = () => {
  return (
    <div className="heropage-body">
    <CursorFollower />
    <div className="overlay">
    <div className="text-content">
      <div className="rnd-line clr"><span>Local Jobs, Bright Careers</span></div>
      <div className="headline"><h1 className="clr"><span style={{color: "#ff8a00"}}>Post Resume</span> & Get Your Desired Job <span style={{color:"#ff8a00"}}>Locally</span></h1></div>
      <div className="summary"><p className="clr">Find your perfect job locally with Job Local. Explore top career opportunities and local employment options near you. Start your job search today and land the role you deserve!</p></div>
      <div className="buttons">
      <Button variant="outline-light" className="heroButtons">Upload Resume <GrDocumentText style={{fontSize: "1rem"}} /> </Button>{' '}
      <Button variant="primary" className="heroButtons">Contact Us</Button>{' '}
      </div>
    </div>
    </div>
      <img src={HeroImage} alt="section-image" />
      <div className="wavy">
        <img src={breakerSVG} alt="section-breaker" />
      </div>
    </div>
  )
}

export default HeroPage
