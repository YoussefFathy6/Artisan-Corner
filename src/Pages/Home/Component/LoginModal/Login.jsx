/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Checkbox,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../../../../Config/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleFlag } from "../../../../Redux/Slices/homeSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  //variables
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.homeReducer.flag);
  const nav = useNavigate();
  //variables

  //functions
  function getEmail(e) {
    setEmail(e.target.value);
  }
  function getPass(e) {
    setPass(e.target.value);
  }
  function loginAcc() {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          resolve(res.user.uid);
          console.log("done");
          localStorage.setItem("id", auth.currentUser.uid);
          dispatch(toggleFlag());

          // Reload the page to show updated user data in the navbar
          window.location.reload();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function logoutAcc() {
    auth.signOut();
    localStorage.removeItem("id");
  }
  function loginWithGoolge() {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem("id", data.user.uid);
      console.log(localStorage.getItem("id"));
      console.log(data.user.uid);
      console.log(data.user.displayName);
      dispatch(toggleFlag());
      // console.log(data.user.email);
      // console.log(data.user.metadata);
    });
  } //functions
  useEffect(() => {
    localStorage.getItem("id") ? console.log("login") : console.log("Not");
  }, []);
  // return <LoginModal loginfun={loginAcc} email={getEmail} pass={getPass} />;
  return (
    <Modal show={flag} onClose={() => dispatch(toggleFlag())}>
      <Modal.Header>Terms of Service</Modal.Header>
      <Modal.Body>
        <div className="max-w-md mx-auto p-3 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl text-secondary font-semibold mb-6 text-center">
            Welcome back
          </h2>
          <div className="flex justify-center mb-4 ">
            <button
              onClick={loginWithGoolge}
              className="flex-1 py-2 mr-2 bg-white border border-gray-300 rounded-md flex items-center justify-center"
            >
              <div className="flex justify-between items-center py-2 pe-2 w-1/2">
                <img
                  src="https://cdn.dribbble.com/users/904380/screenshots/2230701/attachments/415076/google-logo-revised.png"
                  alt="Google"
                  className="w-1/4"
                />
                Login with Google
              </div>
            </button>
          </div>
          <p className="text-center text-gray-500 my-4">or</p>
          <form>
            <div className="mb-4">
              <label className="block text-secondary text-left text-sm font-medium text-gray-700">
                Email
              </label>
              <TextInput
                onChange={getEmail}
                placeholder="Enter your Email"
                className="w-full mt-1 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></TextInput>
            </div>
            <div className="mb-4">
              <label className="block text-secondary text-left text-sm font-medium text-gray-700">
                Password
              </label>
              <TextInput
                onChange={getPass}
                type="password"
                placeholder="Enter your Password"
                className="w-full mt-1 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></TextInput>
            </div>
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2 text-secondary" />
                Remember me
              </label>
              <button className="text-sm text-secondary">
                Forgot password?
              </button>
            </div>
            <Button
              onClick={loginAcc}
              className="w-full py-2 bg-secondary text-white rounded-md hover:bg-blue-700"
            >
              Sign in to your account
            </Button>
          </form>
          <p className="mt-6 text-sm text-center">
            Don’t have an account yet?{" "}
            <button
              onClick={() => {
                nav("/register");
              }}
              className="text-secondary"
            >
              Sign up here
            </button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
