

import{Button, Checkbox, Label, TextInput } from "flowbite-react";
 
import { FaTimes, FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import db from "../config/firebase";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import {createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
  
  const { register, handleSubmit } = useForm();


  function userLogin(values){
    console.log(values)

     createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
       console.log(user.uid)
       console.log(user.email)
       console.log(user.password)
       


      })
    
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log (errorMessage)
       
      });
     

     }
       



  // async function checkdb(data) {
  //   const { password, email } = data;
    
  //   const collectionRef = collection(db, "userlogin");
  //   const q = query(collectionRef, where('email', '==', email), where('password', '==', password));
  //   const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //      alert('User found with matching email and password.');

  //       // querySnapshot.forEach((doc) => {
  //       //   console.log('User details:', doc.id, ' => ', doc.data());
  //       // });
  //       // return true;
  //     } else {
  //   alert('!!No matching user found please sign in');
  //       return false;
  //     }

    
  // }

  return (
    <>
    

    <form onSubmit={handleSubmit(userLogin)} className=" ms-96 mt-10 flex max-w-md flex-col gap-4 border-4 border-orange-500 border-solid  mb-40 p-8">
    <div className="flex justify-end p-5">
        <button className="text-center w-8 p-2 rounded-full border-2 items-center bg-orange-500" id="exit">
          <FaTimes style={{ color: '#000000' }} />
        </button>
      </div>
      <div className="mb-6 block">
        <h1 className="mb-2"> Login </h1>
        <p className="mb-2"> Please enter your login details to sign in .</p>
      </div>
      <div>
        <TextInput {...register("email")} id="email2" type="email" placeholder="Email Address" required shadow />
      </div>
      <div>
        <TextInput {...register("password")} id="password2" type="password" placeholder="Password" required shadow />
      </div>

      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            Keep me logged in
          </Label>
        </div>
        <div>
          < Link to="/ResetPassword" className="text-orange-500"> Forget password ?</Link>
        </div>
      </div>

      <Button type="submit" className="bg-orange-500">Log in</Button>

      <div className="flex items-center gap-2">
        <p className="">Don't have an account ?
          <Link to="/Sign" className="text-orange-500">Sign up </Link>
        </p>
      </div>

      <div>
        <p id="p_or" className="text-1xl text-center p-2 mt-2">or continue with</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button className="ms-20 rounded-md p-5 border-2 border-orange-500 border-solid">
          <FaFacebookF className="text-3xl text-orange-500" />
        </button>
        <button className="mx-20 rounded-md p-5 border-2 border-orange-500 border-solid">
          <FaGooglePlusG className="text-3xl text-orange-500" />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <p className="">Having trouble login in?
          <a href="#" className="text-orange-500">Get help</a>
        </p>
      </div>
    </form>
    </>
  );
}

export default Login;