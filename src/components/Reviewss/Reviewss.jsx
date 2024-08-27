/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Rating,
  Button,
  Label,
  Alert,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import db from "../../Config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { HiInformationCircle } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";

function Reviewss() {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");

  useEffect(() => {
    showReviews();
  }, []);

  // ============ Add Reviews To Database =================//
  async function addToDb() {
    if (titleInput == "" || descInput == "") {
      // alert("Please Fill Inputs")
      setShowAlert(true); // Show alert when inputs are not filled
    } else {
      const collectionRef = collection(db, "reviews");
      const doc = await addDoc(collectionRef, {
        title: titleInput,
        desc: descInput,
      });
      setTitleInput("");
      setDescInput("");
      setShowAlert(false); // Hide alert after successful submission
    }
  }

  // Close the alert
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // ============ Show Reviews From Database  =================//

  function showReviews() {
    onSnapshot(collection(db, "reviews"), (snapshot) => {
      let rev = snapshot.docs.map((doc) => {
        setCurrentId(doc.id);
        return { ...doc.data(), id: doc.id };
      });
      setReviewList(rev);
    });
  }

  // ============ Delete Reviews From Database  =================//
  function deleteReview() {
    const docRef = doc(db, "reviews", currentId);
    deleteDoc(docRef);
  }

  // ============ Update Reviews From Database  =================//
  // 1- set value To Edit
  function editReview(currentTitle, currentDesc) {
    setUpdateTitle(currentTitle);
    setUpdateDesc(currentDesc);
    setOpenModal(true);
  }
  //2- Update Value
  function updateReview() {
    const docRef = doc(db, "reviews", currentId);

    updateDoc(docRef, { title: updateTitle, desc: updateDesc });
    setOpenModal(false);
  }

  return (
    <>
      <div className="review   mx-auto space-y-4">
        <h1 className="text-[#344054] font-bold">Customer Feedback</h1>
        <div className="rate grid  zeroToTo768:grid-cols-1 from768:grid-cols-3 gap-5  m-auto">
          <div className="product-rate bg-white p-5 rounded-lg flex justify-center items-center flex-col">
            <h1 className="text-bold text-7xl text-[#164C96]">4.8</h1>
            <div className="rate-icon">
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
              <i className="fa-solid fa-star text-yellow-400"></i>
            </div>
            <p>Product Rating</p>
          </div>
          <div className="progress bg-white p-7 rounded-lg col-span-2">
            <div>
              <Rating.Advanced
                percentFilled={70}
                className={`mb-2 flex justify-center test `}
              ></Rating.Advanced>
              <Rating.Advanced
                percentFilled={17}
                className="mb-2 flex justify-center"
              ></Rating.Advanced>
              <Rating.Advanced
                percentFilled={8}
                className="mb-2 flex justify-center"
              ></Rating.Advanced>
              <Rating.Advanced
                percentFilled={4}
                className="mb-2 flex justify-center"
              ></Rating.Advanced>
              <Rating.Advanced
                percentFilled={1}
                className=" flex justify-center"
              ></Rating.Advanced>
            </div>
          </div>
        </div>

        <h1 className="text-[#344054] font-bold">Reviews</h1>
        <div className="testimonial border-b border-gray-400 pb-5 px-5">
          {reviewList.map((item) => (
            <div key={item.id}>
              <div className="flex items-center justify-between ">
                <h3 className="mt-4 text-gray-700 font-bold">{item.title}</h3>
                <div className="flex space-x-3 text-2Xl cursor-pointer">
                  <MdDelete
                    className="text-red-700"
                    title="delete"
                    onClick={deleteReview}
                  />
                  <FaPenToSquare
                    className="text-slate-700"
                    title="update"
                    onClick={() => editReview(item.title, item.desc)}
                  />
                </div>
              </div>

              <div className="testi-icon mb-2">
                <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
                <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
                <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
                <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
                <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
              </div>

              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="reviews ">
          <div className="writeReview ">
            <h3 className="text-gray-700 font-bold">
              What Is IT LIke To Product ?
            </h3>
            <div className="testi-icon">
              <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
              <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
              <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
              <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
              <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
            </div>
            <div className="form">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="Review Title" />
                </div>
                {showAlert && (
                  <Alert
                    color="failure"
                    icon={HiInformationCircle}
                    onDismiss={handleCloseAlert}
                  >
                    <span className="font-medium">Info alert!</span> Please Fill
                    Inputs
                  </Alert>
                )}
                <input
                  value={titleInput}
                  type="text"
                  className="w-full bg-transparent rounded-lg mb-5 mt-2"
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="Review Content" />
                </div>
                <textarea
                  value={descInput}
                  name=""
                  id=""
                  className=" w-full h-[200px] bg-transparent rounded-Xl resize-none"
                  onChange={(e) => setDescInput(e.target.value)}
                ></textarea>
                <button
                  onClick={addToDb}
                  className="bg-slate-900 text-white py-3 px-10 rounded-lg"
                >
                  Add Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={openModal}
        size="Md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="title">
              <Label>Title :</Label>
              <TextInput
                type="text"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
            </div>

            <div className="Desc">
              <Label>Desc :</Label>
              <Textarea
                required
                rows={10}
                type="text"
                value={updateDesc}
                onChange={(e) => setUpdateDesc(e.target.value)}
              />
            </div>

            <div className="w-full">
              <Button
                className="btn bg-yellow-400"
                onClick={() => updateReview()}
              >
                Update
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Reviewss;
