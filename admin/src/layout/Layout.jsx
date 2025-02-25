import React, { useEffect } from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideNav from "../Components/SideNav";
import Preload from "../Components/Preload";

const Layout =()=>{
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
            <Header/>
            <SideNav/>
            <div className="content-wrapper" style={{backgroundColor:"#e0e7fb"}} >{<Outlet/>}</div>
            <Footer/>
        </div>
        </>
    );
};

export default Layout;