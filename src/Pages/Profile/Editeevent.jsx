import { FileInput } from "flowbite-react";
import { useState } from "react";
import { Button, Textarea, Label, Modal, TextInput } from "flowbite-react";
import db from "../../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { FaEdit } from 'react-icons/fa';
function Editeevent({ data }) {
    const [openModal, setOpenModal] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const [imgFile, setImgFile] = useState(null);

    const OpenModal = async () => {
        setEditedData(data);
        setOpenModal(true);
        try {
            const storage = getStorage();
            const imageRef = ref(storage, `eventimg/${data.img}`);
            const imageUrl = await getDownloadURL(imageRef);
            setEditedData((prevData) => ({
                ...prevData,
                img: imageUrl, // إعداد الصورة الحالية
            }));
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    function onCloseModal() {
        setOpenModal(false);
    }

    const handleFileUpload = async (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `eventimg/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };

    const handleUpdate = async () => {
        setOpenModal(false);
        try {
            const itemRef = doc(db, "add event", editedData.id);
            if (imgFile) {
                const imageUrl = await handleFileUpload(imgFile);
                editedData.img = imageUrl;
            }
            await updateDoc(itemRef, {
                name: editedData.name,
                date: editedData.date,
                address: editedData.address,
                description: editedData.description,
                time: editedData.time,
                pricetacket: editedData.pricetacket,
                eventtype: editedData.eventtype,
                ticketquantity: editedData.ticketquantity,
                img: editedData.img,
            });
            toast.success("Updating successfully", {
                position: "top-right",
              });
              
            onCloseModal();
        } catch (error) {
            console.error("Error updating event: ", error);
        }
    };

    return (
        <>
            
         <button
    type="button"
    onClick={() => OpenModal(true)}
    className=""
>
    <FaEdit className="" size={20} />
</button>

            <Modal show={openModal} size="7xl"className="bg-gray-300"onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body 
                 style={{
                    backgroundImage: `url(${"https://i.pinimg.com/736x/f1/5c/f6/f15cf6f020f82daefe5a86cb26a6ecaf.jpg"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                    <div className="space-y-6 m-10  p-10">
                        <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
                            Edit Event
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="name" value="Event Name" className="text-xl mb-2 block" />
                                <TextInput
                                    id="name"
                                    value={editedData.name}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, name: e.target.value })
                                    }
                                    required
                                />

                                <Label htmlFor="date" value="Event Date" className="text-xl mb-2 block" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    value={editedData.date}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, date: e.target.value })
                                    }
                                />

                                <Label htmlFor="time" value="Event Time" className="text-xl mb-2 block" />
                                <TextInput
                                    id="time"
                                    type="time"
                                    value={editedData.time}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, time: e.target.value })
                                    }
                                />

                                <Label htmlFor="address" value="Event Address" className="text-xl mb-2 block" />
                                <TextInput
                                    id="address"
                                    value={editedData.address}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, address: e.target.value })
                                    }
                                />

                                <Label htmlFor="description" value="Event Description" className="text-xl mb-2 block" />
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={editedData.description}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, description: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="eventtype" value="Event Type" className="text-xl mb-2 block" />
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="eventtype"
                                            value="online"
                                            className="w-4 h-4 text-blue-600"
                                            checked={editedData.eventtype === "online"}
                                            onChange={() =>
                                                setEditedData({ ...editedData, eventtype: "online" })
                                            }
                                        />
                                        <span className="ml-2 text-lg">Online</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="eventtype"
                                            value="offline"
                                            className="w-4 h-4 text-blue-600"
                                            checked={editedData.eventtype === "offline"}
                                            onChange={() =>
                                                setEditedData({ ...editedData, eventtype: "offline" })
                                            }
                                        />
                                        <span className="ml-2 text-lg">Offline</span>
                                    </label>
                                </div>

                                <Label htmlFor="img" value="Current Image" className="text-xl mb-2 block" />
                                <TextInput
                                    id="img"
                                    type="text"
                                    value={editedData.img}
                                    readOnly
                                />

                                <Label htmlFor="file" value="Upload New Image" className="text-xl mb-2 block" />
                                <FileInput
                                    id="file"
                                    onChange={(e) => setImgFile(e.target.files[0])}
                                />

                                <Label htmlFor="pricetacket" value="Price Ticket" className="text-xl mb-2 block" />
                                <TextInput
                                    id="pricetacket"
                                    value={editedData.pricetacket}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, pricetacket: e.target.value })
                                    }
                                    required
                                />
                                <Label htmlFor="ticketquantity" value="Ticket Quantity" className="text-xl mb-2 block" />
                                <TextInput
                                    id="ticketquantity"
                                    type="number"
                                    value={editedData.ticketquantity}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            ticketquantity: Number(e.target.value)
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="w-1/2 flex justify-around ml-52">
                            <Button className="bg-[#354646cc]" onClick={handleUpdate}>
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

export default Editeevent;
