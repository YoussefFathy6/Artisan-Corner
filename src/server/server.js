/* eslint-disable no-undef */
// // // eslint-disable-next-line no-undef
// // const cors = require('cors');

// // // eslint-disable-next-line no-undef
// // const express = require('express');
// // // eslint-disable-next-line no-undef
// // const axios = require('axios');
// // const app = express();
// // app.use(express.urlencoded());
// // app.use(express.json());
// // app.use(cors()); 

// // // استبدل CLIENT_ID و CLIENT_SECRET بالقيم الصحيحة
// // const CLIENT_ID = 'q1_rFHbjTnevt9fLpmF_LA';
// // const CLIENT_SECRET = '0iguwdbLPfpc54lgtibHN7rrSpCAZKSh';

// // app.get("/api/getZoomToken",async(req,res)=>
// // {
// //     res.send("sssss")
// // })
// // app.post('/api/getZoomToken', async (req, res) => {
// //     console.log("first")
// //   try {
// //     const response = await axios.post('https://zoom.us/oauth/token', null, {
// //       params: {
// //         grant_type: 'client_credentials',
// //       },
// //       headers: {
// //         // eslint-disable-next-line no-undef
// //         Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
// //         'Content-Type': 'application/x-www-form-urlencoded',
// //       },
// //     });

// //     res.json({ access_token: response.data.access_token });
// //   } catch (error) {
// //     console.error('Error fetching Zoom token:', error);
// //     res.status(500).json({ message: 'Error fetching Zoom token' });
// //   }
// // });
// // app.post('/api/createZoomMeeting', async (req, res) => {
// //     try {
// //       const { token, meetingData } = req.body;
// //       console.log(meetingData)
  
// //       const response = await axios.post(
// //         'https://api.zoom.us/v2/users/me/meetings',
// //         meetingData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );
  
// //       res.json({ join_url: response.data.join_url });
// //     } catch (error) {
// //       console.error('Error creating Zoom meeting:', error);
// //       res.status(500).json({ message: 'Error creating Zoom meeting' });
// //     }
// //   });
// // app.listen(5000, () => {
// //   console.log('Server is running on port 5000');
// // });



// // eslint-disable-next-line no-undef

// // eslint-disable-next-line no-undef
// // const express = require('express');
// // // eslint-disable-next-line no-undef
// // const axios = require('axios');
// // // eslint-disable-next-line no-undef
// // const cors = require('cors');
// // const { RtcTokenBuilder } = require('agora-access-token'); // Agora token generator

// // const app = express();
// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
// // app.use(cors({
// //   origin: 'http://localhost:5173'
// // }));

// // // Replace with your Agora APP_ID and APP_CERTIFICATE
// // const APP_ID = '40591c10a360450c8158ca34dba081f6';
// // const APP_CERTIFICATE = 'b13b6322f6644ba49c3492c522fc1f7c';

// // // Function to generate Agora token
// // const generateAgoraToken = (channelName, uid) => {
// //   const Role = RtcTokenBuilder.Role;
// //   const expirationTimeInSeconds = 3600;
// //   const currentTimestamp = Math.floor(Date.now() / 1000);
// //   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

// //   // Generate token
// //   const token = RtcTokenBuilder.buildTokenWithUid(
// //     APP_ID,
// //     APP_CERTIFICATE,
// //     channelName,
// //     uid,
// //     Role.PUBLISHER,
// //     privilegeExpiredTs
// //   );

// //   return token;
// // };

// // // API to get Agora token
// // app.post('/api/getAgoraToken', async (req, res) => {
// //   const { channelName, uid } = req.body;

// //   if (!channelName || !uid) {
// //     return res.status(400).json({ message: 'Missing channelName or uid' });
// //   }

// //   try {
// //     const token = generateAgoraToken(channelName, uid);
// //     res.json({ access_token: token });
// //   } catch (error) {
// //     console.error('Error generating Agora token:', error);
// //     res.status(500).json({ message: 'Error generating Agora token' });
// //   }
// // });

// // // API to create a channel in Agora
// // app.post('/api/createAgoraChannel', async (req, res) => {
// //   try {
// //     const { token, channelName } = req.body;

// //     // Normally, this is where you'd interact with Agora Cloud Services to create a channel
// //     // But Agora creates a channel dynamically when you join with a valid token, so this
// //     // route can just return a success message for the purpose of this example.

// //     res.json({ message: 'Channel created successfully', channelName });
// //   } catch (error) {
// //     console.error('Error creating Agora channel:', error);
// //     res.status(500).json({ message: 'Error creating Agora channel' });
// //   }
// // });

// // // Start the server
// // app.listen(5000, () => {
// //   console.log('Server is running on port 5000');
// // });





// // const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

// // const appID = '40591c10a360450c8158ca34dba081f6';  // ضع الـ appId الخاص بك هنا
// // const appCertificate = '000ab26e241f45a0b97dcb5aa4bf2357';  // ضع الـ appCertificate الخاص بك هنا

// // // Function to generate token for a given channel and uid
// // const generateToken = (channelName, uid) => {
// //   const role = RtcRole.PUBLISHER;  // أو RtcRole.SUBSCRIBER
// //   const expireTime = 3600;  // مدة الصلاحية بالثواني (ساعة واحدة)

// //   // توليد التوكين
// //   const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, Math.floor(Date.now() / 1000) + expireTime);
  
// //   return token;
// // };

// // // مثال لتوليد توكين
// // const channelName = 'exampleChannel';  // اسم القناة الخاص بالمستخدم
// // const uid = 0;  // UID ديناميكي
// // const token = generateToken(channelName, uid);
// // console.log('Generated Token:', token);


// const express = require('express');
// const cors = require('cors');
// const { RtcTokenBuilder, RtcRole } = require('agora-access-token');  // تأكد من استيراد الكائنات بشكل صحيح

// const app = express();
// const port = 3000;

// const appID ='40591c10a360450c8158ca34dba081f6';  // ضع الـ appId الخاص بك هنا
// const appCertificate ='000ab26e241f45a0b97dcb5aa4bf2357';  // ضع الـ appCertificate الخاص بك هنا

// // تمكين CORS لجميع الطلبات
// app.use(cors({
//     origin: 'http://localhost:5173' // اسم النطاق الذي تريد السماح له
//   }));
  

// // Function to generate token for a given channel and uid
// const generateToken = (channelName, uid) => {
//       const role = RtcRole.PUBLISHER;  // أو RtcRole.SUBSCRIBER
//       const expireTime = 3600;  // مدة الصلاحية بالثواني (ساعة واحدة)
    
//       // توليد التوكين
//       const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, Math.floor(Date.now() / 1000) + expireTime);
      
//       return token;
//     };
  


// // نقطة نهاية API لتوليد التوكين
// app.get('/api/generateToken', (req, res) => {
//   const channelName = req.query.channelName;  // اسم القناة المرسل من الواجهة الأمامية
//   const uid = req.query.uid || 0;  // UID ديناميكي، يمكن إرساله عبر طلب HTTP أو تعيينه إلى 0 افتراضيًا

//   if (!channelName) {
//     return res.status(400).json({ error: 'Channel name is required' });
//   }

//   try {
//     // توليد التوكين
//     const token = generateToken(channelName, uid);

//     // إرسال التوكين في الرد
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Error generating token' });
//   }
// });

// // تشغيل السيرفر
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5174", // Update to match your frontend origin
//     methods: ["GET", "POST"]
//   }
// });

// app.use(cors({
//   origin: 'http://localhost:5174', // Update to match your frontend origin
//   methods: ['GET', 'POST']
// }));

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('join room', ({ userId, profileId }) => {
//     const roomId = [userId, profileId].sort().join('-');
//     socket.join(roomId);
//     console.log(`User ${userId} and profile owner ${profileId} joined room ${roomId}`);
//   });

//   socket.on('chat message', ({ message, roomId }) => {
//     console.log('Received message:', message); // Log the received message
//     io.to(roomId).emit('chat message', message);
//   });
  

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
