import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../../Config/firebase";

function Massage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const messagesList = [];
        querySnapshot.forEach((doc) => {
          messagesList.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesList);
        setLoading(false);
      } catch (err) {
        setError("Error fetching messages: " + err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Function to delete a message
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setMessages(messages.filter((message) => message.id !== id));
    } catch (err) {
      console.error("Error deleting message: ", err.message);
    }
  };

  // Function to mark message as read
  const markAsRead = async (id) => {
    try {
      const messageRef = doc(db, "contacts", id);
      await updateDoc(messageRef, { isRead: true });
      setMessages(messages.map((message) => 
        message.id === id ? { ...message, isRead: true } : message
      ));
    } catch (err) {
      console.error("Error marking message as read: ", err.message);
    }
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div className="items-center ml-20">
      <h2 className="text-2xl font-semibold mb-4 mt-5">Message List</h2>
      </div>
      <div className=" h-[40vh] mt-56 flex  justify-between w-[50%] mr-2">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white shadow-md px-5 py-10 rounded-md border-l-4 flex flex-col justify-between ${
                message.isRead ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 mt-3 text-left">
                  {message.name || "No Name Provided"}
                </h3>
                <p className="text-left mb-2">
                  <strong>Email:</strong> {message.email || "No Email Provided"}
                </p>
                <p className="text-left mb-2">
                  <strong>Phone:</strong> {message.phone || "No Phone Provided"}
                </p>
                <p className="text-left mb-4">
                  <strong>Message:</strong> {message.message || "No Message Provided"}
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleDelete(message.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                {!message.isRead && (
                  <button
                    onClick={() => markAsRead(message.id)}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="mt-80">No messages found</p>
        )}
      </div>
    </>
  );
}

export default Massage;
