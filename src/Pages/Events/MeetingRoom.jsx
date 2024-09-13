import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Button } from 'flowbite-react';

const appId = '40591c10a360450c8158ca34dba081f6';
const token = '007eJxTYLjzUYN/8v5l5647X37R3v5mZq7DwpzlZfYSKhtL6zb0O2spMJimpVpaphmYJqeZmpkkJqUmJqVYGJknG5iamackmZqbtnk+SWsIZGQo4XNkYIRCEJ+LwSMxLyUzuSgxrYSBAQCm9SLI';
const channelName = 'Handicraft';

const CameraIcon = ({ isOn }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: isOn ? 'black' : 'red' }}>
    <path d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z"/>
    {!isOn && (
      <line x1="4" y1="4" x2="20" y2="20" style={{ stroke: 'red', strokeWidth: 2 }} />
    )}
  </svg>
);

const MicIcon = ({ isOn }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: isOn ? 'black' : 'red' }}>
    <path d="M12 14c1.656 0 3-1.344 3-3v-4c0-1.656-1.344-3-3-3s-3 1.344-3 3v4c0 1.656 1.344 3 3 3zm6 1v-2c0-3.313-2.688-6-6-6s-6 2.688-6 6v2h-2v2h16v-2h-2zm-6 5c-2.209 0-4-1.791-4-4h8c0 2.209-1.791 4-4 4z"/>
    {!isOn && (
      <line x1="4" y1="4" x2="20" y2="20" style={{ stroke: 'red', strokeWidth: 2 }} />
    )}
  </svg>
);

const VideoCall = () => {
  const [joined, setJoined] = useState(false);
  const [client, setClient] = useState(null);
  const [localTracks, setLocalTracks] = useState({ video: null, audio: null });
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    const initAgora = async () => {
      const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      setClient(agoraClient);

      agoraClient.on('user-published', async (user, mediaType) => {
        await agoraClient.subscribe(user, mediaType);

        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack;
          const remotePlayerContainer = document.createElement('div');
          remotePlayerContainer.id = user.uid;
          remotePlayerContainer.style.width = '400px';
          remotePlayerContainer.style.height = '300px';
          remotePlayerContainer.style.margin = '10px';

          document.getElementById('remote-videos').appendChild(remotePlayerContainer);
          remoteVideoTrack.play(remotePlayerContainer);
        }

        if (mediaType === 'audio') {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
      });
    };

    initAgora();

    return () => {
      if (client) {
        client.leave();
      }
    };
  }, []);

  const joinStream = async () => {
    try {
      const uid = await client.join(appId, channelName, token, null);
      const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

      setLocalTracks({ video: videoTrack, audio: audioTrack });

      // التحقق من نجاح إنشاء مسار الفيديو
      console.log('Local video track:', videoTrack);

      // عرض الفيديو في الحاوية المحلية
      videoTrack.play('local-player');
      console.log('Video playing in local-player');

      await client.publish([audioTrack, videoTrack]);
      setJoined(true);
    } catch (error) {
      console.error('Error joining stream:', error);
    }
  };
  
  const leaveStream = async () => {
    if (localTracks.video) localTracks.video.stop();
    if (localTracks.audio) localTracks.audio.stop();
    await client.leave();
    setJoined(false);
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      await localTracks.video.setEnabled(false);
    } else {
      await localTracks.video.setEnabled(true);
    }
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = async () => {
    if (isMicOn) {
      await localTracks.audio.setEnabled(false);
    } else {
      await localTracks.audio.setEnabled(true);
    }
    setIsMicOn(!isMicOn);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
    {/* ... */}

    {joined ? (
      <div className="flex flex-col space-y-4">
        <div id="local-player" className="w-80 h-60 border rounded-md shadow-md" />
        <div id="remote-videos" className="flex flex-wrap gap-4" />
        <div className="flex justify-center items-center">
          <Button onClick={toggleCamera} className="mr-4">
            <CameraIcon isOn={isCameraOn} />
          </Button>
          <Button onClick={toggleMic} className="mr-4">
            <MicIcon isOn={isMicOn} />
          </Button>
          <Button onClick={leaveStream} color="failure">
            Leave Call
          </Button>
        </div>
      </div>
    ) : (
      <div>
        <Button onClick={joinStream}>Join Call</Button>
      </div>
    )}
  </div>
  );
};

export default VideoCall;










// import { useEffect, useState } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';

// const appId ='1ffd9eec5ba04953889eee6062c921f6';  // ضع معرف التطبيق الخاص بك هنا
// const token = null;           // ضع الرمز هنا إذا كنت تستخدم رموزاً
// const channelName = 'test-channel';  // اسم القناة التي تريد الانضمام إليها

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