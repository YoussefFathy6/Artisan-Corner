import { useState } from "react";
import {
  Button,
  Textarea,
  Label,
  Modal,
  TextInput,
  FileInput,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import db from "../../Config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Config/firebase";

function Addevent() {
  const [openOfflineModal, setOpenOfflineModal] = useState(false);
  const [openOnlineModal, setOpenOnlineModal] = useState(false);
  const [offline, setoffline] = useState({
    name: "",
    date: "",
    address: "",
    description: "",
    time: "",
    pricetacket: "",
    ticketquantity: 0,
  });
  const [online, setonline] = useState({
    name: "",
    date: "",
    description: "",
    time: "",
    price: "",
  });
  const [imgurl, setimgurl] = useState(null);
  const [imgurl2, setimgurl2] = useState(null);

  const getdateoff = (e) => {
    if (!e || !e.target) {
      console.error("Event or target is undefined");
      return;
    }

    const { id, name, value, type } = e.target;

    setoffline((prevData) => ({
      ...prevData,
      [name || id]: type === "number" ? Number(value) : value,
    }));
  };

  const getdateon = (e) => {
    if (!e || !e.target) {
      console.error("Event or target is undefined");
      return;
    }

    const { id, name, value, type } = e.target;

    setonline((prevData) => ({
      ...prevData,
      [name || id]: type === "number" ? Number(value) : value,
    }));
  };

  function onCloseModal() {
    setOpenOfflineModal(false);
    setOpenOnlineModal(false);
  }

  async function saveoff() {
    setOpenOfflineModal(false);

    try {
      if (!imgurl ) {
        throw new Error(
          "Both event and ticket images must be selected for upload."
        );
      }

      const eventImgRef = ref(storage, `eventimg/${imgurl.name}`);
      const ticketImgRef = ref(storage, `ticketimg/${imgurl2.name}`);

      const uploadTask1 = uploadBytesResumable(eventImgRef, imgurl);
      const uploadTask2 = uploadBytesResumable(ticketImgRef, imgurl2);

      const [snapshot1, snapshot2] = await Promise.all([
        uploadTask1,
        uploadTask2,
      ]);

      const downloadURL1 = await getDownloadURL(snapshot1.ref);
      const downloadURL2 = await getDownloadURL(snapshot2.ref);

      const collectionRef = collection(db, "add event");
      await addDoc(collectionRef, {
        ...offline,
        eventImg: downloadURL1,
        ticketImg: downloadURL2,
        ownerID: localStorage.getItem("id"),
      });

      setoffline({
        name: "",
        date: "",
        address: "",
        description: "",
        time: "",
        pricetacket: "",
        ticketquantity: 0,
      });
      setimgurl(null);
      setimgurl2(null);

      alert("Event saved successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  async function saveon() {
    setOpenOnlineModal(false);

    try {
      if (!imgurl) {
        throw new Error("Event image must be selected for upload.");
      }

      const eventImgRef = ref(storage, `eventimg/${imgurl.name}`);
      const uploadTask = uploadBytesResumable(eventImgRef, imgurl);

      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      const collectionRef = collection(db, "online event");
      await addDoc(collectionRef, {
        ...online,
        eventImg: downloadURL,
        ownerID: localStorage.getItem("id"),
      });

      setonline({
        name: "",
        date: "",
        description: "",
        time: "",
        price: "",
      });
      setimgurl(null);

      alert("Online event saved successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  return (
    <>
      <div className="w-auto h-auto">
        <div className="mr-36 mt-4">
          <Dropdown
            renderTrigger={() => (
              <div className="h-full p-3 bg-orange-950 text-orange-200 shadow rounded-full cursor-pointer">
                <div className="relative">
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
              <button onClick={() => setOpenOfflineModal(true)}>
                Add Offline Event
              </button>
            </DropdownItem>
            <DropdownItem>
              <button onClick={() => setOpenOnlineModal(true)}>
                Add Online Event
              </button>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <Modal
        show={openOfflineModal}
        size="7xl"
        className="bg-gray-300"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 m-10 bg-orange-200 p-10">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
              Add Event
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* First Column */}
              <div>
                <Label
                  htmlFor="name"
                  value="Event Name"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="name"
                  value={offline.name}
                  onChange={getdateoff}
                  required
                />

                <Label
                  htmlFor="date"
                  value="Event Date"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="date"
                  type="date"
                  value={offline.date}
                  onChange={getdateoff}
                />

                <Label
                  htmlFor="time"
                  value="Event Time"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="time"
                  type="time"
                  value={offline.time}
                  onChange={getdateoff}
                />

                <Label
                  htmlFor="address"
                  value="Event Address"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="address"
                  value={offline.address}
                  onChange={getdateoff}
                />

                <Label
                  htmlFor="description"
                  value="Event Description"
                  className="text-xl mb-2 block"
                />
                <Textarea
                  id="description"
                  rows={4}
                  value={offline.description}
                  onChange={getdateoff}
                />
              </div>

              {/* Second Column */}
              <div className="mt-16">
                <Label
                  htmlFor="file"
                  value="Event Img"
                  className="text-xl mb-2 block"
                />
                <FileInput
                  id="file"
                  onChange={(e) => setimgurl(e.target.files[0])}
                />

                <Label
                  htmlFor="file2"
                  value="Ticket Img"
                  className="text-xl mb-2 block"
                />
                <FileInput
                  id="file2"
                  onChange={(e) => setimgurl2(e.target.files[0])}
                />

                <Label
                  htmlFor="pricetacket"
                  value="Price Ticket"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="pricetacket"
                  value={offline.pricetacket}
                  onChange={getdateoff}
                  required
                />

                <Label
                  htmlFor="ticketquantity"
                  value="Ticket Quantity"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="ticketquantity"
                  type="number"
                  value={offline.ticketquantity}
                  onChange={getdateoff}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={saveoff} className="bot2">
                Done
              </Button>
              <Button onClick={onCloseModal} className="bot2">
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openOnlineModal}
        size="7xl"
        className="bg-gray-300"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 m-10 bg-orange-200 p-10">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
              Add Event
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* First Column */}
              <div>
                <Label
                  htmlFor="name"
                  value="Event Name"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="name"
                  value={online.name}
                  onChange={getdateon}
                  required
                />

                <Label
                  htmlFor="date"
                  value="Event Date"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="date"
                  type="date"
                  value={online.date}
                  onChange={getdateon}
                />

                <Label
                  htmlFor="time"
                  value="Event Time"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="time"
                  type="time"
                  value={online.time}
                  onChange={getdateon}
                />
                <Label
                  htmlFor="description"
                  value="Event Description"
                  className="text-xl mb-2 block"
                />
                <Textarea
                  id="description"
                  rows={4}
                  value={online.description}
                  onChange={getdateon}
                />
              </div>

              {/* Second Column */}
              <div className="mt-20">
                <Label
                  htmlFor="file"
                  value="Event Img"
                  className="text-xl mb-2 block"
                />
                <FileInput
                  id="file"
                  onChange={(e) => setimgurl(e.target.files[0])}
                />
                <Label
                  htmlFor="price"
                  value="Price"
                  className="text-xl mb-2 block"
                />
                <TextInput
                  id="price"
                  value={online.price}
                  onChange={getdateon}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={saveon} className="bot2">
                Done
              </Button>
              <Button onClick={onCloseModal} className="bot2">
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
