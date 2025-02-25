import React, { useEffect } from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Footer from "../Components/Footer";
import Preload from "../Components/Preload";
import SideNavHotel from "../Components/SideNavHotel";
import HeaderHotel from "../Components/HeaderHotel";

const LayoutHotel =()=>{
    const navigate=useNavigate();
    const token = localStorage.getItem('token')
    useEffect(()=>{
    if (token===null){
        navigate("/")
    }})
    return (
        <>
        <div>
            <Preload/>
            <HeaderHotel/>
            <SideNavHotel/>
            <div className="content-wrapper"  style={{backgroundColor:"#e0e7fb"}}>{<Outlet/>}</div>
            <Footer/>
        </div>
        </>
    );
};

export default LayoutHotel;