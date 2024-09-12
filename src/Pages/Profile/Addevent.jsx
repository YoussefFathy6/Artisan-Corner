import React, { useState } from "react";
import { Button, Textarea, Label, Modal, TextInput, FileInput } from "flowbite-react";
import db from "../../Config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Config/firebase";

function Addevent() {
  const [openModal, setOpenModal] = useState(false);
  const [data1, setdate1] = useState({
    name: "",
    date: "",
    address: "",
    description: "",
    time: "",
    pricetacket: "",
    eventtype: "",
    ticketquantity: 0,
  });
  const [imgurl, setimgurl] = useState(null);
  const [imgurl2, setimgurl2] = useState(null);

  const getdate = (e) => {
    const { id, name, value, type } = e.target;
    const { id, name, value, type } = e.target;

    setdate1((prevData) => ({
      ...prevData,
      [name || id]: type === "number" ? Number(value) : value,
    }));
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  async function save() {
    setOpenModal(false);

    try {
      // Ensure both images are selected for upload
      if (!imgurl || !imgurl2) {
        throw new Error("Both event and ticket images must be selected for upload.");
      }

      // Create storage references for both images
      const eventImgRef = ref(storage, `eventimg/${imgurl.name}`);
      const ticketImgRef = ref(storage, `ticketimg/${imgurl2.name}`);

      // Upload images
      const uploadTask1 = uploadBytesResumable(eventImgRef, imgurl);
      const uploadTask2 = uploadBytesResumable(ticketImgRef, imgurl2);

      const [snapshot1, snapshot2] = await Promise.all([uploadTask1, uploadTask2]);
      const [snapshot1, snapshot2] = await Promise.all([
        uploadTask1,
        uploadTask2,
      ]);

      // Get download URLs for both images
      const downloadURL1 = await getDownloadURL(snapshot1.ref);
      const downloadURL2 = await getDownloadURL(snapshot2.ref);

      // Save event data to Firestore
      const collectionRef = collection(db, "add event");
      await addDoc(collectionRef, {
        ...data1,
        eventImg: downloadURL1,
        ticketImg: downloadURL2,
      });

      // Reset form data
      setdate1({
        name: "",
        date: "",
        address: "",
        description: "",
        time: "",
        pricetacket: "",
        eventtype: "",
        ticketquantity: 0,
      });
      setimgurl(null);
      setimgurl2(null);

      alert("Event saved successfully!");
    } catch (error) {
      alert("Error: " + error.message);
      alert("Error: " + error.message);
    }
    }
  }

  return (
    <>
      <button
        type="button"
        className="bot mr-20 mt-14 text-orange-100"
        onClick={() => setOpenModal(true)}
      >
        Add Event
      </button>

      <Modal show={openModal} size="5xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">Add Event</h3>

            {/* Container for Two Columns */}
            <div className="grid grid-cols-2 gap-6">
              {/* First Column */}
              <div>
                <Label htmlFor="name" value="Event Name" className="text-xl mb-2 block" />
                <TextInput id="name" value={data1.name} onChange={getdate} required />

                <Label htmlFor="date" value="Event Date" className="text-xl mb-2 block" />
                <TextInput id="date" type="date" value={data1.date} onChange={getdate} />

                <Label htmlFor="time" value="Event Time" className="text-xl mb-2 block" />
                <TextInput id="time" type="time" value={data1.time} onChange={getdate} />

                <Label htmlFor="address" value="Event Address" className="text-xl mb-2 block" />
                <TextInput id="address" value={data1.address} onChange={getdate} />

                <Label htmlFor="description" value="Event Description" className="text-xl mb-2 block" />
                <Textarea id="description" rows={4} value={data1.description} onChange={getdate} />
              </div>

              {/* Second Column */}
              <div>
                <Label htmlFor="eventtype" value="Event Type" className="text-xl mb-2 block" />
                <div className="flex gap-4">
                  <label className="flex items-center">
                <div className="mb-2 block">
                  <Label
                    htmlFor="Event Type"
                    value="Event Type"
                    className="text-xl"
                  />
                </div>
                <div className="flex gap-4 ">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="eventtype"
                      value="online"
                      checked={data1.eventtype === "online"}
                      onChange={getdate}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-lg">Online</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventtype"
                      value="offline"
                      checked={data1.eventtype === "offline"}
                      onChange={getdate}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-lg">Offline</span>
                  </label>
                </div>

                <Label htmlFor="file" value="Event Img" className="text-xl mb-2 block" />
                <FileInput id="file" onChange={(e) => setimgurl(e.target.files[0])} />

                <Label htmlFor="file2" value="Ticket Img" className="text-xl mb-2 block" />
                <FileInput id="file2" onChange={(e) => setimgurl2(e.target.files[0])} />

                <Label htmlFor="pricetacket" value="Price Ticket" className="text-xl mb-2 block" />
                <TextInput id="pricetacket" value={data1.pricetacket} onChange={getdate} required />

                <Label htmlFor="ticketquantity" value="Ticket Quantity" className="text-xl mb-2 block" />
                <TextInput
                  id="ticketquantity"
                  type="number"
                  value={data1.ticketquantity}
                  onChange={getdate}
                  required
                />
              </div>
            </div>

            <div className="flex justify-around">
              <Button onClick={save}>Done</Button>
              <Button onClick={onCloseModal}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default Addevent;