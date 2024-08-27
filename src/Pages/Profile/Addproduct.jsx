/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Textarea, Label, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { FileInput } from "flowbite-react";
import db from "../../Config/firebase";
import { storage } from "../../Config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
function Addproduct() {
  const [openModal, setOpenModal] = useState(false);
  let [data1, setdate1] = useState({ title: "", description: "", price: "" });
  let [imgurl, setimgurl] = useState(null);
  const [percent, setpercent] = useState(0);
  const getdate = (e) => {
    const { id, value } = e.target;
    setdate1((data1) => ({
      ...data1,
      [id]: value,
    }));
  };
  function onCloseModal() {
    setOpenModal(false);
  }
  function save() {
    setOpenModal(false);
    const storageRef = ref(storage, `productimg/${imgurl.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgurl);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const bits = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setpercent(bits);
      },
      (erorr) => {
        alert(erorr);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloaduRL) => {
          const collectionref = collection(db, "add product");
          const doc = addDoc(collectionref, {
            title: data1.title,
            description: data1.description,
            price: data1.price,
            review: "",
            img: downloaduRL,
          });
        });
      }
    );
    setdate1("");
    setimgurl("");
  }
  return (
    <>
      <button
        type="button"
        className="bot mr-20 mt-14 text-orange-100 "
        onClick={() => setOpenModal(true)}
      >
        Add Product
      </button>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
              Add Product
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value=" Title" className="text-xl" />
              </div>
              <TextInput
                id="title"
                placeholder=""
                required
                type="text"
                value={data1.title}
                onChange={getdate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Event Description"
                  value="Event Description"
                  className="text-xl"
                />
              </div>
              <Textarea
                id="description"
                placeholder=""
                required
                rows={4}
                onChange={getdate}
                value={data1.description}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Price" value="Price" className="text-xl" />
              </div>
              <TextInput
                id="price"
                type="text"
                required
                onChange={getdate}
                value={data1.price}
              />
            </div>
            <div id="fileUpload" className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="Event Img"
                  value="Event Img"
                  className="text-xl"
                />
              </div>
              <FileInput
                id="file"
                helperText="A profile picture is useful to confirm your are logged into your account"
                onChange={(e) => setimgurl(e.target.files[0])}
              />
            </div>
            <div className="w-1/2 flex justify-around ml-52">
              <Button className="bot2" onClick={save}>
                Done
              </Button>
              <Button className="bot2" onClick={onCloseModal}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Addproduct;
