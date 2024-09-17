import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import db from '../../Config/firebase'; // قاعدة البيانات

export default function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // تحقق من وجود userID في localStorage
    const storedUser = localStorage.getItem("id");

    try {
      // محاولة تحليل JSON، إذا لم يكن التنسيق صالحًا، استخدام القيمة النصية العادية
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    } catch (error) {
      // إذا كان النص غير صالح كـ JSON، استخدميه كنص عادي
      setCurrentUser({ displayName: storedUser });
    }

    // جلب الرسائل من Firestore في الوقت الحقيقي
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

  // دالة لإرسال رسالة جديدة
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, "chats"), {
      text: newMessage,
      sender: currentUser?.displayName || "Unknown User", // استخدم اسم المستخدم أو نص بديل إذا لم يكن موجودًا
      timestamp: new Date(),
    });

    setNewMessage(''); // مسح المدخل بعد الإرسال
  };

  return (
    <div>
      <h2>Chat Room</h2>

      {/* عرض الرسائل */}
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>

      {/* إدخال الرسائل */}
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
