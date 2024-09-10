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

  // let [data1, setdate1] = useState({ title: "", description: "", price: 0 });

  let [data1, setdate1] = useState({
    title: "",
    description: "",
    price: "",
    typeproduct: "",
    productquantity: 0,
  });
  // >>>>>>> c9846784e70bf42694439466fe80f9b56f38274c
  let [imgurl, setimgurl] = useState(null);
  const [percent, setpercent] = useState(0);
  const getdate = (e) => {
    const { id, name, value, type } = e.target;

    setdate1((data1) => ({
      ...data1,
      [name ? name : id]: value,
      [id]: type === "number" ? Number(value) : value,
    }));
    console.log(data1);
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
          const collectionref = collection(db, "tempProduct");
          const doc = addDoc(collectionref, {
            title: data1.title,
            description: data1.description,
            price: Number(data1.price),
            review: "",
            img: downloaduRL,
            productquantity: data1.productquantity,
            typeproduct: data1.typeproduct,
            ownerID: localStorage.getItem("id"),
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
      <Modal show={openModal} size="5xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
              Add Product
            </h3>

            {/* تقسيم إلى عمودين */}
            <div className="grid grid-cols-2 gap-10">
              {/* العمود الأول */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" className="text-xl" />
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

              {/* العمود الثاني */}
              <div>
                <div className="block">
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

              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Type Product" className="text-xl" />
                </div>
                <select
                  id="typeproduct"
                  required
                  onChange={getdate}
                  value={data1.typeproduct}
                  className="block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 text-lg rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Macramé">Macramé</option>
                  <option value="Painting">Painting</option>
                  <option value="Wood carving">Wood carving</option>
                  <option value="Pottery">Pottery</option>
                </select>
              </div>

              {/* العمود الثالث */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label
                    htmlFor="Product Quantity"
                    value="Product Quantity"
                    className="text-xl"
                  />
                </div>
                <TextInput
                  id="productquantity"
                  type="number"
                  required
                  value={data1.productquantity}
                  onChange={getdate}
                />
              </div>

              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label
                    htmlFor="Event Img"
                    value="Event Img"
                    className="text-xl"
                  />
                </div>
                <FileInput
                  id="file"
                  helperText="A profile picture is useful to confirm you are logged into your account"
                  onChange={(e) => setimgurl(e.target.files[0])}
                />
              </div>
            </div>

            <div className="w-full flex justify-center space-x-4">
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
