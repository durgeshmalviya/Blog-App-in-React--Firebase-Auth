import { useEffect, useState } from "react";
import KeyboardDoubleArrowUpTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowUpTwoTone';
import { Button } from "@mui/material";


export default function Scroll () {
  const style={

    
backtotop :{ 
  position:' fixed',
  bottom: '20px',
  right: '10px',
  fontsize: '20px', 
  color:' white',
  cursor: 'pointer',
  borderRedius: '80px',
  border:' none',
  background:'#000000' ,
  boxShadow: '0 5px 10px #585454',
width:'40px'

}
  }

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };
  return (
    <>
      {showButton && (
       
        <button type="button" onClick={scrollToTop}color="secondary" style={style.backtotop}>        
        <KeyboardDoubleArrowUpTwoToneIcon />
      </button>
    
      )}
    
    </>
  );
}
