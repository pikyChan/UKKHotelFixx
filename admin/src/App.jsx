import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/admin/Home'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import Users from './pages/admin/Users'
import './App.css'
import Profile from './pages/admin/Profile'
import AddUsers from './pages/admin/AddUsers'
import EditUsers from './pages/admin/EditUsers'
import Hotel from './pages/admin/Hotel'
import Room from './pages/admin/Room'
import RoomNumber from './pages/admin/RoomNumber'
import Booking from './pages/admin/Booking'
import AddHotel from './pages/admin/AddHotel'
import EditHotel from './pages/admin/EditHotel'
import AddRoomNum from './pages/admin/AddRoomNum'
import EditRoomNum from './pages/admin/EditRoomNum'
import AddRoom from './pages/admin/AddRoom'
import EditRoom from './pages/admin/EditRoom'
import EditBooking from './pages/admin/EditBooking'
import Dashboard from './pages/adminHotel/Dashboard'
import LoginHotel from './pages/auth/LoginHotel'
import LayoutHotel from './layout/LayoutHotel'
import BookingHotel from './pages/adminHotel/BookingHotel'
import LogoutHotel from './pages/auth/LogoutHotel'
import SignUp from './pages/auth/SignUp'
import RoomHotel from './pages/adminHotel/RoomHotel'
import RoomNumberHotel from './pages/adminHotel/RoomNumberHotel'
import EditRoomHotel from './pages/adminHotel/EditRoom'
import EditRoomNumHotel from './pages/adminHotel/EditRoomNum'
import EditBookingHotel from './pages/adminHotel/EditBooking'
import AddRoomHotel from './pages/adminHotel/AddRoomHotel'
import AddRoomNumHotel from './pages/adminHotel/AddRoomNumHotel'
import RegisterHotel from './pages/auth/RefisterHotel'


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/admin/*" element={<Layout/>}>
        <Route path="dashboard" element={<Home/>} />
        <Route path="users" element={<Users/>} />
        <Route path="edituser/:id" element={<EditUsers/>} />
        <Route path="addusers" element={<AddUsers/>} />

        <Route path="hotel" element={<Hotel/>} />
        <Route path="addhotel" element={<AddHotel/>} />
        <Route path="edithotel/:id" element={<EditHotel/>} />

        <Route path="room" element={<Room/>} />
        <Route path='addroom' element={<AddRoom/>} />
        <Route path='editroom/:id' element={<EditRoom/>} />

        <Route path="addroomnumber" element={<AddRoomNum/>} />
        <Route path="roomnumber" element={<RoomNumber/>} />
        <Route path='roomnumber/:id' element={<EditRoomNum/>} />

        <Route path="booking" element={<Booking/>} />
        <Route path="booking/:id" element={<EditBooking/>} />
        <Route path="profile" element={<Profile/>} />
      </Route>

      <Route path="/adminhotel/*" element={<LayoutHotel/>}>
      <Route path="profile" element={<Profile/>} />
      <Route path="dashboardhotel" element={<Dashboard/>} />
      <Route path="roomhotel" element={<RoomHotel/>} />
      <Route path="addroomhotel" element={<AddRoomHotel/>} />
      <Route path="addroomnumberhotel" element={<AddRoomNumHotel/>} />
      <Route path='editroomhotel/:id' element={<EditRoomHotel/>} />
      <Route path="roomnumberhotel" element={<RoomNumberHotel/>} />
      <Route path='roomnumberhotel/:id' element={<EditRoomNumHotel/>} />
      <Route path="bookinghotel" element={<BookingHotel/>} />
      <Route path="bookinghotel/:id" element={<EditBookingHotel/>} />
      </Route>

      <Route path="/" element={<AuthLayout/>}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/registerhotel" element={<RegisterHotel />} />
        <Route path="/loginhotel" element={<LoginHotel />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/logouthotel" element={<LogoutHotel />} />
      </Route>
    </Routes>
    </BrowserRouter>

    
  )
}

export default App
