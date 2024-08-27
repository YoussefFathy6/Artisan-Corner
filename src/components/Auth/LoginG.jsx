import React from "react";
import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";

 function LoginG() {
  return (
    <>
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="email4" value="Your email" />
      </div>
      <TextInput id="email4" type="email" icon={HiMail} placeholder="Email or Phon" required />
    </div>
    </>
  )}
  export default LoginG
