// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import EarningsPage from "./Pages/EarningsPage/EarningsPage";
import ShippingPage from "./Pages/ShippingPage/ShippingPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import Details from "./components/Details/Details";
import ProductBag from "./components/ProductBag/ProductBag";
import Order from "./components/Order/Cart";
import Ticket from "./components/Ticket/Ticket";
import Profile from "./Pages/Profile/Profile";
import Event from "./Pages/Events/Event";
import TicketConfirmation from "./components/Ticket/TicketConfirmation";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
// import Login from "./components/Auth/Login";
// import Sign from "./components/Auth/Sign";
// import ResetPassword from "./components/Auth/Resetpassword";
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        {/* amr //////////////////////////////////////////*/}
        <Route path="/" element={<Home />} />
        {/* youssef //////////////////////////////////////////*/}
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* samir //////////////////////////////////////////*/}
        <Route path="/details" element={<Details />} />
        <Route path="/bag" element={<ProductBag />} />
        {/* hanaa //////////////////////////////////////////*/}
        <Route path="order" element={<Order />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/TicketConfirmation" element={<TicketConfirmation />} />
        {/* wafaa //////////////////////////////////////////*/}
        <Route path="/Ticket" element={<Ticket />} />
        {/* wafaa //////////////////////////////////////////*/}
        <Route path="/profile" element={<Profile />} />
        <Route path="/event" element={<Event />} />

        {/* <Route path="/Sign" element={<Sign />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/ResetPassword" element={<ResetPassword />} /> */}
      </Routes>

      <Footer />
    </React.Fragment>
  );
}

export default App;
