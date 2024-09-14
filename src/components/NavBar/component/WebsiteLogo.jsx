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
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
function BodyNav() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const flag = useSelector((state) => state.homeReducer.flag);
  const isAdmin = useSelector((state) => state.adminReducer.isAdmin);
  const nav = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      onSnapshot(collection(db, "users"), (snapshot) => {
        const user = snapshot.docs
          .map((doc) => doc.data())
          .find((item) => item.id === localStorage.getItem("id")); // Find the user object

        if (user) {
          setUserData(user);

          // Set userData to the found user object
        }
      });
    };

    fetchUserData();
  }, []);
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
              <Dropdown
                label=""
                dismissOnClick={true}
                renderTrigger={() => (
                  <img
                    className=" rounded-full w-16 me-4 cursor-pointer"
                    src="https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                    alt=""
                  />
                )}
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    {`${userData.firstname} ${userData.lastname}`}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {userData.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() => {
                    nav("/profile");
                  }}
                  icon={HiViewGrid}
                >
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                <Dropdown.Item icon={FaShoppingCart } onClick={()=>nav("/bag")}>My Bag</Dropdown.Item>
                <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    localStorage.removeItem("id");
                    auth.signOut();
                    if (isAdmin) {
                      dispatch(logoutAdmin());
                    }
                    nav("/");
                  }}
                  icon={HiLogout}
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>

              <div className="text-white">
                Hi, {userData.firstname} {userData.lastname}
              </div>
            </div>
          ) : (
            <div className="text-white pb-5 sm:pb-0">
              <button
                onClick={() => {
                  nav("/register");
                }}
              >
                Register
              </button>{" "}
              /{" "}
              <button
                onClick={() => {
                  dispatch(toggleFlag());
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
