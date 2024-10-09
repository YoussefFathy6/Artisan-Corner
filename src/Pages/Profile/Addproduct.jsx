/* eslint-disable no-unused-vars */
import React from "react";
import {
  Button,
  Textarea,
  Label,
  Modal,
  TextInput,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { useState } from "react";
import { FileInput } from "flowbite-react";
import db from "../../Config/firebase";
import { storage } from "../../Config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
function Addproduct() {
  const [openModal, setOpenModal] = useState(false);
  const [openAucModal, setOpenAucModal] = useState(false);
  const [data1, setdate1] = useState({
    title: "",
    description: "",
    price: "",
    typeproduct: "",
    productquantity: 0,
  });
  const [aucData, setAucData] = useState({
    title: "",
    description: "",
    initPrice: "",
    startDate: "",
    endDate: "",
  });
  const [imgurl, setimgurl] = useState(null);
  const [percent, setpercent] = useState(0);

  const getdate = (e) => {
    const { id, name, value, type } = e.target;
    setdate1((prevData) => ({
      ...prevData,
      [name ? name : id]: type === "number" ? Number(value) : value,
    }));
  };
  const getAucData = (e) => {
    const { id, name, value, type } = e.target;
    setAucData((prevData) => ({
      ...prevData,
      [name ? name : id]: type === "number" ? Number(value) : value,
    }));
  };

  function onCloseModal() {
    setOpenModal(false);
    setOpenAucModal(false);
  }

  function save() {
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
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloaduRL) => {
          if (data1.title && data1.description) {
            const collectionref = collection(db, "tempProducts");
            addDoc(collectionref, {
              title: data1.title,
              description: data1.description,
              price: Number(data1.price),
              review: "",
              img: downloaduRL,
              productquantity: data1.productquantity,
              typeproduct: data1.typeproduct,
              ownerID: localStorage.getItem("id"),
            });
            toast.success("Added successfully", {
              position: "top-right",
            });
          } else if (aucData.title && aucData.description) {
            const collectionref = collection(db, "auctionProduct");
            addDoc(collectionref, {
              title: aucData.title,
              description: aucData.description,
              initPrice: Number(aucData.initPrice),
              img: downloaduRL,
              ownerID: localStorage.getItem("id"),
              startDate: aucData.sdate,
              endDate: aucData.edate,
              members: [],
              proposals: [],
            });
            toast.success("Added successfully", {
              position: "top-right",
            });
          }
        });
      }
    );

    // Reset form data after save
    setdate1({
      title: "",
      description: "",
      price: "",
      typeproduct: "",
      productquantity: 0,
    });
    setAucData({
      title: "",
      description: "",
      initPrice: "",
      startDate: "",
      endDate: "",
    });
    setimgurl(null);
    setOpenModal(false);
    setOpenAucModal(false);
  }

  return (
    <>
      <div className="w-auto h-auto">
        <div className="">
          <Dropdown
            renderTrigger={() => (
              <div className=" h-full py-3 bg-[#204d43] text-white shadow rounded-full cursor-pointer ">
                <div className="relative ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            )}
          >
            <DropdownItem>
              <button onClick={() => setOpenModal(true)}>
                Add Regular Product
              </button>
            </DropdownItem>
            <DropdownItem>
              <button onClick={() => setOpenAucModal(true)}>
                Add Auction Product
              </button>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <Modal show={openModal} size="7xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body
          style={{
            backgroundImage: `url(${"https://i.pinimg.com/736x/f1/5c/f6/f15cf6f020f82daefe5a86cb26a6ecaf.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="space-y-6 m-10 p-10">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
              Add Product
            </h3>

            {/* Container for the form with two columns */}
            <div className="grid grid-cols-2 gap-6">
              {/* First Column */}
              <div>
                <Label htmlFor="title" value="Title" className="text-xl mb-2" />
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
                <Label
                  htmlFor="description"
                  value="Description"
                  className="text-xl mb-2"
                />
                <Textarea
                  id="description"
                  placeholder=""
                  required
                  rows={4}
                  onChange={getdate}
                  value={data1.description}
                />
              </div>

              {/* Second Column */}
              <div>
                <Label htmlFor="price" value="Price" className="text-xl mb-2" />
                <TextInput
                  id="price"
                  type="text"
                  required
                  onChange={getdate}
                  value={data1.price}
                />
              </div>

              <div>
                <Label
                  htmlFor="typeproduct"
                  value="Type Product"
                  className="text-xl mb-2"
                />
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
                  <option value="Macramé">Textile</option>
                  <option value="Painting">Painting</option>
                  <option value="Wood carving">Antique</option>
                  <option value="Pottery">Pottery</option>
                </select>
              </div>

              {/* Third Column */}
              <div>
                <Label
                  htmlFor="productquantity"
                  value="Product Quantity"
                  className="text-xl mb-2"
                />
                <TextInput
                  id="productquantity"
                  type="number"
                  required
                  value={data1.productquantity}
                  onChange={getdate}
                />
              </div>

              <div>
                <Label
                  htmlFor="file"
                  value="Product Image"
                  className="text-xl mb-2"
                />
                <FileInput
                  id="file"
                  helperText="Upload a product image."
                  onChange={(e) => setimgurl(e.target.files[0])}
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button className="bg-[#354646cc]" onClick={save}>
                Done
              </Button>
              <Button className="bg-[#354646cc]" onClick={onCloseModal}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={openAucModal} size="6xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body
          style={{
            backgroundImage: `url(${"https://i.pinimg.com/736x/f1/5c/f6/f15cf6f020f82daefe5a86cb26a6ecaf.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="space-y-6 m-10 p-10">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
              Add Auction Product
            </h3>

            {/* Container for the form with two columns */}
            <div className="grid grid-cols-2 gap-6">
              {/* First Column */}
              <div>
                <Label htmlFor="title" value="Title" className="text-xl mb-2" />
                <TextInput
                  id="title"
                  placeholder=""
                  required
                  type="text"
                  value={aucData.title}
                  onChange={getAucData}
                />
              </div>

              <div>
                <Label
                  htmlFor="description"
                  value="Description"
                  className="text-xl mb-2"
                />
                <Textarea
                  id="description"
                  placeholder=""
                  required
                  rows={4}
                  onChange={getAucData}
                  value={aucData.description}
                />
              </div>

              {/* Second Column */}
              <div>
                <Label
                  htmlFor="initPrice"
                  value="Initial Price"
                  className="text-xl mb-2"
                />
                <TextInput
                  id="initPrice"
                  type="text"
                  required
                  onChange={getAucData}
                  value={aucData.initPrice}
                />
              </div>
              <div>
                <Label
                  htmlFor="Afile"
                  value="Product Image"
                  className="text-xl mb-2"
                />
                <FileInput
                  id="Afile"
                  helperText="Upload a product image."
                  onChange={(e) => setimgurl(e.target.files[0])}
                />
              </div>
              {/* Third Column */}
              <div>
                <Label
                  htmlFor="sdate"
                  value="Start Date"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="sdate"
                  type="date"
                  value={aucData.startDate}
                  onChange={getAucData}
                />
              </div>
              <div>
                <Label
                  htmlFor="edate"
                  value="End Date"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="edate"
                  type="date"
                  value={aucData.endDate}
                  onChange={getAucData}
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button className="bg-[#354646cc]" onClick={save}>
                Done
              </Button>
              <Button className="bg-[#354646cc]" onClick={onCloseModal}>
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
