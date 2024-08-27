/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Textarea, Label, Modal, TextInput } from "flowbite-react";
import { FileInput } from "flowbite-react";
import { useState } from "react";
import db from "../../Config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Config/firebase";
function Addevent() {
  const [openModal, setOpenModal] = useState();
  let [data1, setdate1] = useState({
    name: "",
    date: "",
    address: "",
    description: "",
    time: "",
  });
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
  async function save() {
    setOpenModal(false);
    const storageRef = ref(storage, `eventimg/${imgurl.name}`);
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
          const collectionref = collection(db, "add event");
          const doc = addDoc(collectionref, {
            name: data1.name,
            date: data1.date,
            address: data1.address,
            description: data1.description,
            img: downloaduRL,
            time: data1.time,
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
        Add Event
      </button>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
              Add Event
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value=" Event Name" className="text-xl" />
              </div>
              <TextInput
                id="name"
                placeholder=""
                required
                type="text"
                value={data1.name}
                onChange={getdate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Event Date"
                  value="Event Date"
                  className="text-xl"
                />
              </div>
              <TextInput
                id="date"
                type="data"
                value={data1.date}
                onChange={getdate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Event Time"
                  value="Event Time"
                  className="text-xl"
                />
              </div>
              <TextInput
                id="time"
                type="time"
                value={data1.time}
                onChange={getdate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Event Address"
                  value="Event Address"
                  className="text-xl"
                />
              </div>
              <TextInput
                id="address"
                type="text"
                value={data1.address}
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
                rows={4}
                value={data1.description}
                onChange={getdate}
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
                onChange={(e) => setimgurl(e.target.files[0])}
                helperText="A profile picture is useful to confirm your are logged into your account"
              />
            </div>
            <div className="w-1/2 flex justify-around ml-52">
              <Button className="bot2" onClick={save}>
                Done
              </Button>
              <Button className="bot2" onClick={onCloseModal}>
                Cansel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Addevent;
