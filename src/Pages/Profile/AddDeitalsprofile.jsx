/* eslint-disable no-unused-vars */
import React from "react";
import {
  Button,
  Textarea,
  Label,
  Modal,
  TextInput,
  FileInput,
} from "flowbite-react";
import { useState } from "react";
import db from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { setId } from "../../Redux/Slices/profileid";
import { useDispatch } from "react-redux";
function AddDeitalsprofile() {
  const [openModal, setOpenModal] = useState(false);
  let [data, setdata] = useState({ name: "", department: "", about: "" });

  const dis = useDispatch();
  function onCloseModal() {
    setOpenModal(false);
  }
  const getdata = (e) => {
    const { id, value } = e.target;
    setdata((data) => ({
      ...data,
      [id]: value,
    }));
  };
  async function save() {
    setOpenModal(false);
    const collectionref = collection(db, "profiledetails");
    const doc = await addDoc(collectionref, {
      Name: data.name,
      Department: data.department,
      About: data.about,
    });
    dis(setId(doc.id));

    //  setid(doc.id);
    //  console.log(id);
    setdata("");
  }
  return (
    <>
      <button
        type="button"
        className="bot mr-20 mt-14 text-orange-100 border-2 border-neutral-200"
        onClick={() => setOpenModal(true)}
      >
        Add Details
      </button>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
              Add Details
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value="Name" className="text-xl" />
              </div>
              <TextInput
                id="name"
                placeholder=""
                required
                type="text"
                value={data.name}
                onChange={getdata}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Event Description"
                  value="Department"
                  className="text-xl"
                />
              </div>
              <TextInput
                id="department"
                type="text"
                value={data.department}
                onChange={getdata}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="About him"
                  value="About him"
                  className="text-xl"
                />
              </div>
              <Textarea
                id="about"
                type="text"
                value={data.about}
                onChange={getdata}
                required
                rows={4}
              />
            </div>
            <FileInput
              id="file"
              helperText="A profile picture is useful to confirm your are logged into your account"
            />

            <div className="w-1/2 flex justify-around ml-52">
              <Button className="bot2" onClick={save}>
                Done
              </Button>
              <Button className="bot2" onClick={onCloseModal} ve>
                Cansel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddDeitalsprofile;
