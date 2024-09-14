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
          console.log(unreadNotifications); // Log unread notifications
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
      // Update the notification status in Firestore
      const userRef = doc(db, "users", userData.docId); // Reference to the current user
      const updatedNotifications = [...userData.notifications]; // Create a copy of notifications
      updatedNotifications[index].read = true; // Mark the specific notification as read

      // Update Firestore document
      await updateDoc(userRef, {
        notifications: updatedNotifications,
      });

      // Update the local state
      setUnread(updatedNotifications.filter((item) => item.read === false));

      // Navigate to the auction page
      nav("/auction");
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <section className="bg-[#913b10]">
      <div className="container flex flex-wrap justify-center sm:justify-between items-center border-white border-b-[1px] pb-0 py-1">
        {/* Search section */}
        {/* <div className="flex items-end content-end sm:hidden md:flex pt-5 sm:pt-0">
          <div>
            <BsSearch className="text-xl text-white cursor-pointer" />
          </div>
          <div>
            <input
              type="search"
              placeholder="Search "
              className="h-7 ms-2 bg-transparent border-l-0 border-t-0 border-r-0 focus:ring-0 focus:border-black text-white placeholder:text-white placeholder:font-light placeholder:text-sm"
            />
          </div>
        </div> */}

        {/* <!-- Website LOGO --> */}
        <div className="ps-5 md:ps-0 pe-5 sm:pe-0 ">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>

        {/* =================== */}
        <div>
          {/* <!-- User Greeting or Register/Login --> */}
          {localStorage.getItem("id") && userData ? (
            <div className="flex items-center justify-between ">
              {/* Notifications Dropdown */}
              <Dropdown
                renderTrigger={() => <FaBell color="white" />}
                color={"transparent"}
              >
                <DropdownHeader>
                  <p>Notifications</p>
                </DropdownHeader>
                {/* Render unread notifications */}
                {unreadNotification.length > 0 ? (
                  unreadNotification.map((notification, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() =>
                        handleNotificationClick(notification, index)
                      }
                    >
                      {notification.message} {/* Render notification message */}
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem>No new notifications</DropdownItem> // Fallback for no notifications
                )}
              </Dropdown>
              <Dropdown
                label=""
                dismissOnClick={true}
                renderTrigger={() => (
                  <img
                    className="rounded-full w-16 me-4 cursor-pointer"
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
                <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                <Dropdown.Item
                  icon={FaShoppingCart}
                  onClick={() => nav("/bag")} // Navigate to bag
                >
                  My Bag
                </Dropdown.Item>
                <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
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
              <div className="text-white">
                Hi, {userData.firstname} {userData.lastname}{" "}
                {/* Greeting with name */}
              </div>
            </div>
          ) : (
            <div className="text-white pb-5 sm:pb-0">
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
      </div>
    </section>
  );
}

export default BodyNav;
