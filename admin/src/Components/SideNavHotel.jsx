import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavHotel = () => {
  const username = localStorage.getItem('username') || 'Admin'; 

  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <NavLink to="/admin/dashboard" className="brand-link">
         {/* <img
            src="/src/assets/logo_old.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: '.8', width:'30px', height:'60px'}}
          /> */}
          <span className="brand-text font-weight-600" style={{marginLeft:"40px"}}>Dashboard Admin</span>
        </NavLink>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/src/assets/fotoProfile.jpeg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <NavLink to="/admin/profile" className="d-block">{username}</NavLink> {/* Display username */}
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
                <NavLink to="/adminhotel/dashboardhotel" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/adminhotel/roomhotel" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fas fa-bed" />
                  <p>
                    Rooms
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                 <NavLink to="/adminhotel/roomnumberhotel" className="nav-link" activeClassName="active">
                    <i className="nav-icon fas fa-hashtag" />
                       <p>
                        Room Number          
                        </p>
                  </NavLink>
                    </li>
              <li className="nav-item">
                <NavLink to="/adminhotel/bookinghotel" className="nav-link" activeClassName="active">
                  <i className="nav-icon fas fa-calendar-check" />
                  <p>
                    Booking 
                    <span className="right badge badge-danger">New</span>
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logouthotel" className="nav-link" activeClassName="active">
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

export default SideNavHotel;
