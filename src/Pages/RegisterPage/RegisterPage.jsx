/* eslint-disable no-unused-vars */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Label, Radio } from "flowbite-react";
import db, { auth } from "../../Config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegistraionInput from "./RegistraionInput";
import { addDoc, collection } from "firebase/firestore";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.homeReducer.flag);
  const nav = useNavigate();
  const usersCollection = collection(db, "users");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(5, "Name length must be more than 5 characters")
      .required("First Name is required"),
    lastname: Yup.string()
      .min(5, "Name length must be more than 5 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format"
      )
      .required("Email is required"),
    pass: Yup.string()
      .min(7, "Password must be more than 7 characters")
      .required("Password is required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("pass"), null], "Passwords must match")
      .required("Confirm Password is required"),
    accountType: Yup.string().required("Please choose an account type"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      pass: "",
      confirm: "",
      accountType: "", // Add this field for account type
    },
    validationSchema,
    onSubmit: (values) => {
      registerUser(values);
    },
  });

  // Register user function with email verification
  async function registerUser(values) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.pass
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      console.log("Verification email sent!");

      await addDoc(usersCollection, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        id: user.uid,
        accountType: values.accountType, // Add account type to Firestore
      });

      localStorage.setItem("id", user.uid);
      auth.currentUser.emailVerified ? nav("/") : nav("/verify");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto p-3 bg-primary shadow-md rounded-lg my-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <div className="flex justify-between mb-4">
        {/* Social login buttons */}
        <button className="flex-1 py-2 mr-2 bg-white border border-gray-300 rounded-md flex items-center justify-center">
          <div className="flex justify-between items-center py-2 pe-2">
            <img
              src="https://cdn.dribbble.com/users/904380/screenshots/2230701/attachments/415076/google-logo-revised.png"
              alt="Google"
              className="w-1/4"
            />
            Login with Google
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
      <form onSubmit={formik.handleSubmit}>
        <RegistraionInput
          name="firstname"
          lbl="First Name"
          func={formik.handleChange}
          placeholder="Enter Your First Name"
          value={formik.values.firstname}
          error={formik.errors.firstname}
        />
        <RegistraionInput
          name="lastname"
          lbl="Last Name"
          func={formik.handleChange}
          placeholder="Enter Your Last Name"
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
        <RegistraionInput
          name="email"
          lbl="Email"
          func={formik.handleChange}
          placeholder="Enter Your Email"
          value={formik.values.email}
          error={formik.errors.email}
        />
        <RegistraionInput
          name="pass"
          lbl="Password"
          func={formik.handleChange}
          placeholder="Enter Your Password"
          type="password"
          value={formik.values.pass}
          error={formik.errors.pass}
        />
        <RegistraionInput
          name="confirm"
          lbl="Confirm Password"
          func={formik.handleChange}
          placeholder="Enter Your Password Again"
          type="password"
          value={formik.values.confirm}
          error={formik.errors.confirm}
        />
        <fieldset className="flex flex-row max-w-md justify-between my-4">
          <legend className="mb-4">Choose your Account Type</legend>
          <div className="flex items-center gap-2">
            <Radio
              id="artist"
              name="accountType"
              value="artist"
              onChange={formik.handleChange}
              checked={formik.values.accountType === "artist"}
            />
            <Label htmlFor="artist">Artist</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="customer"
              name="accountType"
              value="customer"
              onChange={formik.handleChange}
              checked={formik.values.accountType === "customer"}
            />
            <Label htmlFor="customer">Customer</Label>
          </div>
          {formik.errors.accountType && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.accountType}
            </div>
          )}
        </fieldset>
        <Button
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          type="submit"
        >
          Signup
        </Button>
      </form>
      <p className="mt-6 text-sm text-center">
        Already have an account?{" "}
        <button onClick={() => nav("/")} className="text-blue-500">
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;
