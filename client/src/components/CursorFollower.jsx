import "../App.css";
import { useState, useEffect } from "react";

const CursorFollower = () => {

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
      });
    
      useEffect(() => {
        const updateMousePosition = (e) => {
          setMousePosition({
            x: e.clientX - 15,
            y: e.clientY - 15,
          });
        };
    
        window.addEventListener("mousemove", updateMousePosition);
    
        return () => {
          window.removeEventListener("mousemove", updateMousePosition);
        };
      }, []);
    
      useEffect(() => {
        const ls = document.querySelectorAll('.list-ls')
        ls.forEach(elem => {
          elem.addEventListener("mouseenter", handleMouseEnter)
        })
        }, [])
    
    
    useEffect(() => {
      const ls = document.querySelectorAll('.list-ls')
      ls.forEach(elem => {
        elem.addEventListener("mouseleave", handleMouseLeave)
      })
      }, [])
    
    
      useEffect(() => {
        const navListItem = document.querySelector(".navlist-col");
        navListItem.addEventListener("mouseover", (elem) => {
          elem.style.color = "#fff"
        })
      }, [])


      useEffect(() => {
        const buttons = document.querySelectorAll(".heroButtons");
 
      buttons.forEach((btns) => {
       btns.addEventListener("mouseenter", () => {
         const cursor = document.querySelector(".cursor");
         cursor.style.transform = "scale(2)"
        })
      })
       }, [])

      useEffect(() => {
       const buttons = document.querySelectorAll(".heroButtons");

     buttons.forEach((btns) => {
      btns.addEventListener("mouseleave", () => {
        const cursor = document.querySelector(".cursor");
        cursor.style.backgroundColor = "#384BFF"
        cursor.style.transform = "";
       })
     })
      }, [])

      
        
        const handleMouseEnter = () => {
        const cursor = document.querySelector(".cursor");
        cursor.style.transform = "scale(2)"
        cursor.style.backgroundColor = "#384BFF"
        }
    
        const handleMouseLeave = () => {
        const cursor = document.querySelector(".cursor");
         cursor.style.transform = ""
        //  cursor.style.backgroundColor = "transparent"
        }
    

  return (
    <div>
      <div
        className="cursor"
        style={{
          position: "absolute",
          top: mousePosition.y,
          left: mousePosition.x,
        }}
      >
        <div className="mini"></div>
      </div>
    </div>
  )
}

export default CursorFollower
