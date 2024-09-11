import React from "react";
import {
  Button,
  Textarea,
  Label,
  TextInput,
  FileInput,
} from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../../Config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function AddDeitalsprofile() {
  let [data, setdata] = useState({ name: "", department: "", aboutyou: "" });
  const [storedValue, setStoredValue] = useState("");
  const [imgurl, setimgurl] = useState(null);
  const [percent, setpercent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const value = localStorage.getItem("id");
    if (value) {
      setStoredValue(value);
    }
  }, []);

  const getdata = (e) => {
    const { id, value } = e.target;
    setdata((data) => ({
      ...data,
      [id]: value,
    }));
  };

  async function save() {
    const storageRef = ref(storage, `profileimg/${imgurl.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgurl);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const bits = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setpercent(bits);
      },
      (error) => {
        alert(error);
      },
      async () => {
        const downloaduRL = await getDownloadURL(uploadTask.snapshot.ref);
        const collectionref = collection(db, "profiledeitals");

        const docRef = await addDoc(collectionref, {
          Name: data.name,
          Department: data.department,
          About: data.aboutyou,
          id: storedValue,
          img: downloaduRL,
        });

        const docId = docRef.id; 

        navigate(`/profile/${docId}`);
      }
    );

    setdata({
      name: "",
      department: "",
      aboutyou: "",
    });
    setimgurl(null);
  }

  return (
    <>
      <div className="m-20">
        <h1 className="text-6xl mb-20">profile</h1>
        <div className="flex justify-around gap-7">
          <div className=" w-1/3">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Name" />
              </div>
              <TextInput id="name" type="text" sizing="sm"
                value={data.name}
                onChange={getdata}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Department" />
              </div>
              <TextInput id="department" type="text" sizing="sm"
                value={data.department}
                onChange={getdata}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="About you" />
              </div>
              <Textarea id="aboutyou" placeholder="" required rows={4}
                value={data.aboutyou}
                onChange={getdata}
              />
            </div>
          </div>
          <div className=" w-1/3">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Profile Img" />
              </div>
              <FileInput id="profileimg"
                onChange={(e) => setimgurl(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <Button className="bot2" onClick={save}>
          DONE
        </Button>
      </div>
    </>
  );
}

export default AddDeitalsprofile;