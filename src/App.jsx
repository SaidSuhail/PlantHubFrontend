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
import ServiceBooking from "./Admin/ServiceBooking";
import PlantDatabase from "./Admin/PlantDatabase";
import ServiceProviders from "./Admin/ServiceProviders";
import ProviderRequest from "./Admin/ProviderRequest";
import PlanManagement from "./Admin/PlanManagement";
import { Provider } from "react-redux";
import store from './app/Store';
import Footer from "./Components/Footer";
import Providers from "./Providers/providers";
import ScrollToTop from "./Components/ScrollToTop";
import ProviderDashboard from "./Providers/ProviderDashboard";
import AssignedBookings from "./Providers/AssignedBookings";
import Cart from "./Pages/Cart";
import PlantView from "./Pages/PlantView";
import Bookings from "./Pages/Bookings";
// import { Toaster } from "sonner";
import ManagePlants from "./Providers/ManagePlants";
import Customers from "./Providers/Customers";
import Analytics from "./Providers/Analytics";
import Calendar from "./Providers/Calendar";
import Notification from "./Pages/Notification";
import Analyticss from "./Admin/Analyticss";
import CheckoutPage from "./Pages/CheckoutPage";
// import { Toaster } from "sonner";
function App() {
  const location = useLocation();
  const isProvidersRoute = location.pathname.startsWith("/providers")
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const showNavbar = !isAuthPage && !isAdminRoute && !isProvidersRoute; // ✅ Show for normal users only

  return (
      <Provider store={store}>
      {/* <Toaster position="top-right" richColors />  */}
        <ScrollToTop/>
      <div className="flex flex-col min-h-screen w-full">
      {showNavbar && <Navbar />}
      <main className="flex-grow w-full app-container">
              {/* <Toaster position="bottom-center" richColors /> */}
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans/>} />
        <Route path="/library" element={<PlantLibrary/>}/>
        <Route path="/plant/:id" element={<PlantView/>}/>
        <Route path="/myplants" element={<MyPlants/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/orders" element={<Bookings/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/notifications" element={<Notification/>}/>

        <Route path="/admin" element={<Admin/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="usermanagement" element={<UsersManagement/>}/>
        <Route path="servicebooking" element={<ServiceBooking/>}/>
        <Route path="plantdatabase" element={<PlantDatabase/>}/>
        <Route path="serviceprovider" element={<ServiceProviders/>}/>
        <Route path="providerrequest" element={<ProviderRequest/>}/>
        <Route path="analytics" element={<Analyticss/>}/>
        <Route path="planmanagament" element={<PlanManagement/>}/>
        </Route>

        <Route path="/providers" element={<Providers/>}>
         <Route index element={<ProviderDashboard/>}/>
        <Route path="dashboard" element={<ProviderDashboard/>}/>
        <Route path="AssignedBookings" element={<AssignedBookings/>}/>
        <Route path="ManagePlants" element={<ManagePlants/>}/>
        <Route path="Customers" element={<Customers/>}/>
        <Route path="Calendar" element={<Calendar/>}/>     
        <Route path="Analytics" element={<Analytics/>}/>
        </Route>

      </Routes>
      </main>
            {!isAuthPage &&!isAdminRoute && !isProvidersRoute&& <Footer />}
            </div>
      </Provider>
  );
}

export default App;
