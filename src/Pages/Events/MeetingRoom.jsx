// import { useEffect, useState } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';
// import { Button } from 'flowbite-react';

// const appId = '40591c10a360450c8158ca34dba081f6';
// const token = '007eJxTYLjzUYN/8v5l5647X37R3v5mZq7DwpzlZfYSKhtL6zb0O2spMJimpVpaphmYJqeZmpkkJqUmJqVYGJknG5iamackmZqbtnk+SWsIZGQo4XNkYIRCEJ+LwSMxLyUzuSgxrYSBAQCm9SLI';
// const channelName = 'Handicraft';

// const CameraIcon = ({ isOn }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: isOn ? 'black' : 'red' }}>
//     <path d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z"/>
//     {!isOn && (
//       <line x1="4" y1="4" x2="20" y2="20" style={{ stroke: 'red', strokeWidth: 2 }} />
//     )}
//   </svg>
// );

// const MicIcon = ({ isOn }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: isOn ? 'black' : 'red' }}>
//     <path d="M12 14c1.656 0 3-1.344 3-3v-4c0-1.656-1.344-3-3-3s-3 1.344-3 3v4c0 1.656 1.344 3 3 3zm6 1v-2c0-3.313-2.688-6-6-6s-6 2.688-6 6v2h-2v2h16v-2h-2zm-6 5c-2.209 0-4-1.791-4-4h8c0 2.209-1.791 4-4 4z"/>
//     {!isOn && (
//       <line x1="4" y1="4" x2="20" y2="20" style={{ stroke: 'red', strokeWidth: 2 }} />
//     )}
//   </svg>
// );

// const VideoCall = () => {
//   const [joined, setJoined] = useState(false);
//   const [client, setClient] = useState(null);
//   const [localTracks, setLocalTracks] = useState({ video: null, audio: null });
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [isMicOn, setIsMicOn] = useState(true);

//   useEffect(() => {
//     const initAgora = async () => {
//       const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
//       setClient(agoraClient);

//       agoraClient.on('user-published', async (user, mediaType) => {
//         await agoraClient.subscribe(user, mediaType);

//         if (mediaType === 'video') {
//           const remoteVideoTrack = user.videoTrack;
//           const remotePlayerContainer = document.createElement('div');
//           remotePlayerContainer.id = user.uid;
//           remotePlayerContainer.style.width = '400px';
//           remotePlayerContainer.style.height = '300px';
//           remotePlayerContainer.style.margin = '10px';

//           document.getElementById('remote-videos').appendChild(remotePlayerContainer);
//           remoteVideoTrack.play(remotePlayerContainer);
//         }

//         if (mediaType === 'audio') {
//           const remoteAudioTrack = user.audioTrack;
//           remoteAudioTrack.play();
//         }
//       });
//     };

//     initAgora();

//     return () => {
//       if (client) {
//         client.leave();
//       }
//     };
//   }, []);

//   const joinStream = async () => {
//     try {
//       const uid = await client.join(appId, channelName, token, null);
//       const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

//       setLocalTracks({ video: videoTrack, audio: audioTrack });

//       // التحقق من نجاح إنشاء مسار الفيديو
//       console.log('Local video track:');

//       // عرض الفيديو في الحاوية المحلية
//       videoTrack.play('local-player');
//       console.log('Video playing in local-player');

//       await client.publish([audioTrack, videoTrack]);
//       setJoined(true);
//     } catch (error) {
//       console.error('Error joining stream:', error);
//     }
//   };
  
//   const leaveStream = async () => {
//     if (localTracks.video) localTracks.video.stop();
//     if (localTracks.audio) localTracks.audio.stop();
//     await client.leave();
//     setJoined(false);
//   };

//   const toggleCamera = async () => {
//     if (isCameraOn) {
//       await localTracks.video.setEnabled(false);
//     } else {
//       await localTracks.video.setEnabled(true);
//     }
//     setIsCameraOn(!isCameraOn);
//   };

//   const toggleMic = async () => {
//     if (isMicOn) {
//       await localTracks.audio.setEnabled(false);
//     } else {
//       await localTracks.audio.setEnabled(true);
//     }
//     setIsMicOn(!isMicOn);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen">
//     {/* ... */}

//     {joined ? (
//       <div className="flex flex-col space-y-4">
//         <div id="local-player" className="w-80 h-60 border rounded-md shadow-md" />
//         <div id="remote-videos" className="flex flex-wrap gap-4" />
//         <div className="flex justify-center items-center">
//           <Button onClick={toggleCamera} className="mr-4">
//             <CameraIcon isOn={isCameraOn} />
//           </Button>
//           <Button onClick={toggleMic} className="mr-4">
//             <MicIcon isOn={isMicOn} />
//           </Button>
//           <Button onClick={leaveStream} color="failure">
//             Leave Call
//           </Button>
//         </div>
//       </div>
//     ) : (
//       <div>
//         <Button onClick={joinStream}>Join Call</Button>
//       </div>
//     )}
//   </div>
//   );
// };

// export default VideoCall;





// // import { useEffect, useState } from 'react';
// // import AgoraRTC from 'agora-rtc-sdk-ng';
// // import { Button } from 'flowbite-react';
// // import { v4 as uuidv4 } from 'uuid';

// // const appId = '40591c10a360450c8158ca34dba081f6';

// // const CameraIcon = ({ isOn }) => (
// //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: isOn ? 'black' : 'red' }}>
// //     <path d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z"/>
// //     {!isOn && (
// //       <line x1="4" y1="4" x2="20" y2="20" style={{ stroke: 'red', strokeWidth: 2 }} />
// //     )}
// //   </svg>
// // );

// // const MicIcon = ({ isOn }) => (
// //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: isOn ? 'black' : 'red' }}>
// //     <path d="M12 14c1.656 0 3-1.344 3-3v-4c0-1.656-1.344-3-3-3s-3 1.344-3 3v4c0 1.656 1.344 3 3 3zm6 1v-2c0-3.313-2.688-6-6-6s-6 2.688-6 6v2h-2v2h16v-2h-2zm-6 5c-2.209 0-4-1.791-4-4h8c0 2.209-1.791 4-4 4z"/>
// //     {!isOn && (
// //       <line x1="4" y1="4" x2="20" y2="20" style={{ stroke: 'red', strokeWidth: 2 }} />
// //     )}
// //   </svg>
// // );

// // const VideoCall = () => {
// //   const [joined, setJoined] = useState(false);
// //   const [client, setClient] = useState(null);
// //   const [localTracks, setLocalTracks] = useState({ video: null, audio: null });
// //   const [isCameraOn, setIsCameraOn] = useState(true);
// //   const [isMicOn, setIsMicOn] = useState(true);

// //   useEffect(() => {
// //     const initAgora = async () => {
// //       try {
// //         const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
// //         setClient(agoraClient);

// //         agoraClient.on('user-published', async (user, mediaType) => {
// //           await agoraClient.subscribe(user, mediaType);

// //           if (mediaType === 'video') {
// //             const remoteVideoTrack = user.videoTrack;
// //             const remotePlayerContainer = document.createElement('div');
// //             remotePlayerContainer.id = `remote-${user.uid}`;
// //             remotePlayerContainer.style.width = '400px';
// //             remotePlayerContainer.style.height = '300px';
// //             remotePlayerContainer.style.margin = '10px';
// //             remotePlayerContainer.style.border = '1px solid #ccc';

// //             document.getElementById('remote-videos').appendChild(remotePlayerContainer);
// //             remoteVideoTrack.play(remotePlayerContainer);
// //           }

// //           if (mediaType === 'audio') {
// //             const remoteAudioTrack = user.audioTrack;
// //             remoteAudioTrack.play();
// //           }
// //         });

// //         agoraClient.on('user-unpublished', (user) => {
// //           const remotePlayerContainer = document.getElementById(`remote-${user.uid}`);
// //           if (remotePlayerContainer) {
// //             remotePlayerContainer.remove();
// //           }
// //         });
// //       } catch (error) {
// //         console.error('Error initializing Agora:', error);
// //       }
// //     };

// //     initAgora();

// //     return () => {
// //       if (client) {
// //         client.leave();
// //         client.removeAllListeners();
// //       }

// //       // Clean up remote video elements
// //       const remoteVideos = document.getElementById('remote-videos');
// //       if (remoteVideos) {
// //         while (remoteVideos.firstChild) {
// //           remoteVideos.removeChild(remoteVideos.firstChild);
// //         }
// //       }
// //     };
// //   }, [client]);

// //   const joinStream = async () => {
// //     try {
// //       const channelName = prompt('Enter the channel name:');
// //       if (!channelName) return alert('Channel name is required');
  
// //       const uid = uuidv4();
// //       console.log('Generated UID:', uid);
  
// //       const response = await fetch(`http://localhost:3000/api/generateToken?channelName=${channelName}&uid=${uid}`);
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
  
// //       const data = await response.json();
// //       console.log('Token response:', data);
// //       const token = data.token;
  
// //       if (!token) {
// //         throw new Error('No token received from the server.');
// //       }
  
// //       const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
// //       setClient(agoraClient);
  
// //       const uidNumber = parseInt(uid.replace(/-/g, ''), 16) % (2 ** 32); // Convert UUID to integer suitable for Agora
// //       const uidInt = Math.max(1, uidNumber); // Ensure UID is not zero
  
// //       console.log('Joining Agora channel with UID:', uidInt);
  
// //       await agoraClient.join(appId, channelName, token, uidInt);
// //       const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
  
// //       setLocalTracks({ video: videoTrack, audio: audioTrack });
// //       videoTrack.play('local-player');
// //       await agoraClient.publish([audioTrack, videoTrack]);
// //       setJoined(true);
// //     } catch (error) {
// //       console.error('Error joining stream:', error);
// //       if (error.message === 'Network timeout') {
// //         alert('Network timeout error. Please check your internet connection and try again.');
// //       } else {
// //         alert('Failed to join the stream. Check console for details.');
// //       }
// //     }
// //   };
  
// //   const leaveStream = async () => {
// //     if (localTracks.video) localTracks.video.stop();
// //     if (localTracks.audio) localTracks.audio.stop();
// //     if (client) await client.leave();
// //     setJoined(false);

// //     // Clean up remote video elements
// //     const remoteVideos = document.getElementById('remote-videos');
// //     if (remoteVideos) {
// //       while (remoteVideos.firstChild) {
// //         remoteVideos.removeChild(remoteVideos.firstChild);
// //       }
// //     }
// //   };

// //   const toggleCamera = async () => {
// //     if (localTracks.video) {
// //       await localTracks.video.setEnabled(!isCameraOn);
// //       setIsCameraOn(!isCameraOn);
// //     }
// //   };

// //   const toggleMic = async () => {
// //     if (localTracks.audio) {
// //       await localTracks.audio.setEnabled(!isMicOn);
// //       setIsMicOn(!isMicOn);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col justify-center items-center h-screen">
// //       {joined ? (
// //         <div className="flex flex-col space-y-4">
// //           <div id="local-player" className="w-80 h-60 border rounded-md shadow-md" />
// //           <div id="remote-videos" className="flex flex-wrap gap-4" />
// //           <div className="flex justify-center items-center">
// //             <Button onClick={toggleCamera} className="mr-4">
// //               <CameraIcon isOn={isCameraOn} />
// //             </Button>
// //             <Button onClick={toggleMic} className="mr-4">
// //               <MicIcon isOn={isMicOn} />
// //             </Button>
// //             <Button onClick={leaveStream} color="failure">
// //               Leave Call
// //             </Button>
// //           </div>
// //         </div>
// //       ) : (
// //         <div>
// //           <Button onClick={joinStream}>Join Call</Button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default VideoCall;














import { useEffect, useState } from 'react';

const VideoCall = () => {
  const [showMeeting, setShowMeeting] = useState(false);
  const [jitsiApi, setJitsiApi] = useState(null);

  useEffect(() => {
    // Dynamically load Jitsi Meet API script
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => {
      console.log("Jitsi Meet API script loaded");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  useEffect(() => {
    if (showMeeting && window.JitsiMeetExternalAPI) {
      const domain = "meet.jit.si";
      const options = {
        roomName: "MyCustomRoom",
        width: "100%",
        height: "600px",
        parentNode: document.getElementById("jitsi-container"),
        configOverwrite: { startWithVideoMuted: true },
        interfaceConfigOverwrite: { filmStripOnly: false },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      setJitsiApi(api);

      return () => {
        api.dispose(); 
      };
    }
  }, [showMeeting]);

  const handleStartMeeting = () => {
    setShowMeeting(true);
  };

  return (
    <div className='h-[100vh]'>
      {!showMeeting ? (
        <div className='flex justify-center mt-16'>
              <button onClick={handleStartMeeting} className='bg-[#025048] p-5 rounded-xl text-white'>Start Video Call</button>
        </div>
    
      ) : (
        <div id="jitsi-container" style={{ height: '900px', width: '100%' }} />
      )}
    </div>
  );
};

export default VideoCall;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{/* ربط كل ايفينت*/ }


