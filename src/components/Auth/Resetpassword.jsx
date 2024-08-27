/* eslint-disable no-unused-vars */
import React from "react";
import db from "../../Config/firebase";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import { auth } from "../../Config/firebase";

function ResetPassword() {
  const { register, handleSubmit } = useForm();

  function sendPassword(values) {
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }

  return (
    <>
      <h2 className="flex  flex-col gap-4  text-center  text-orange-500  p-8">
        Reset Your Password{" "}
      </h2>

      <form
        onSubmit={handleSubmit(sendPassword)}
        className="  flex  flex-col gap-4  text-center  items-center ms-0.5  "
      >
        <div>
          <TextInput
            {...register("email")}
            placeholder="enter your email"
            id="email"
            type="email"
            required
            className="w-80"
          />
        </div>

        <Button type="submit" className="bg-orange-500  hover:bg-orange-600  ">
          Reset
        </Button>
      </form>
    </>
  );
}
export default ResetPassword;
