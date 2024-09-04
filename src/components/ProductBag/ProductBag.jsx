/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "./../../Config/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function ProductBag() {
  const navigate = useNavigate();
  const [bags, setBags] = useState([]);
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "Bag"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      // console.log(arr)
      setBags([...arr]);
    });
  }, []);

  function handleDelete(id) {
    let docref = doc(db, "Bag", id);
    deleteDoc(docref);
  }

  function backToDetails() {
    setOpenModal(false);
    navigate("/");
  }

  function handleQuantityChange(id, newQuantity) {
    const docRef = doc(db, "Bag", id);
    // const updatedQuantity = parseInt(newQuantity);

     const item = bags.find((item) => item.id === id);
     const newTotalPrice = item.price * newQuantity;
    updateDoc(docRef, {
      quantity: newQuantity,
      priceTotal: newTotalPrice,
    });
  }

  return (
    <>
      <div className=" ">
        {bags.map((item) => (
          <div
            key={item.id}
            className="flex  justify-between space-x-6 my-6 shadow-2Xl p-9 rounded-Xl "
          >
            <div className="w-[200px] ">
              <img src={item.mainImage} alt="" className=" rounded-xl" />
            </div>
            <div className="  w-[80%]">
              {/* <p className="leading-9	">
                <strong>Desc :</strong> {item.description}
              </p> */}

              <h3 className="my-5 ">
                <strong> Quantity :</strong> {item.quantity}
                <input
                  className="mx-9 border-none rounded-lg"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  min="1"
                  max="99" 
                />
                {item.quantity == 0 && alert("At least one product must be present to complete the purchase.")}
              </h3>
              <h2>
                <strong>Total price :</strong> {item.priceTotal} $
              </h2>
              <button
                className="btn bg-red-600 mt-5"
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
                Your Bag Is Empty Please Back to Details Page
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  className="bg-slate-800"
                  onClick={() => backToDetails()}
                >
                  {"Back To details"}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default ProductBag;
