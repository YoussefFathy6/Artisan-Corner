import React, { useEffect, useState, createContext, useContext } from "react";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerificationPage from "./Pages/RegisterPage/VerificationPage";
import DashBoard from "./Pages/Dashboard/DashBoard";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "./Config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, logoutAdmin } from "./Redux/Slices/adminSlice";
import AuctionPage from "./Pages/Auction/AuctionPage";
import AddDeitalsprofile from "./Pages/Profile/AddDeitalsprofile";
import { RatingsProvider } from "./Context/RatingsContext";
import { ReviewsProvider } from "./Context/ReviewsContext";
import Accountbalance from "./Pages/Profile/Accountbalance";
import ProposalsPage from "./Pages/Auction/ProposalsPage";
import CheckoutPage from "./Pages/PaymentPage/CheckoutPage";
import VideoCall from "./Pages/Events/MeetingRoom";
import TicketOnline from "./components/Ticket/TicketOnline";
import EventOnline from "./components/Ticket/EventOnlin";
import Users from "./components/Art/Users";
import ArtProfile from "./components/Art/ArtProfile";
import Chat from "./components/Chat/Chat";
import Posts from "./Pages/EarningsPage/Main/Posts";
import SpecialOrderPage from "./Pages/SpecialOrder/SpecialOrderPage";
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "react-toastify/dist/ReactToastify.css";
import Side from "./Pages/Profile/Side";
import CssBaseline from '@mui/material/CssBaseline';

// استدعاء الثيمات من ملف themes.js
import { darkTheme, lightTheme } from './theme';

export const ThemeContext = createContext();

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.adminReducer.isAdmin);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const checkUserRole = () => {
    const usersCollection = collection(db, "users");
    const q = query(
      usersCollection,
      where("id", "==", localStorage.getItem("id"))
    );

    return onSnapshot(q, (snapshot) => {
      if (
        snapshot.docs.length > 0 &&
        snapshot.docs[0].data().accountType === "admin"
      ) {
        dispatch(loginAdmin());
      } else dispatch(logoutAdmin());
    });
  };

  useEffect(() => {
    const unsubscribe = checkUserRole("admin");

    return () => unsubscribe();
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Paper>
          <ReviewsProvider>
            <RatingsProvider>
              {isAdmin ? (
                <DashBoard />
              ) : (
                <>
                  <NavBar />
                  <button onClick={toggleTheme}>
                    Toggle {darkMode ? "Light" : "Dark"} Mode
                  </button>
                  <Routes>
                    <Route path="chat" element={<Chat />} />
                    <Route path="/" element={<Home />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="earnings" element={<EarningsPage />} />
                    <Route path="shipping" element={<ShippingPage />} />
                    <Route path="payment" element={<CheckoutPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="special" element={<SpecialOrderPage />} />
                    <Route path="auction" element={<AuctionPage />} />
                    <Route path="proposals" element={<ProposalsPage />} />
                    <Route path="verify" element={<VerificationPage />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/bag" element={<ProductBag />} />
                    <Route path="order" element={<Order />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/ticket" element={<Ticket />} />
                    <Route path="/event" element={<AllEvent />} />
                    <Route path="/TicketConfirmation/:eventId" element={<TicketConfirmation />} />
                    <Route path="/Artprofile" element={<ArtProfile />} />
                    <Route path="/online" element={<VideoCall />} />
                    <Route path="/EventOnline" element={<EventOnline />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/TicketOnline/:eventId" element={<TicketOnline />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/eventuser" element={<Eventuser />} />
                    <Route path="/adddeitalsprofile" element={<AddDeitalsprofile />} />
                    <Route path="/accountbalance" element={<Accountbalance />} />
                    <Route path="/Side" element={<Side />} />
                  </Routes>
                  <Footer />
                  <ToastContainer />
                </>
              )}
            </RatingsProvider>
          </ReviewsProvider>
        </Paper>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
