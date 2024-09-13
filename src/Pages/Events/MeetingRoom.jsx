
// import { useEffect, useState } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';

// const appId = '40591c10a360450c8158ca34dba081f6';  
// const token = null;        
// const channelName = 'test-channel';  

// const VideoCall = () => {
//   const [joined, setJoined] = useState(false);
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     const initAgora = async () => {
//       const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//       setClient(agoraClient);

//       agoraClient.on("user-published", async (user, mediaType) => {
//         await agoraClient.subscribe(user, mediaType);
        
//         if (mediaType === 'video') {
//           const remoteVideoTrack = user.videoTrack;
//           const remotePlayerContainer = document.createElement("div");
//           remotePlayerContainer.id = user.uid;
//           remotePlayerContainer.style.width = "400px";
//           remotePlayerContainer.style.height = "300px";
//           remotePlayerContainer.style.margin = "10px";
          
//           document.getElementById('remote-videos').appendChild(remotePlayerContainer);
//           remoteVideoTrack.play(remotePlayerContainer);
//         }

//         if (mediaType === 'audio') {
//           const remoteAudioTrack = user.audioTrack;
//           remoteAudioTrack.play();
//         }
//       });

//       await agoraClient.join(appId, channelName, token, null);

//       const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//       const localVideoTrack = await AgoraRTC.createCameraVideoTrack();

//       await agoraClient.publish([localAudioTrack, localVideoTrack]);

//       localVideoTrack.play('local-player');
//       setJoined(true);
//     };

//     initAgora();

//     return () => {
//       if (client) {
//         client.leave();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       {joined ? (
//         <div>
//           <div id="local-player" style={{ width: "400px", height: "300px", border: "1px solid #000" }}></div>
//           <div>مكالمة الفيديو بدأت!</div>
//           <div id="remote-videos" style={{ display: "flex", flexWrap: "wrap" }}></div>
//         </div>
//       ) : (
//         <div>جاري الانضمام إلى القناة...</div>
//       )}
//     </div>
//   );
// };

// export default VideoCall;
