import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import db from '../../Config/firebase'; 

export default function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
        messagesArr.push(doc.data());
      });
      setMessages(messagesArr);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, "chats"), {
      text: newMessage,
      sender: currentUser?.displayName || "Unknown User", 
      timestamp: new Date(),
    });

    setNewMessage(''); 
  };

  return (
    <div>
      <h2>Chat Room</h2>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}