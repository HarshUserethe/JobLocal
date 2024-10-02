import TopNavigation from "../components/TopNavigation"
import HeroPage from "../components/HeroPage";
import Aboutus from "./Aboutus";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import '../locomotive-scroll.css';
import CursorFollower from "../components/CursorFollower";

const Home = () => {

  const ref = useRef(null);

  const options = {
    smooth: true,
  } 


  return (
    
    <div>
     <LocomotiveScrollProvider options={options} containerRef={ref}>
     <main data-scroll-container ref={ref}>
     <CursorFollower />
      <TopNavigation />
      <HeroPage />
      <Aboutus />
      </main>
      </LocomotiveScrollProvider>
    </div>
  );
}

export default Home;