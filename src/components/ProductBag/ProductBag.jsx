/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "./../../Config/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import SweetAlert2 from "react-sweetalert2";
import Swal from "sweetalert2";


function ProductBag() {
  const navigate = useNavigate();
  const [bags, setBags] = useState([]);
  const [openModal, setOpenModal] = useState(true);
  const [swalProps, setSwalProps] = useState({});
  const [UID, setUID] = useState(localStorage.getItem("id"));

  useEffect(() => {
    // let arr;
    // onSnapshot(collection(db, "Bag"), (snapshot) => {
    //   arr = snapshot.docs.map((doc) => {
    //     return { ...doc.data(), id: doc.id };
    //   });
    //   // console.log(arr)
    //   setBags([...arr]);
    // });
     if (UID) {
      showBag(UID); 
    }
  }, [UID]);

    // ============ Show Bag From Database  =================//
    async function showBag(userID) {
      const q = query(
        collection(db, "Bag"),
        where("userID", "==", userID)
      );
  
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot)
      const bagsData = querySnapshot.docs.map((doc) => ({ ...doc.data(),id: doc.id,}));
      setBags(bagsData);
    }


  function handleDelete(id) {
    // alert("Are You Sure");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1E293B",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          background: "#1E293B",
          color: "white",
        });
        let docref = doc(db, "Bag", id);
        deleteDoc(docref);
        setBags((prevBags) => prevBags.filter((item) => item.id !== id));
      }
    });
  }

  function backToDetails() {
    setOpenModal(false);
    navigate("/earnings");
  }

  function handleQuantityChange(id, newQuantity) {
    const docRef = doc(db, "Bag", id);
    const item = bags.find((item) => item.id === id);
    const newTotalPrice = item.basePrice * newQuantity;

    updateDoc(docRef, {
      quantity: newQuantity,
      price: newTotalPrice,
    });
  }

  return (
    <>
      <h1 className="text-center mt-5 font-medium"> {bags.length == 1 ?  `${bags.length} Item Found` :`${bags.length} Items Found`}   </h1>
      <div className="grid grid-cols-2 Md:grid-cols-1 ">
        {bags.map((item) => (
          
          <div
            key={item.id}
            className=" zeroToTo768:flex-col flex items-center  justify-between space-x-6 my-6 shadow-2Xl p-9 rounded-Xl "
          >
            
            <div className="zeroToTo768:w-[300px]  w-[500px]  flex justify-center items-center">
              <img
                src={item.imgsrc}
                alt="images"
                className="rounded-lg min-h-[300px] max-w-[300px] max-h-[300px] shadow-xl "
              />
            
            </div>
            
            <div className="w-[80%]">
            
              <div className="my-5 flex justify-between items-center">
                Quantity : {item.quantity}
                <input
                  className="mx-9 rounded-lg w-[70px]"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  min="1"
                  max="99"
                />
                {item.quantity == 0 &&
                  alert(
                    "At least one product must be present to complete the purchase."
                  )}
              </div>
              <h2>
                <strong>Total price :</strong> {parseFloat(item.price).toFixed(2)} $
              </h2>
              <button
                className="btn bg-[#f2ba36] mt-5 p-2 "
                onClick={() => navigate("/payment")}
              >
                Checkout
              </button>
              <button
                className="btn bg-red-600 mt-5 p-2 ml-3"
                onClick={() => handleDelete(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {bags.length == 0 ? (
        <Modal show={openModal} size="Md" onClose={() => backToDetails()} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Your Bag Is Empty Please Back to Products
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  className="bg-slate-800"
                  onClick={() => backToDetails()}
                >
                  {"Back To Products"}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      <SweetAlert2 {...swalProps} />
    </>
  );
}

export default ProductBag;
