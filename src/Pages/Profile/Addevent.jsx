import React from "react";
import { Button, Textarea, Label, Modal, TextInput } from "flowbite-react";
import { FileInput } from "flowbite-react";
import { useState } from "react";
import db from "../../Config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { toast } from "react-toastify";
function Addevent() {
  const [openModal, setOpenModal] = useState();
  let [data1, setdate1] = useState({
    name: "",
    date: "",
    address: "",
    description: "",
    time: "",
    pricetacket: "",
    eventtype: "",
    ticketquantity: 0,
  });
  let [imgurl, setimgurl] = useState(null);
  let [imgurl2, setimgurl2] = useState(null);
  const getdate = (e) => {
    const { id, name, value, type } = e.target;

    setdate1((data1) => ({
      ...data1,
      [name ? name : id]:
        type === "number" || id === "pricetacket" ? Number(value) : value,
    }));
  };
  function onCloseModal() {
    setOpenModal(false);
  }
  async function save() {
    setOpenModal(false);

    try {
      // Ensure imgurl and imgurl2 are not null or undefined
      if (!imgurl || !imgurl2) {
        throw new Error("Both images must be selected for upload.");
      }

      // Create references for both images
      const eventImgRef = ref(storage, `eventimg/${imgurl.name}`);
      const ticketImgRef = ref(storage, `ticketimg/${imgurl2.name}`);

      // Upload both images
      const uploadTask1 = uploadBytesResumable(eventImgRef, imgurl);
      const uploadTask2 = uploadBytesResumable(ticketImgRef, imgurl2);

      const [snapshot1, snapshot2] = await Promise.all([
        uploadTask1,
        uploadTask2,
      ]);

      // Get download URLs for both images
      const downloadURL1 = await getDownloadURL(snapshot1.ref);
      const downloadURL2 = await getDownloadURL(snapshot2.ref);

      // Save both download URLs to the Firestore collection
      const collectionRef = collection(db, "tempEvents");
      await addDoc(collectionRef, {
        name: data1.name,
        date: data1.date,
        address: data1.address,
        description: data1.description,
        eventImg: downloadURL1,
        ticketImg: downloadURL2,
        time: data1.time,
        pricetTcket: data1.pricetacket,
        eventtype: data1.eventtype,
        ticketquantity: data1.ticketquantity,
        ownerID: localStorage.getItem("id"),
      });
      toast.success("Added successfully", {
        position: "top-right",
      });
      setdate1("");
      setimgurl("");
      setimgurl2("");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  return (
    <>
      <div className=" h-full py-3 bg-[#204d43] mr-14 text-white shadow rounded-full cursor-pointer ">
        <div className="relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => setOpenModal(true)}
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
              Add Event
            </h3>
            {/* Container for Two Columns */}
            <div className="grid grid-cols-2 gap-6">
              {/* First Column */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="" value="Event Name" className="text-xl" />
                </div>
                <TextInput
                  id="name"
                  placeholder=""
                  required
                  type="text"
                  value={data1.name}
                  onChange={getdate}
                />

                <div className="mb-2 block">
                  <Label
                    htmlFor="Event Date"
                    value="Event Date"
                    className="text-xl"
                  />
                </div>
                <TextInput
                  id="date"
                  type="date"
                  value={data1.date}
                  onChange={getdate}
                />

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

              {/* Second Column */}
              <div>
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
                      id="online"
                      type="radio"
                      name="eventtype"
                      value="online"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      checked={data1.eventtype === "online"}
                      onChange={getdate}
                    />
                    <label
                      htmlFor="online"
                      className="ml-2 text-lg font-medium text-gray-900"
                    >
                      Online
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="offline"
                      type="radio"
                      name="eventtype"
                      value="offline"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      checked={data1.eventtype === "offline"}
                      onChange={getdate}
                    />
                    <label
                      htmlFor="offline"
                      className="ml-2 text-lg font-medium text-gray-900"
                    >
                      Offline
                    </label>
                  </div>
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
                    helperText="A profile picture is useful to confirm you are logged into your account"
                  />
                </div>

                <div id="fileUpload" className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="Tacket Img"
                      value="Tacket Img"
                      className="text-xl"
                    />
                  </div>
                  <FileInput
                    id="file2"
                    onChange={(e) => setimgurl2(e.target.files[0])}
                    helperText="A profile picture is useful to confirm you are logged into your account"
                  />
                </div>

                <div className="mb-2 block">
                  <Label
                    htmlFor="Price Ticket"
                    value="Price Tacket"
                    className="text-xl"
                  />
                </div>
                <TextInput
                  id="pricetacket"
                  type="text"
                  required
                  value={data1.pricetacket}
                  onChange={getdate}
                />
                <div className="mb-2 block">
                  <Label
                    htmlFor="Ticket Quantity"
                    value="Ticket Quantity"
                    className="text-xl"
                  />
                </div>
                <TextInput
                  id="ticketquantity"
                  type="number"
                  required
                  value={data1.ticketquantity}
                  onChange={getdate}
                />
              </div>
            </div>
            <div className="w-1/2 flex justify-around ml-52">
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
export default Addevent;
