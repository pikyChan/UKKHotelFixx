import React from "react";

const Preload = () => {
  return (
    <>
    {/* Preloader */}
 <div className="preloader flex-column justify-content-center align-items-center">
   <img className="animation__shake" src="/src/assets/logoHitam.png" alt="AdminLTELogo" height={50} width={150} />
   <p style={{marginTop:'10px', fontWeight:'600'}}>BOOKING HOTEL</p>
 </div>
 
     </>
  )
}
export default Preload;