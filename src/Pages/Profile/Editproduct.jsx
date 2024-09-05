
import { FileInput } from "flowbite-react";
import { useState } from "react";
import { Button ,Textarea, Label, Modal, TextInput } from "flowbite-react";
import db from "../../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
function Editproduct({ data }) {
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
            });
            console.log("Item updated successfully!");
            onCloseModal();
        } catch (error) {
            console.error("Error updating item: ", error);
        }
    };
    return (
        <>
            <button
                type="button"
                onClick={() => OpenModal(true)}
                className="bot2 "
            >
                  Edit Product
            </button>
            <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-4xl font-medium text-gray-900 dark:text-white">
                            Add Product
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Title" className="text-xl" />
                            </div>
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
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" className="text-xl" />
                            </div>
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
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Price" className="text-xl" />
                            </div>
                            <TextInput
                                id="price"
                                type="text"
                                required
                                value={editedData.price}
                                onChange={(e) =>
                                    setEditedData({ ...editedData, price: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="img" value="Image URL" />
                            <TextInput
                                id="img"
                                type="text"
                                value={editedData.img} 
                                readOnly 
                            />
                        </div>
                        <div id="fileUpload" className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Upload New Image" className="text-xl" />
                            </div>
                            <FileInput
                                id="file"
                                helperText="Upload a new image if you want to change the existing one."
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setEditedData({ ...editedData, img: file }); 
                                    }
                                }}
                            />
                        </div>
                        <div className="w-1/2 flex justify-around ml-52">
                            <Button className="bot2" onClick={handleUpdate}>
                                Done
                            </Button>
                            <Button className="bot2" onClick={onCloseModal}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Editproduct