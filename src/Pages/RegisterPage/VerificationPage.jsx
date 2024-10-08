/* eslint-disable no-unused-vars */
import { Card } from "flowbite-react";
import React, { useEffect } from "react";
import { auth } from "../../Config/firebase";
import { useNavigate } from "react-router-dom";

function VerificationPage() {
  const nav = useNavigate();
  useEffect(() => {
    auth.currentUser.emailVerified && nav("/");
  }, [nav]);
  return (
    <Card className=" text-center w-1/2 mx-auto my-12">
      Check your email to Continue your Registration
    </Card>
  );
}

export default VerificationPage;
