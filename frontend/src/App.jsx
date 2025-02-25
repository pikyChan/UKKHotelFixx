import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";

import ScrollToTop from "./components/ScrollToTop";
import 'bootstrap/dist/css/bootstrap.min.css';
import "boxicons/css/boxicons.min.css";

import PageNotFound from "./components/notfound/PageNotFound";
import SignUp from "./pages/signup/SignUp";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
