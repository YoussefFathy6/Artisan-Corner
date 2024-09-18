// import  { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useParams } from 'react-router-dom';
// import  db  from '../../Config/firebase'; 
// import { collection, addDoc,  } from 'firebase/firestore';

// const socket = io('http://localhost:3001');

// function ChatApp() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const { profileId } = useParams();
//   const userId = localStorage.getItem('id');

//   useEffect(() => {
//     const handleConnect = () => console.log('Connected to socket.io server');
//     const handleDisconnect = () => console.log('Disconnected from socket.io server');
//     const handleError = (error) => console.error('Socket.io error:', error);
  
//     socket.on('connect', handleConnect);
//     socket.on('disconnect', handleDisconnect);
//     socket.on('error', handleError);
  
//     // Rest of your useEffect logic
  
//     return () => {
//       socket.off('connect', handleConnect);
//       socket.off('disconnect', handleDisconnect);
//       socket.off('error', handleError);
//     };
//   }, []);
//   const sendMessage = async () => {
//     if (message && profileId) {
//       const roomId = [userId, profileId].sort().join('-');
//       const newMessage = {
//         userId,
//         profileId,
//         message,
//         timestamp: new Date(),
//       };
  
//       try {
//         console.log('Sending message:', newMessage); // Log the message being sent
//         await addDoc(collection(db, 'chats', roomId, 'chat'), newMessage);
//         socket.emit('chat message', newMessage);
//         setMessage('');
//       } catch (error) {
//         console.error('Error saving message:', error);
//       }
//     }
//   };
  

//       // حفظ الرسالة في Firebase
     

//   return (
//     <div>
//       <h1>Chat with Profile Owner</h1>
//       <div>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Messages:</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>
//               <strong>{msg.userId === userId ? 'You' : 'Other'}:</strong> {msg.message}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;



// // import { useState, useEffect } from 'react';

// // function ChatApp() {
// //   const [message, setMessage] = useState('');
// //   const [messages, setMessages] = useState([]);
  
// //   const userId = localStorage.getItem('id'); // جلب ID المستخدم الخاص بك من localStorage
// //   const [profileId, setProfileId] = useState(null); // تخزين profileId الخاص بصاحب البروفايل

// //   useEffect(() => {
// //     // جلب profileId من الرابط
// //     const urlParams = new URLSearchParams(window.location.search);
// //     const profileIdFromUrl = urlParams.get('profileId');
    
// //     if (profileIdFromUrl) {
// //       setProfileId(profileIdFromUrl);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (userId && profileId) {
// //       // استرجاع الرسائل عند تحميل المكون
// //       getMessages(userId, profileId, (msgs) => {
// //         setMessages(msgs);
// //       });
// //     }
// //   }, [userId, profileId]);

// //   const sendMessage = async () => {
// //     if (message && userId && profileId) {
// //       try {
// //         await sendMessage(userId, profileId, message);
// //         setMessage('');
// //         // تحديث الرسائل بعد إرسال الرسالة
// //         getMessages(userId, profileId, (msgs) => {
// //           setMessages(msgs);
// //         });
// //       } catch (error) {
// //         console.error('Error sending message:', error);
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Chat with Profile Owner</h1>
// //       <div>
// //         <input
// //           type="text"
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           placeholder="Type a message"
// //         />
// //         <button onClick={sendMessage}>Send</button>
// //       </div>
// //       <div>
// //         <h2>Messages:</h2>
// //         <ul>
// //           {messages.map((msg, index) => (
// //             <li key={index}>
// //               <strong>{msg.userId.stringValue === userId ? 'You' : 'Other'}:</strong> {msg.message.stringValue}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ChatApp;
