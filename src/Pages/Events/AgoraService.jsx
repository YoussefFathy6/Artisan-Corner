import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const AgoraService = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    // إنشاء عميل AgoraRTC
    const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    setClient(agoraClient);

    // تنظيف العميل عند إلغاء تحميل المكون
    return () => {
      if (client) {
        client.leave()
          .then(() => console.log('Left the room successfully'))
          .catch((error) => console.error('Failed to leave the room', error));
      }
    };
  }, [client]);

  const createRoom = (roomName) => {
    if (client) {
      client.join(null, roomName, null)
        .then(() => {
          console.log(`Joined room: ${roomName}`);
          // يمكنك البدء في نشر الفيديو أو استقبال الفيديو هنا
        })
        .catch((error) => {
          console.error('Failed to join room', error);
        });
    }
  };

  return {
    createRoom
  };
};

export default AgoraService;
