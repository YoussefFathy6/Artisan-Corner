import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../Config/firebase"; // مسار الفايربيس الخاص بك
import best11 from '../../assets/imges/newww/best11.jpg';

function Contactus() {
  // تعريف حالات لإدارة البيانات
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // دالة لتحديث المدخلات في النموذج
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // دالة لإرسال البيانات إلى فايربيس
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // إضافة البيانات في مجموعة "contacts" في فايربيس
      await addDoc(collection(db, "contacts"), formData);

      // رسالة نجاح
      setSuccessMessage("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      // رسالة خطأ
      setErrorMessage("Error sending message. Please try again.");
    }
  };

  return (
    <>
      <div
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${best11})`,
        }}
      >
        <div
          className="absolute inset-0 bg-[#344646cc]"
          style={{ zIndex: 1 }}
        ></div>
        <div className="relative z-10 text-white mt-64 text-center h-full">
          <h1 className="text-7xl">Contact Information</h1>
          {/* <p className="w-[60%] ml-96 mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sapiente,
            assumenda deserunt nesciunt neque incidunt.
          </p> */}
        </div>
      </div>
      <div className="flex justify-around items-center py-32 bg-gray-100">
        <div className=" w-[90%] flex justify-around p-10 bg-white shadow-lg ">
          {/* Left Side - Contact Info */}
          <div className="w-[35%] mt-20">
            <div className="mb-3 bg-gray-100 p-8">
              <h3 className="text-lg font-semibold">Phone Number</h3>
              <p className="text-sm">+123 456 7890</p>
            </div>
            <div className="mb-3 bg-gray-100 p-8">
              <h3 className="text-lg font-semibold">Email Address</h3>
              <p className="text-sm">example@gmail.com</p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-[35%] p-6 mt-10">
            <h3 className="text-xl font-semibold mb-4">Send Message</h3>
            <p className="text-sm mb-6">
              There are all kinds of passages available, but the majority have
              suffered alteration in some form.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md w-full h-32"
                required
              />
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-[#3d5050cc] text-white font-semibold rounded-md"
              >
                Send Message
              </button>
              {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contactus;
