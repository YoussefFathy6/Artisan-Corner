/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo/Logo.png";
// import { FcSearch } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleFlag } from "../../../Redux/Slices/homeSlice";
import { loginAdmin, logoutAdmin } from "../../../Redux/Slices/adminSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import db, { auth } from "../../../Config/firebase";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore"; // import updateDoc
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

import NavSections from "./NavSections";
import { Link, NavLink } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";

function BodyNav() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null); // State to hold user data
  const [unreadNotification, setUnread] = useState([]); // State to hold unread notifications
  const flag = useSelector((state) => state.homeReducer.flag); // Flag from Redux
  const isAdmin = useSelector((state) => state.adminReducer.isAdmin); // Admin status from Redux
  const nav = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserData = async () => {
      // Real-time Firestore snapshot for "users" collection
      onSnapshot(collection(db, "users"), (snapshot) => {
        // Get the current user from localStorage and find them in the snapshot
        const user = snapshot.docs
          .map((doc) => ({ ...doc.data(), docId: doc.id })) // Include docId for updating notifications
          .find((item) => item.id === localStorage.getItem("id")); // Find the user object

        if (user) {
          setUserData(user); // Set the userData state with the found user object

          // Call getUnread after userData is set
          const unreadNotifications = getUnread(user);
          setUnread(unreadNotifications); // Set the unread notifications
        }
      });
    };

    fetchUserData();

    // Helper function to filter unread notifications
    function getUnread(userData) {
      return userData.notifications.filter((item) => item.read === false); // Return unread notifications
    }
  }, []);

  // Function to handle notification click
  const handleNotificationClick = async (notification, index) => {
    try {
      // Reference to the current user in Firestore
      const userRef = doc(db, "users", userData.docId);

      // Find the correct notification in the original array
      const updatedNotifications = userData.notifications.map((notif) =>
        notif.id === notification.id // Check if the current notification matches the clicked one
          ? { ...notif, read: true } // Mark as read if it's the clicked notification
          : notif
      );

      // Update Firestore document with modified notifications array
      await updateDoc(userRef, {
        notifications: updatedNotifications,
      });

      // Update the local state by filtering out unread notifications
      setUnread(updatedNotifications.filter((notif) => notif.read === false));

      // Navigate to the auction page
      nav("/auction");
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  // newww
  const isActive = ({ isActive }) => {
    return {
      // color: isActive && "#172554",
      // fontWeight: isActive && "bold",
      // borderBottom: isActive && "1px solid white",
      // paddingBottom: isActive && "10px",
      // marginRight: isActive && "10px",
      // transition:isActive && "all 0.3s"

      // backgroundColor: isActive && "#fff",
      // padding: isActive && "8px",
      // color: isActive && "#913B10",
      color: isActive && "#ffb6ad",
      borderRadius: isActive && "10px",
      textAlign: isActive && "center",
      transition: isActive && "all 0.2s ",
    };
  };

  return (
    // bg-[#72a398]
    //flowbit navbar
    <>
      <Navbar className="bg-[#344646]">


        <Navbar.Brand href="/">
          <span
            style={{ fontFamily: "cursive" }}
            className="self-center whitespace-nowrap xl:text-3xl lg:text-3xl text-md  text-white font-bold"
          >
            Mashrabiya
          </span>
        </Navbar.Brand>



        <div className="flex md:order-2 items-center">
          <div className="">
            {/* <!-- User Greeting or Register/Login --> */}
            {localStorage.getItem("id") && userData ? (
              <div className="flex items-center">
                {/* Notifications Dropdown */}
                <Dropdown
                  color={"transparent"}
                  label={
                    <div className="relative ">
                      <FaBell color="white" size={24} />{" "}
                      {/* Notification bell icon */}
                      {unreadNotification.length > 0 && (
                        <span className=" absolute top-0 right-0 left-2 bottom-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                          {unreadNotification.length}{" "}
                          {/* Display the count of unread notifications */}
                        </span>
                      )}
                    </div>
                  }
                >
                  <DropdownHeader>
                    <p className="text-black">Notifications</p>
                  </DropdownHeader>

                  {/* Render unread notifications */}
                  {unreadNotification.length > 0 ? (
                    unreadNotification.map((notification, index) => (
                      <DropdownItem
                        key={notification.id || index} // Use notification.id if available
                        onClick={() =>
                          handleNotificationClick(notification, index)
                        }
                      >
                        {notification.message}{" "}
                        {/* Render notification message */}
                      </DropdownItem>
                    ))
                  ) : (
                    <DropdownItem>No new notifications</DropdownItem> // Fallback for no notifications
                  )}
                </Dropdown>

                <Dropdown
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <img
                      className="rounded-full xl:w-12 xl:h-12  h-8  xl:mx-4 me-2  xl:me-2 cursor-pointer"
                      src={
                        userData.profilePic
                          ? userData.profilePic // User's profile picture
                          : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png" // Default profile pic
                      }
                      alt="User Profile"
                    />
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {`${userData.firstname} ${userData.lastname}`}{" "}
                      {/* User's name */}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {userData.email} {/* User's email */}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    onClick={() => {
                      nav("/profile"); // Navigate to profile
                    }}
                    icon={HiViewGrid}
                  >
                    View Profile
                  </Dropdown.Item>
                  <Dropdown.Item     onClick={() => nav("/AddDeitalsprofile")}  icon={HiCog}>Settings</Dropdown.Item>
                  <Dropdown.Item
                    icon={FaShoppingCart}
                    onClick={() => nav("/bag")} // Navigate to bag
                  >
                    My Bag
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiCurrencyDollar}   onClick={() => nav("/Accountbalance")}>
                    Earnings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("id"); // Remove user ID from localStorage
                      auth.signOut(); // Sign out the user
                      if (isAdmin) {
                        dispatch(logoutAdmin()); // Dispatch admin logout action
                      }
                      nav("/"); // Navigate to home
                    }}
                    icon={HiLogout}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown>

                {/* Greeting */}
                <div className="text-white xl:block hidden">
                  Hi, {userData.firstname} {userData.lastname}{" "}
                  {/* Greeting with name */}
                </div>
              </div>
            ) : (
              <div className="text-white me-2 sm:pb-0">
                <button
                  onClick={() => {
                    nav("/register"); // Navigate to register page
                  }}
                >
                  Register
                </button>{" "}
                /{" "}
                <button
                  onClick={() => {
                    dispatch(toggleFlag()); // Dispatch toggleFlag action for login modal
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </div>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <div>
            <div className="flex justify-between flex-wrap ">
              <div className="borderYtoX flex flex-col gap-y-4 md:gap-y-0 justify-center p-4 md:p-0 mt-4 font-medium rounded-lg bg-transparent sm:space-x-2 md:space-x-4 xl:space-x-7 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent">
               
               
               
                <NavLink
                  style={isActive}
                  to="/"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Home
                </NavLink>

                <NavLink
                  style={isActive}
                  to="earnings"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Products
                </NavLink>

                {/* <NavLink
                  style={isActive}
                  to="/order"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Order
                </NavLink> */}

                <NavLink
                  style={isActive}
                  to="/auction"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Auctions
                </NavLink>

                <NavLink
                  style={isActive}
                  to="/event"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Event
                </NavLink>

                {/* <NavLink
                  style={isActive}
                  to="/dd"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  BEST SELLER
                </NavLink> */}
                <NavLink
                  style={isActive}
                  to="/Users"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Users
                </NavLink>
              </div>
              {/* <div className="flex">
                    <a href="#">
                    <Button color="success">Sign UP</Button>
                    </a>
                    <a href="#">
                    <Button color="failure">Sign UP</Button>
                    </a>
                    </div> */}
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>

    //flowbit navbar

    // <section className="bg-[#72a398]">
    //   <div className="container flex flex-wrap justify-center sm:justify-between items-center border-white border-b-[1px] pb-0 py-1">

    //     {/* Search section */}
    //     {/* <div className="flex items-end content-end sm:hidden md:flex pt-5 sm:pt-0">
    //       <div>
    //         <BsSearch className="text-xl text-white cursor-pointer" />
    //       </div>
    //       <div>
    //         <input
    //           type="search"
    //           placeholder="Search "
    //           className="h-7 ms-2 bg-transparent border-l-0 border-t-0 border-r-0 focus:ring-0 focus:border-black text-white placeholder:text-white placeholder:font-light placeholder:text-sm"
    //         />
    //       </div>
    //     </div> */}

    //     {/* <!-- Website LOGO --> */}
    //     {/* <div className="ps-5 md:ps-0 pe-5 sm:pe-0 "> */}
    //     {/* <a href="/"> */}
    //     {/* <img src={Logo} alt="Logo" /> */}
    //     {/* Mashrabiya */}
    //     {/* </a> */}
    //     {/* </div> */}

    //     {/* =================== */}

    //     <Navbar className="flex  bg-[#72a398] py-4 justify-between w-full">
    //       <div>

    //         <Navbar.Brand as={Link} href="/">

    //           <span className=""></span>
    //         </Navbar.Brand>
    //       </div>

    //       <div className="   ">

    //         <Navbar.Toggle className="" />

    //       </div>

    //       <Navbar.Collapse className="container flex justify-between">

    //       </Navbar.Collapse>

    //     </Navbar>

    //     {/* =================== */}

    //   </div>
    // </section>
  );
}

export default BodyNav;
