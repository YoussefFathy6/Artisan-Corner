/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import EarningsPage from "./Pages/EarningsPage/EarningsPage";
import ShippingPage from "./Pages/ShippingPage/ShippingPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import Details from "./components/Details/Details";
import ProductBag from "./components/ProductBag/ProductBag";
import Order from "./components/Order/Cart";
import Ticket from "./components/Ticket/Ticket";
import Profile from "./Pages/Profile/Profile";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import AllEvent from "./Pages/Events/AllEvent";
import TicketConfirmation from "./components/Ticket/TicketConfirmation";
import Eventuser from "./Pages/Profile/Eventuser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerificationPage from "./Pages/RegisterPage/VerificationPage";
import DashBoard from "./Pages/Dashboard/DashBoard";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "./Config/firebase";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const checkUserRole = (accountType) => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("accountType", "==", accountType));

    return onSnapshot(q, (snapshot) => {
      setIsAdmin(snapshot.docs.length > 0);
    });
  };

  const handleLogin = (accountType) => {
    checkUserRole(accountType); // Check user role after login
  };

  const handleLogout = () => {
    setIsAdmin(false); // Reset isAdmin state on logout
    navigate("/"); // Navigate to home or login page after logout
  };

  useEffect(() => {
    // Assuming we have a function to check the current user's role on initial load
    const unsubscribe = checkUserRole("admin");

    // Cleanup the onSnapshot listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isAdmin ? (
        <DashBoard />
      ) : (
        <>
          <NavBar onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home onLogin={handleLogin} />} />
            <Route path="earnings" element={<EarningsPage />} />
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="verify" element={<VerificationPage />} />
            <Route path="/details" element={<Details />} />
            <Route path="/bag" element={<ProductBag />} />
            <Route path="order" element={<Order />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/event" element={<AllEvent />} />
            <Route
              path="/TicketConfirmation/:eventId"
              element={<TicketConfirmation />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event" element={<Eventuser />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
