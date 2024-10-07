import { FileInput } from "flowbite-react";
import { useState } from "react";
import { Button, Textarea, Label, Modal, TextInput } from "flowbite-react";
import db from "../../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaEdit } from 'react-icons/fa';
import { toast } from "react-toastify";

function Editproduct({ data,children }) {

    const [openModal, setOpenModal] = useState(false);
    const [editedData, setEditedData] = useState(data);

    const OpenModal = () => {
        setEditedData(data);
        setOpenModal(true);
    };

    function onCloseModal() {
        setOpenModal(false);
    }

    const handleFileUpload = async (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `productimg/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };

    const handleUpdate = async () => {
        setOpenModal(false);
        try {
            const itemRef = doc(db, "add product", editedData.id);
            if (editedData.img instanceof File) {
                const imageUrl = await handleFileUpload(editedData.img);
                editedData.img = imageUrl;
            }
            await updateDoc(itemRef, {
                title: editedData.title,
                description: editedData.description,
                price: editedData.price,
                img: editedData.img,
                productquantity: editedData.productquantity,
                typeproduct: editedData.typeproduct,
            });
            console.log("Item updated successfully!");
            onCloseModal();
            toast.success("Updating successfully", {
                position: "top-right",
              });
        } catch (error) {
            console.error("Error updating item: ", error);
        }
    };

    return (
        <>
         <button
    type="button"
    onClick={() => OpenModal(true)}
    className=""
>
    <FaEdit className="" size={30} />
</button>


            <Modal show={openModal} size="6xl"  onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body
                 style={{
                    backgroundImage: `url(${"https://i.pinimg.com/736x/f1/5c/f6/f15cf6f020f82daefe5a86cb26a6ecaf.jpg"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                    <div className="space-y-6 m-10 p-10">
                        <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
                            Edit Product
                        </h3>

                        {/* Container for Two Columns */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* First Column */}
                            <div>
                                <Label htmlFor="title" value="Title" className="text-xl mb-2 block" />
                                <TextInput
                                    id="title"
                                    placeholder=""
                                    required
                                    type="text"
                                    value={editedData.title}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, title: e.target.value })
                                    }
                                />

                                <Label htmlFor="price" value="Price" className="text-xl mb-2 block" />
                                <TextInput
                                    id="price"
                                    type="text"
                                    required
                                    value={editedData.price}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, price: e.target.value })
                                    }
                                />

                                <Label htmlFor="productquantity" value="Product Quantity" className="text-xl mb-2 block" />
                                <TextInput
                                    id="productquantity"
                                    type="number"
                                    value={editedData.productquantity}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            productquantity: Number(e.target.value)
                                        })
                                    }
                                    required
                                />
                                   <Label htmlFor="description" value="Description" className="text-xl mb-2 block" />
                                <Textarea
                                    id="description"
                                    placeholder=""
                                    required
                                    rows={4}
                                    value={editedData.description}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, description: e.target.value })
                                    }
                                />
                            </div>

                            {/* Second Column */}
                            <div>
                                <Label htmlFor="typeproduct" value="Type Product" className="text-xl mb-2 block" />
                                <select
                                    id="typeproduct"
                                    required
                                    value={editedData.typeproduct}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, typeproduct: e.target.value })
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 text-lg rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Macramé">Macramé</option>
                                    <option value="Painting">Painting</option>
                                    <option value="Wood carving">Wood carving</option>
                                    <option value="Pottery">Pottery</option>
                                </select>

                                <Label htmlFor="img" value="Image URL" className="text-xl mb-2 block" />
                                <TextInput
                                    id="img"
                                    type="text"
                                    value={editedData.img}
                                    readOnly
                                />

                                <Label htmlFor="file" value="New Image" className="text-xl mb-2 block" />
                                <FileInput
                                    id="file"
                                   
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setEditedData({ ...editedData, img: file });
                                        }
                                    }}
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

export default Editproduct;