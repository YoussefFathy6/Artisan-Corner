/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import AllEvent from "./Pages/Events/AllEvent";
import TicketConfirmation from "./components/Ticket/TicketConfirmation";
import Eventuser from "./Pages/Profile/Eventuser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerificationPage from "./Pages/RegisterPage/VerificationPage";
import DashBoard from "./Pages/Dashboard/DashBoard";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "./Config/firebase";
// import CreateEventRoom from "./Pages/Events/online";

// import CreateRoom from "./Pages/Events/MeetingRoom";
// import AgoraService from "./Pages/Events/AgoraService";
// import CreateEventRoom from "./Pages/Events/online";
import VideoCall from "./Pages/Events/MeetingRoom";

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin

  const searchUsersByAccountType = async (accountType) => {
    try {
      // Reference to the Firestore collection
      const usersCollection = collection(db, "users");

      // Create a query against the collection
      const q = query(usersCollection, where("accountType", "==", accountType));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Process the results
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      return results;
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      const results = await searchUsersByAccountType("admin");
      setIsAdmin(results.length > 0); // Update state based on the result
    };

    checkAdminStatus(); // Call the function to check admin status
  }, []);


  // const { createRoom } = AgoraService();

  // const handleCreateRoom = (roomName) => {
  //   createRoom(roomName);
  // };

  return (
    <>
      {/* {isAdmin ? (
        <DashBoard />
      ) : ( */}
        <>
          <NavBar />
          <Routes>
            {/* amr //////////////////////////////////////////*/}
            <Route path="/" element={<Home />} />
            {/* youssef //////////////////////////////////////////*/}
            <Route path="earnings" element={<EarningsPage />} />
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="verify" element={<VerificationPage />} />
            <Route path="dashboard" element={<DashBoard />} />
            {/* samir //////////////////////////////////////////*/}
            <Route path="/details" element={<Details />} />
            <Route path="/bag" element={<ProductBag />} />
            {/* hanaa //////////////////////////////////////////*/}
            <Route path="order" element={<Order />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/event" element={<AllEvent />} />
            <Route path="/TicketConfirmation/:eventId" element={<TicketConfirmation />} />
                        {/* <Route path="/onlineroom" element={<CreateRoom/>} /> */}
                        {/* <Route path="/onlineroom" element={<AgoraService/>} /> */}
                        {/* <Route path="/online" element={<CreateEventRoom/>} /> */}
                        <Route path="/online" element={<VideoCall/>} />


            {/* wafaa //////////////////////////////////////////*/}
            <Route path="/profile" element={<Profile />} />
            <Route path="/eventuser" element={<Eventuser />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </>
      {/* )} */}
    </>
  );
}

export default App;
