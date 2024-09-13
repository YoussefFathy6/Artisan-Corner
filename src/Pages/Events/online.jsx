// import { useState } from 'react';
// import axios from 'axios';

// const CreateEventRoom = () => {
//   const [eventName, setEventName] = useState('');
//   const [eventDescription, setEventDescription] = useState('');
//   const [eventDate, setEventDate] = useState('');

//   const getZoomAccessToken = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/getZoomToken');
//       console.log(response.data.access_token)
//       return response.data.access_token;
//     } catch (error) {
//       console.error('Error getting Zoom access token:', error);
//     }
//   };

//   const createZoomMeeting = async () => {
//     try {
//       const response = await axios.post(
//         'https://managedservices-prod.rteappbuilder.com/v1/channel',
//         {
//           title: "my_first_chan",
//           enable_pstn: true
//         }
       
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error creating Zoom meeting:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = await getZoomAccessToken();
//       const meetingLink = await createZoomMeeting(token);

//       if (meetingLink) {
//         alert('Event created successfully! Link: ' + meetingLink);
//       }
//     } catch (error) {
//       console.error('Error creating event room:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Online Event Room</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//           placeholder="Event Name"
//           required
//         />
//         <textarea
//           value={eventDescription}
//           onChange={(e) => setEventDescription(e.target.value)}
//           placeholder="Event Description"
//           required
//         />
//         <input
//           type="datetime-local"
//           value={eventDate}
//           onChange={(e) => setEventDate(e.target.value)}
//           required
//         />
//         <button type="submit" onClick={createZoomMeeting}>Create Event Room</button>
//       </form>
//     </div>
//   );
// };

// export default CreateEventRoom;


// import  { useState } from 'react';
// import PropTypes from 'prop-types';

// const CreateRoom = ({ onCreate }) => {
//   const [roomName, setRoomName] = useState('');

//   const handleCreateRoom = () => {
//     if (roomName) {
//       if (typeof onCreate === 'function') {
//         onCreate(roomName);
//         setRoomName('');
//       } else {
//         console.error('onCreate is not a function');
//       }
//     } else {
//       console.error('Room name is empty');
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={roomName}
//         onChange={(e) => setRoomName(e.target.value)}
//         placeholder="Enter room name"
//       />
//       <button onClick={handleCreateRoom}>Create Room</button>
//     </div>
//   );
// };

// CreateRoom.propTypes = {
//   onCreate: PropTypes.func.isRequired,
// };

// export default CreateRoom;

import { useState } from 'react';
import axios from 'axios';

const CreateEventRoom = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');

  // Fetch Agora token from the server
 

  // Create an Agora channel using Agora RESTful API
  const createAgoraChannel = async (token) => {
    try {
      const response = await axios.post(
        'https://api.agora.io/v1/apps/40591c10a360450c8158ca34dba081f6/channels', // Replace APP_ID with the actual Agora App ID
        {
          cname: eventName, // The channel name
          description: eventDescription, // The event description
          start_time: eventDate // The event start date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token in the header
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // The response might contain channel info or links
    } catch (error) {
      console.error('Error creating Agora channel:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = "007eJxTYPi+JWfKt+M3H0UpJR6Xmr1+x6bQn/yZ92YXzPowacbhOBsVBQbTtFRLyzQD0+Q0UzOTxKTUxKQUCyPzZANTM/OUJFNzU3fXJ2kNgYwMV3o3MzIyQCCIz8XgkZiXkplclJhWwsAAAE81JXw="; // Get the Agora token
      const channelData = await createAgoraChannel(token); // Create the Agora channel

      if (channelData) {
        alert('Event created successfully! Channel Info: ' + JSON.stringify(channelData));
      }
    } catch (error) {
      console.error('Error creating event room:', error);
    }
  };

  return (
    <div>
      <h1>Create Online Event Room (Agora)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event Description"
          required
        />
        <input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <button type="submit">Create Event Room</button>
      </form>
    </div>
  );
};

export default CreateEventRoom;

