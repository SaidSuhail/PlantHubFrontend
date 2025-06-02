import React from "react";
import Registration from "./Pages/Registration";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Plans from "./Pages/Plans";
import PlantLibrary from "./Pages/PlantLibrary";
import MyPlants from "./Pages/MyPlants";
import Services from "./Pages/Services";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Dashboard";
import UsersManagement from "./Admin/UsersManagement";
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const showNavbar = !isAuthPage && !isAdminRoute; // ✅ Show for normal users only

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans/>} />
        <Route path="/library" element={<PlantLibrary/>}/>
        <Route path="/myplants" element={<MyPlants/>}/>
        <Route path="/services" element={<Services/>}/>

        <Route path="/admin" element={<Admin/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="usermanagement" element={<UsersManagement/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
