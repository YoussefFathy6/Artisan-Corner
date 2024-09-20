
import React, { useState, useEffect } from "react";
import {
  Button,
  Textarea,
  Label,
  TextInput,
  FileInput,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import db from "../../Config/firebase";
import { getDocs, collection, query, where, doc, updateDoc } from "firebase/firestore";
import { storage } from "../../Config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function AddDeitalsprofile() {
  const [data, setData] = useState([]);
  const [imgurl, setImgUrl] = useState(null); // رابط الصورة الجديد أو الملف
  const [storedImageUrl, setStoredImageUrl] = useState(null); // رابط الصورة المحفوظة مسبقًا
  const [percent, setPercent] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("id", "==", localStorage.getItem("id")));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("User found!");
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setData([userData]);
          setStoredImageUrl(userData.profilePic); // تخزين رابط الصورة المحفوظة مسبقًا
          setUserId(doc.id);
        });
      } else {
        console.log("No user found!");
        throw new Error("User not found in the database.");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  async function save() {
    let downloadURL = storedImageUrl; // افتراضيًا استخدم الصورة المخزنة مسبقًا

    // إذا كان هناك صورة جديدة تم رفعها
    if (imgurl) {
      const storageRef = ref(storage, `profileimg/${imgurl.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgurl);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const bits = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(bits);
          },
          (error) => {
            alert(error);
            reject(error);
          },
          async () => {
            downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // تحديث رابط الصورة الجديدة
            resolve();
          }
        );
      });
    }

    if (userId) {
      const itemRef = doc(db, "users", userId);
      await updateDoc(itemRef, {
        firstname: data[0].firstname, 
        about: data[0].about,
        profilePic: downloadURL,
        lastname: data[0].lastname,
        email: data[0].email,
        accountType: data[0].accountType,
        facebook: data[0].facebook,
        instgram: data[0].instgram,
        linkedin: data[0].linkedin,
      });
      console.log(data);
      navigate("/profile", { state: { data } }); 
    } else {
      console.error("User ID is not defined.");
    }
  }

  return (
    <>
      <div>
        <h1 className="text-6xl mb-20">Profile</h1>
        {data.map((item, index) => {
          return (
            <div className="m-20" key={index}>
              <div className="flex justify-around gap-7">
                <div className="w-1/3">
                <div className="w-1/3">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="frist" value="First Name" />
                    </div>
                    <TextInput id="frist" type="text" sizing="sm" value={item.firstname} onChange={(e) => setData([{ ...item, firstname: e.target.value }])} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="last" value="Last Name" />
                    </div>
                    <TextInput id="last" type="text" sizing="sm" value={item.lastname} onChange={(e) => setData([{ ...item, lastname: e.target.value }])} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="aboutyou" value="About you" />
                    </div>
                    <Textarea id="aboutyou" required rows={4} value={item.about} onChange={(e) => setData([{ ...item, about: e.target.value }])} />
                  </div>
                </div>
                <div className="mt-6">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="FaceBook" />
                    </div>
                    <TextInput id="facebook" type="text" sizing="sm" value={item.facebook} onChange={(e) => setData([{ ...item, facebook: e.target.value }])} />
                  </div>
                  <div className="mt-6">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Instgram" />
                    </div>
                    <TextInput id="instgram" type="text" sizing="sm" value={item.instgram} onChange={(e) => setData([{ ...item, instgram: e.target.value }])} />
                  </div>
                </div>
                <div className="w-1/3">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="profileimg" value="Profile Img" />
                    </div>
                  
                    {storedImageUrl && (
                      <img src={storedImageUrl} alt="Profile" className="mb-4 w-28" />
                    )}
                    <FileInput id="profileimg" onChange={(e) => setImgUrl(e.target.files[0])} />
                  </div>
                  <div className="mt-6">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" type="text" sizing="sm" value={item.email} onChange={(e) => setData([{ ...item, email: e.target.value }])} />
                  </div>
                  <div className="mt-6">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Linkedin" />
                    </div>
                    <TextInput id="linkedin" type="text" sizing="sm" value={item.linkedin} onChange={(e) => setData([{ ...item, linkedin: e.target.value }])} />
                  </div>
                  <div className="mt-5">
                    <Label
                      htmlFor="accounttype"
                      value="Account Type"
                      className="mb-2"
                    />
                    <select
                      id="accounttype"
                      required
                      value={item.accountType}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setData((prevData) => [{ ...prevData[0], accountType: selectedValue }]); // تأكد من تحديث accountType
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 text-lg rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="Artist">Artist</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </div>

                </div>
              </div>
              <Button className="bot2" onClick={save}>
                DONE
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AddDeitalsprofile;
