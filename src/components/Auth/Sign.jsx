import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { FaTimes, FaFacebookF, FaGooglePlusG } from "react-icons/fa"; // استيراد الأيقونات من react-icons/fa
import { object, string } from "yup";
import db from "../../Config/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { provider } from "../../Config/firebase";
function Sign() {
  let sign = object({
    name: string().required(),
    password: string()
      .required()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    email: string().email(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(sign) });

  async function addTodb(values) {
    const collectionref = collection(db, "userlogin");
    const doc = await addDoc(collectionref, {

      name: values.name,
      password: values.password,
      email: values.email,
    });
    // const nav=useNavigation()
    // nav("/#");


  }

  function handleLogin() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        console.log("GGG");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
   

  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addTodb)}
        className=" ms-96 mt-10 flex max-w-md flex-col gap-4 border-4 border-orange-500 border-solid p-8"
      >
        <div>
          <div className="flex justify-end  p-5 ">
            <button
              className="text-center w-8 p-2 rounded-full border-2 items-center   bg-orange-500"
              id="exit"
            >
              <FaTimes style={{ color: "#000000" }} />
            </button>
          </div>
          <div className="mb-6 block">
            <h1 className="mb-2"> Sign up </h1>
            <p className="mb-2 "> Create your account in seconds.</p>
          </div>

          <TextInput
            {...register("name")}
            id="name"
            type="text"
            placeholder="Full Name"
            required
          />
        </div>

        <div>
          <TextInput
            {...register("email")}
            id="email2"
            type="email"
            placeholder="Email Address"
            required
            shadow
          />
        </div>
        <div>
          <TextInput
            {...register("password")}
            id="password2"
            type="password"
            placeholder="Password"
            required
            shadow
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree to the{" "}
            <span className="capitalize text-orange-500 font-bold">
              Terms of Use
            </span>{" "}
            &{" "}
            <span className="capitalize text-orange-500 font-bold">
              Privacy Policy
            </span>
          </Label>
        </div>

        <h3>{errors.password?.message}</h3>

        <Button type="submit" className="bg-orange-500">
          Create an account
        </Button>

        <div className="flex items-center gap-2">
          <p className="">
            Already a member?
            <Link to="/Login" className="text-orange-500">
              Log in
            </Link>
          </p>
        </div>
        <div>
          <p id="p_or" className="text-1xl text-center p-2 mt-2">
            or contnue with
          </p>
        </div>
        <div className="flex items-center justify-between  mt-4">
          <button className="ms-20 rounded-md  p-5  border-2 border-orange-500 border-solid">
            <FaFacebookF className=" text-3xl text-orange-500" />{" "}
            {/* استخدام FaFacebookF بدلاً من <i className="fa-brands fa-facebook-f"> */}
          </button>
          <button
            onClick={handleLogin}
            className="mx-20  rounded-md p-5 border-2 border-orange-500 border-solid"
          >
            <FaGooglePlusG className=" text-3xl text-orange-500" />{" "}
            {/* استخدام FaGooglePlusG بدلاً من <i className="fa-brands fa-google-plus-g"> */}
          </button>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <p className="">
            Having trouble login in?
            <Link to="#" className="text-orange-500">
              Get help
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Sign;
