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
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
} from "firebase/firestore"; // import updateDoc
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import NavSections from "./NavSections";
import { Link, NavLink } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";

function BodyNav() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null); // State to hold user data
  const [unreadNotification, setUnread] = useState([]); // State to hold unread notifications
  const [unopenedOrder, setUnopenedOrder] = useState([]); // State to hold unread notifications
  const [contacts, setContacts] = useState([]); // State to hold unread notifications
  const flag = useSelector((state) => state.homeReducer.flag); // Flag from Redux
  const isAdmin = useSelector((state) => state.adminReducer.isAdmin); // Admin status from Redux
  const nav = useNavigate(); // For navigation

  const [unseenContactsCount, setUnseenContactsCount] = useState(0);

  useEffect(() => {
    const storedId = localStorage.getItem("id"); // Retrieve the ID from local storage
    console.log("Stored ID:", storedId); // Debugging line

    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let contacts = [];
      let unseenCount = 0; // Initialize unseen contacts count

      querySnapshot.forEach((doc) => {
        const contactData = { id: doc.id, ...doc.data() };
        console.log("Contact Data:", contactData); // Debugging line
        console.log("IDlist:", contactData.IDlist);

        // Ensure IDlist exists and is an array before trying to find
        if (Array.isArray(contactData.IDlist)) {
          console.log("isArray");

          const found = contactData.IDlist.find(
            (item) => String(item) === storedId
          );

          if (found) {
            contacts.push(contactData);

            // Only check the last message in the array
            if (
              Array.isArray(contactData.message) &&
              contactData.message.length > 0
            ) {
              const lastMessage =
                contactData.message[contactData.message.length - 1];

              // Check if the sender of the last message is not the user and the message is unseen
              if (
                lastMessage.sender !== storedId &&
                lastMessage.seen === false
              ) {
                unseenCount += 1;
              }
            }
          }
        } else {
          console.log("IDlist is not an array or is missing for:", contactData);
        }
      });

      setContacts(contacts);
      setUnseenContactsCount(unseenCount); // Update unseen contacts count
      console.log("Unseen contacts count:", unseenCount); // Debugging line
    });

    return () => unsubscribe();
  }, []);

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
          const unopenedOrders = getUnopened(user);
          setUnopenedOrder(unopenedOrders); // Set the unread notifications
        }
      });
    };
    console.log(unopenedOrder);

    fetchUserData();

    // Helper function to filter unread notifications
    function getUnread(userData) {
      return userData.notifications.filter((item) => item.read === false); // Return unread notifications
    }
    function getUnopened(userData) {
      return userData.specialOrder.filter((item) => item.opened === false); // Return unread notifications
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
  const handleOrderClick = async (order, index) => {
    try {
      // Reference to the current user in Firestore
      const userRef = doc(db, "users", userData.docId);

      // Find the correct notification in the original array
      const updatedOrders = userData.specialOrder.map((ord) =>
        ord.id === order.id // Check if the current notification matches the clicked one
          ? { ...ord, opened: true } // Mark as read if it's the clicked notification
          : ord
      );

      // Update Firestore document with modified notifications array
      await updateDoc(userRef, {
        specialOrder: updatedOrders,
      });

      // Update the local state by filtering out unread notifications
      setUnopenedOrder(updatedOrders.filter((ord) => ord.read === false));

      // Navigate to the auction page
      nav("/special");
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
      color: isActive && "#fccd88",
      borderRadius: isActive && "10px",
      textAlign: isActive && "center",
      transition: isActive && "all 0.2s ",
    };
  };
  const combinedNotifications = [
    ...unreadNotification.map((notification) => ({
      ...notification,
      type: "notification",
    })),
    ...unopenedOrder.map((order) => ({ ...order, type: "order" })),
  ];
  return (
    // bg-[#72a398]
    //flowbit navbar
    <>
      <Navbar className="bg-[#344646]">
        <Navbar.Brand href="/">
          {/* <span
            style={{ fontFamily: "cursive" }}
            className="self-center whitespace-nowrap xl:text-3xl lg:text-3xl text-md  text-white font-bold"
          >
            Mashrabiya
          </span> */}

          <span
            className="first text-2xl md:text-4xl text-white"
            style={{ fontFamily: "Updock, cursive" }}
          >
            ALKhan
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 items-center">
          <div>
            {/* <!-- User Greeting or Register/Login --> */}
            {localStorage.getItem("id") && userData ? (
              <div className="flex items-center">
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button className="flex items-center justify-center">
                    <IoMdMail
                      color="white"
                      size={24}
                      onClick={() => {
                        nav("/chat");
                      }}
                    />
                  </button>
                  {unseenContactsCount > 0 && (
                    <span className="absolute top-0 right-0 left-4 bottom-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unseenContactsCount}{" "}
                      {/* Display the count of contacts with unseen messages */}
                    </span>
                  )}
                </div>

                <Dropdown
                  color={"transparent"}
                  label={
                    <div className="relative ">
                      <FaBell color="white" size={24} />{" "}
                      {/* Notification bell icon */}
                      {combinedNotifications.length > 0 && (
                        <span className=" absolute top-0 right-0 left-2 bottom-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                          {combinedNotifications.length}{" "}
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
                  {unreadNotification.length > 0 || unopenedOrder.length > 0 ? (
                    combinedNotifications.map((item, index) => (
                      <DropdownItem
                        key={item.id || index} // Use id if available
                        onClick={
                          item.type === "notification"
                            ? () => handleNotificationClick(item, index)
                            : () => handleOrderClick(item, index)
                        } // Assuming you handle both notifications and orders similarly
                      >
                        {item.type === "notification" ? (
                          <>
                            📩 Notification: {item.message}{" "}
                            {/* Render notification message */}
                          </>
                        ) : (
                          <>
                            🛒 Order: {item.orderDetails}{" "}
                            {/* Render order details */}
                          </>
                        )}
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
                      nav("/setting"); // Navigate to profile
                    }}
                    icon={HiViewGrid}
                  >
                    View Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => nav("/AddDeitalsprofile")}
                    icon={HiCog}
                  >
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={FaShoppingCart}
                    onClick={() => nav("/bag")} // Navigate to bag
                  >
                    My Bag
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={HiCurrencyDollar}
                    onClick={() => nav("/accountbalance")}
                  >
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
                    Log out
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

                {/* <NavLink
                  style={isActive}
                  to="earnings"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Products
                </NavLink> */}
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
                  Artists
                </NavLink>
                <NavLink
                  style={isActive}
                  to="/Contactus"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Contact US
                </NavLink>
                {/* <NavLink
                  style={isActive}
                  to="/Contactus"
                  className="text-base md:text-sm lg:text-base font-medium text-[#ffffffd8] hover:text-white"
                >
                  Contact US
                </NavLink> */}
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
