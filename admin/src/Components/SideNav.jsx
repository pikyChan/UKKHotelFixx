import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
  const username = localStorage.getItem('username') || 'Admin'; 

  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar  elevation-4" style={{backgroundColor:"#d1dbf9",  margin:"0px 0 5px 0"}}>
        {/* Brand Logo */}
        <NavLink to="/admin/dashboard" style={{marginLeft:"40px"}} >
          <img
            src="/src/assets/logoHitam.png"
            alt="AdminLTE Logo"
            className="brand-image "
            style={{ width:'150px', height:'45px'}}
          />
         
        </NavLink>
      
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/src/assets/fotoProfile.jpeg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <NavLink to="/admin/profile" className="d-block " style={{color:"#000"}}>{username}</NavLink> {/* Display username */}
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <NavLink to="/admin/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/users" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-users" />
                  <p>Users</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/hotel" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-hotel" />
                  <p>
                    Hotel 
                    
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/room" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-bed" />
                  <p>
                      Room
                   
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/roomnumber" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-hashtag" />
                  <p>
                    Room Number  
                  
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/booking" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-calendar-check" />
                  <p>
                    Booking 
                    <span className="right badge badge-danger">New</span>
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p>LogOut</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNav;
