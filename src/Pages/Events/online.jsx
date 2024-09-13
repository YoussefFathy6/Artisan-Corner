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

