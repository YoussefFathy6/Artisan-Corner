import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, getDocs, where } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db from '../../Config/firebase'; 
import { IoMdSend } from "react-icons/io"; 
import { IoImageOutline } from "react-icons/io5"; 

export default function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newImage, setNewImage] = useState(null); 
  const [replyTo, setReplyTo] = useState(null); 
  const [users, setUsers] = useState({}); 

  useEffect(() => {
    const storedUser = localStorage.getItem("id");

    try {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    } catch (error) {
      setCurrentUser({ displayName: storedUser });
    }

    const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messagesArr = [];
      querySnapshot.forEach((doc) => {
        messagesArr.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesArr);
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userid = localStorage.getItem("id");
        if (userid) {
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("id", "==", userid));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUsers(userData.reduce((acc, user) => {
              acc[user.displayName] = user.displayName;
              return acc;
            }, {}));
          } else {
            console.error("No user found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
  
    fetchUser();
  }, []);

  const uploadImage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `chat-images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed', 
        (snapshot) => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' && !newImage) return;

    let imageURL = null;
    if (newImage) {
      imageURL = await uploadImage(newImage);
    }

    await addDoc(collection(db, "chats"), {
      text: newMessage,
      sender: currentUser?.displayName || "Unknown User", 
      timestamp: new Date(),
      replyTo: replyTo ? replyTo.text : null,
      image: imageURL, 
    });

    setNewMessage('');
    setNewImage(null); 
    setReplyTo(null);
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
    <div className='p-9'>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === currentUser?.displayName ? 'sent' : 'received'}`}>
            <strong>{msg.sender}: </strong> 
            {msg.text}

            {msg.replyTo && <div className="reply"> reply to: {msg.replyTo}</div>}

            {msg.image && <img src={msg.image} alt="sent" className="sent-image" />} 

            {msg.sender === currentUser?.displayName && (
              <button onClick={() => deleteMessage(msg.id)} className="delete-btn">delete</button> 
            )}

            <button onClick={() => handleReply(msg)} className="reply-btn">reply</button> 
          </div>
        ))}
      </div>

      {replyTo && (
        <div className="replying-to">
          reply {replyTo.text} <button className='text-red-700' onClick={() => setReplyTo(null)}>Cancel</button>
        </div>
      )}

      <form onSubmit={sendMessage} className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your message"
          className='rounded-full w-96 p-2'
        />
        <label htmlFor="image-upload" className="cursor-pointer m-2">
          <IoImageOutline size={32} className='text-blue-600' />
        </label>
        <input 
          id="image-upload" 
          type="file" 
          onChange={handleImageSelect} 
          accept="image/*" 
          className='hidden' 
        />
        <button type="submit" className='m-2'>
          <IoMdSend size={32} className='text-blue-600' />
        </button>
      </form>

      <style jsx>{`
        .messages {
          margin: 20px 0;
          max-height: 300px;
          overflow-y: auto;
        }
        .message {
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 10px;
          max-width: 60%;
          word-wrap: break-word;
        }
        .sent {
          background-color: #DCF8C6;
          text-align: right;
          margin-left: auto;
        }
        .received {
          background-color: #ECECEC;
          text-align: left;
          margin-right: auto;
        }
        .reply {
          font-size: 12px;
          color: gray;
          margin-top: 5px;
        }
        .reply-btn, .delete-btn {
          margin-left: 10px;
          cursor: pointer;
          color: blue;
          background: none;
          border: none;
          font-size: 12px;
        }
        .sent-image {
          width: 1000px;
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
