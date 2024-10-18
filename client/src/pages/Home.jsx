import TopNavigation from "../components/TopNavigation";
import HeroPage from "../components/HeroPage";
import Aboutus from "./Aboutus";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import '../locomotive-scroll.css';


const Home = () => {

  const ref = useRef(null);

  const options = {
    smooth: true,
  };

  const onUpdate = () => {
    // This function will be triggered when the scroll instance needs to be updated
    console.log("Locomotive scroll updated");
  };

  return (
    <div>
      <LocomotiveScrollProvider
        options={options}
        containerRef={ref}
        onUpdate={onUpdate} // Add the onUpdate prop here
        watch={[]} // Add any props you want to watch here (for now, it's an empty array)
      >
        <main data-scroll-container ref={ref}>
         
          <TopNavigation />
          <HeroPage />
          <Aboutus />
        </main>
      </LocomotiveScrollProvider>
    </div>
  );
}

export default Home;
