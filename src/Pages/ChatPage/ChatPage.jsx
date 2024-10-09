/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  getDocs,
  where,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import db from "../../Config/firebase";
import { IoMdSend } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
// import { useLocation } from "react-router-dom";
export default function ChatPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]); // To hold all contacts
  const [selectedContact, setSelectedContact] = useState(null); // To hold the selected contact
  // const [artist, setArtist] = useState(location.state?.user || null);
  const handleSelectContact = async (contact) => {
    setSelectedContact(contact);
    localStorage.setItem("selectedContactId", contact.id); // Save selected contact ID

    // Check if there are any messages for this contact
    if (contact.message && contact.message.length > 0) {
      const updatedMessages = contact.message.map((msg) => {
        // If the message is not seen, mark it as seen
        if (!msg.seen && msg.sender !== localStorage.getItem("id")) {
          return { ...msg, seen: true };
        }
        return msg;
      });

      // Update the messages array in Firestore
      const contactRef = doc(db, "chats", contact.id);
      await updateDoc(contactRef, {
        message: updatedMessages,
      });
    }
  };

  useEffect(() => {
    const storedContactId = localStorage.getItem("selectedContactId");
    if (storedContactId) {
      const storedContact = contacts.find(
        (contact) => contact.id === storedContactId
      );
      if (storedContact) {
        setSelectedContact(storedContact); // Set the stored contact as selected
      }
    }
  }, [contacts]);
  useEffect(() => {
    const storedId = localStorage.getItem("id"); // Retrieve the ID from local storage
    console.log("Stored ID:", storedId); // Debugging line

    // const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let contacts = [];
      querySnapshot.forEach((doc) => {
        const contactData = { id: doc.id, ...doc.data() };
        console.log("Contact Data:", contactData); // Debugging line

        // Log the IDlist specifically
        console.log("IDlist:", contactData.IDlist);

        // Ensure IDlist exists and is an array before trying to find
        if (Array.isArray(contactData.IDlist)) {
          console.log("isArray");

          const found = contactData.IDlist.find(
            (item) => String(item) === storedId
          );

          // Check if the contact ID matches the stored ID
          if (found) {
            contacts.push(contactData);
            console.log(found);
            // const otherUser = contactData.IDlist.find(
            //   (item) => String(item) !== storedId
            // );
            // if (otherUser) {
            //   otherUsers.push(otherUser);
            //   console.log(otherUsers);
            // }
            // Only push if IDs match
          }
        } else {
          console.log("IDlist is not an array or is missing for:", contactData); // Debugging line
        }
      });

      setContacts(contacts);
      console.log("Filtered Contacts:", contacts); // Debugging line
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, "users")); // Assuming 'users' collection contains contacts
      const querySnapshot = await getDocs(q);
      const contactsList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUsers(contactsList);
    };

    fetchContacts();
  }, []);

  const uploadImage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `chat-images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  };

  // Add a new useEffect for listening to messages for the selected contact
  useEffect(() => {
    if (!selectedContact) return;

    // Set up the real-time listener for the selected contact's messages
    const q = doc(db, "chats", selectedContact.id);
    const unsubscribe = onSnapshot(q, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setMessages(data.message || []); // Update the state with new messages
      }
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the contact changes or component unmounts
    };
  }, [selectedContact]); // This effect runs whenever the selectedContact changes

  // SendMessage function (remains the same as before)
  const sendMessage = async (e, docId) => {
    e.preventDefault();
    if (newMessage.trim() === "" && !newImage) return;

    let imageURL = null;
    if (newImage) {
      imageURL = await uploadImage(newImage); // Upload image if exists
    }

    await updateDoc(doc(db, "chats", docId), {
      message: arrayUnion({
        content: newMessage,
        seen: false,
        sender: localStorage.getItem("id"),
        timestamp: new Date(),
        image: imageURL, // Add image URL if uploaded
      }), // Sending message to the selected contact
    });

    // Clear the message and image
    setNewMessage("");
    setNewImage(null);
  };

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, "chats", id));
  };

  const handleReply = (msg) => {
    setReplyTo(msg);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Contact List */}
      <div className="w-1/4 border-e-2 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        <ul>
          {contacts.map((contact) => {
            let user;

            // Determine the user based on local storage ID
            if (contact.firstID !== localStorage.getItem("id")) {
              console.log(`first if cond ${contact.firstID}`);
              user = users.find((item) => contact.firstID === item.id);
              console.log(user);
            } else {
              console.log(contact.secondID);
              user = users.find((item) => contact.secondID === item.id);
            }

            // Check if the last message exists
            const lastMessage =
              contact.message && contact.message.length > 0
                ? contact.message[contact.message.length - 1]
                : null;

            return (
              // Ensure to return the <li> element
              <li
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  handleSelectContact(contact);
                }}
                className={`p-2 mb-2 cursor-pointer rounded-lg ${
                  selectedContact?.id === contact.id
                    ? "bg-blue-300"
                    : "bg-white"
                } hover:bg-gray-300`}
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={
                      user.profilePic
                        ? user.profilePic
                        : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                    } // Provide a default image if user is not found
                    alt=""
                  />
                  <div>
                    <p>{user ? user.firstname : "Unknown User"}</p>
                    <p
                      className={`${
                        lastMessage.seen
                          ? "text-gray-400"
                          : "text-black font-bold"
                      } line-clamp-none overflow-hidden`}
                      title={
                        lastMessage ? lastMessage.content : "No messages yet"
                      }
                    >
                      {lastMessage ? lastMessage.content : "No messages yet"}
                    </p>
                    {/* Provide a fallback for messages */}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Section: Chat Window */}
      <div className="flex-1 p-4 bg-white">
        {/* <h2 className="text-xl font-bold mb-4">
          {selectedContact
            ? `Chat with ${selectedContact.firstname} ${selectedContact.lastname}`
            : "Select a Contact"}
        </h2> */}

        <div className="messages h-[75vh] overflow-y-auto  p-4 rounded">
          {selectedContact && selectedContact.message ? (
            selectedContact.message.map((msg, index) => (
              <div
                key={index}
                className={`w-1/2 message ${
                  msg.sender === localStorage.getItem("id")
                    ? "sent"
                    : "received"
                }`}
              >
                <strong>{msg.content}</strong>
                {msg.text}
                {msg.replyTo && (
                  <div className="reply"> reply to: {msg.replyTo}</div>
                )}
                {msg.image && (
                  <img src={msg.image} alt="sent" className="sent-image" />
                )}
                {msg.sender === currentUser?.displayName && (
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="delete-btn"
                  >
                    delete
                  </button>
                )}
                <button onClick={() => handleReply(msg)} className="reply-btn">
                  reply
                </button>
              </div>
            ))
          ) : (
            <p>No messages yet</p> // Fallback message if no messages exist
          )}
        </div>

        {/* Reply Indicator */}
        {replyTo && (
          <div className="replying-to">
            reply {replyTo.text}{" "}
            <button className="text-red-700" onClick={() => setReplyTo(null)}>
              Cancel
            </button>
          </div>
        )}

        {/* Send Message Form */}
        <form
          onSubmit={(e) => {
            sendMessage(e, selectedContact.id);
          }}
          className="flex items-center mt-4"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message"
            className="rounded-full w-96 p-2 border border-gray-300"
          />
          <label htmlFor="image-upload" className="cursor-pointer m-2">
            <IoImageOutline size={32} className="text-blue-600" />
          </label>
          <input
            id="image-upload"
            type="file"
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <button type="submit" className="m-2">
            <IoMdSend size={32} className="text-blue-600" />
          </button>
        </form>
      </div>

      <style jsx>{`
        .messages {
          margin: 20px 0;
        }
        .message {
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 10px;
          max-width: 60%;
          word-wrap: break-word;
        }
        .sent {
          background-color: #dcf8c6;
          text-align: right;
          margin-left: auto;
        }
        .received {
          background-color: #ececec;
          text-align: left;
          margin-right: auto;
        }
        .reply {
          font-size: 12px;
          color: gray;
          margin-top: 5px;
        }
        .reply-btn,
        .delete-btn {
          margin-left: 10px;
          cursor: pointer;
          color: blue;
          background: none;
          border: none;
          font-size: 12px;
        }
        .sent-image {
          width: 100px;
          height: auto;
          margin-top: 10px;
          border-radius: 5px;
        }
        .replying-to {
          margin-bottom: 10px;
          padding: 5px;
          background-color: #f0f0f0;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
