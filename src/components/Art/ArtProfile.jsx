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
    <div className="min-h-screen bg-gray-100  ">
      {user ? (
        <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden pt-44">
          <div className="relative">
          
           
          </div>

          <div className="p-20">
            <div className="relative">
              <div className="absolute -top-40 left-20">
                <img
            src={user.profilePic || "https://th.bing.com/th/id/OIP.PW1QzPVwoZHjpHacJ3WjjwAAAA?rs=1&pid=ImgDetMain"}
            alt="Profile"
                  className="w-80 h-80 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              <div className="justfy-center items-center ml-96 pl-16">
                <h1 className="text-2xl font-bold text-gray-800 pb-4">{user.firstname} {user.lastname}</h1>
                <p className="text-gray-600 pb-4">{user.email}</p>
                <p className="text-gray-600 pb-4">{user.accountType}</p>

                <p className="text-gray-600 pb-4">{user.about}</p>



               
              </div>
            </div>
          </div>

          <div className="mt-4 px-4">
            <ul className="flex space-x-4 text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Events</li>
              <li className="hover:text-blue-500 cursor-pointer">Posts</li>
              
            </ul>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default ArtProfile;
