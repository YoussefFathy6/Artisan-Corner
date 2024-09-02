/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Modal, TextInput } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFlag } from "../../../../Redux/Slices/homeSlice";

function LoginModal(props) {
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.homeReducer.flag);
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
                onChange={props.getEmail}
                placeholder="Enter your Email"
                className="w-full mt-1 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></TextInput>
            </div>
            <div className="mb-4">
              <label className="block text-left text-sm font-medium text-gray-700">
                Password
              </label>
              <TextInput
                onChange={props.getPass}
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
              onClick={props.loginAcc}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign in to your account
            </Button>
          </form>
          <p className="mt-6 text-sm text-center">
            Don’t have an account yet?{" "}
            <button className="text-blue-500">Sign up here</button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
