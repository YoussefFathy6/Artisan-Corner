import { useLocation } from "react-router-dom";

function ArtProfile() {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.firstname} {user.lastname}</h1>
          <p>{user.about}</p>
          <img src={user.profilePic || "default-avatar.png"} alt="Profile" />
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default ArtProfile;
