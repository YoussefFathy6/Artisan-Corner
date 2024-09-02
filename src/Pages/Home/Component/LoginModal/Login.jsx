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
import { auth } from "../../../../Config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
        })
        .catch((err) => {
          reject(err);
        });
    });
    function logoutAcc() {
      auth.signOut();
      localStorage.removeItem("id");
    }
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
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Welcome back
          </h2>
          <div className="flex justify-between mb-4">
            <button className="flex-1 py-2 mr-2 bg-white border border-gray-300 rounded-md flex items-center justify-center">
              <div className="flex justify-between items-center py-2 pe-2">
                <img
                  src="https://cdn.dribbble.com/users/904380/screenshots/2230701/attachments/415076/google-logo-revised.png"
                  alt="Google"
                  className="w-1/4"
                />
                Login with Google{" "}
              </div>
            </button>
            <button className="flex-1 py-2 ml-2 bg-secondary text-white border border-gray-300 rounded-md flex items-center justify-center">
              <div className="flex justify-between items-center p-2">
                <img
                  src="https://pngimg.com/d/apple_logo_PNG19666.png"
                  alt="Apple"
                  className="w-1/6"
                />
                Login with Apple
              </div>
            </button>
          </div>
          <p className="text-center text-gray-500 my-4">or</p>
          <form>
            <div className="mb-4">
              <label className="block text-left text-sm font-medium text-gray-700">
                Email
              </label>
              <TextInput
                onChange={getEmail}
                placeholder="Enter your Email"
                className="w-full mt-1 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></TextInput>
            </div>
            <div className="mb-4">
              <label className="block text-left text-sm font-medium text-gray-700">
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
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <button className="text-sm text-blue-500">
                Forgot password?
              </button>
            </div>
            <Button
              onClick={loginAcc}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
              className="text-blue-500"
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
