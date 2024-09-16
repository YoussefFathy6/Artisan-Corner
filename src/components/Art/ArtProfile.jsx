import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function ArtProfile() {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

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
