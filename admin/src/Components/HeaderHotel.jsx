import React from 'react'
import { Link } from 'react-router-dom';

const HeaderHotel = ()=>{
    return (
      <div>
  {/* Navbar */}
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="/adminhotel/dashboardhotel" className="nav-link">Home</a>
      </li>
    </ul>
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
      {/* Navbar Search */}
      <li className="nav-item">
        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
          <i className="fas fa-search" />
        </a>
        <div className="navbar-search-block">
          <form className="form-inline">
            <div className="input-group input-group-sm">
              <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
                <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
      
      
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt" />
        </a>
      </li>
      
      {/* Profile Dropdown */}
      <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="profileDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ color: '#333', display: 'flex', alignItems: 'center' }}
            >
              <img
                src="https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg"
                alt="User Avatar"
                className="rounded-circle"
                style={{ width: '30px', height: '30px', marginRight: '8px' }}
              />
              Profile
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
              <Link to="/adminhotel/profile" className="dropdown-item" >Profile</Link>
            
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/logouthotel">Logout</a>
            </div>
          </li>
    </ul>
  </nav>
  {/* /.navbar */}
</div>

    )
}

export default HeaderHotel;