import AgoraService from './AgoraService';

const Online = () => {
  const { createRoom } = AgoraService();

  const handleCreateRoom = (roomName) => {
    createRoom(roomName);
  };

  return (
    <div>
      <h1>Create a Room</h1>
      <input
        type="text"
        placeholder="Enter room name"
        onBlur={(e) => handleCreateRoom(e.target.value)}
      />
    </div>
  );
};

export default Online;
