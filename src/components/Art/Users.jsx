import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../Config/firebase";
import Cards from "./Card";
import Loader from "../../components/Loader";

import pic from "../../assets/imges/newww/user7.jpeg";
import "../../Pages/Home/Component/Slider/Hero.css"
export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //    'accountType', '==', 'artist'

        const q = query(
          collection(db, "users"),
          where("accountType", "==", "Artist")
        );
        const querySnapshot = await getDocs(q);
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
        setFilteredUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <>
      <div className="page-fade-in">
        <header className=" h-[75vh]">
        <div className="relative h-[500px] w-[100%] rounded-b-[40px] shadow-2xl shadow-[#38636c] shadow-inner-[#38636c]">
  <img className="absolute w-[100%] h-[100%] rounded-b-[40px] object-cover" src={pic} />
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000000] to-[#00000000] rounded-b-[40px]"></div>
</div>


          <div className=" absolute top-16 h-[75vh] w-[100%] flex justify-center items-center ">
            <div className="text-center h-[400px]">

            <h1  className="text-8xl font-semibold text-white " style={{ fontFamily: "Playwrite DE Grund" }}>Our Artists</h1>
            <input
              type="text"
              placeholder="Search artist ..."
              className="  border rounded-lg w-96 mt-24"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
          </div>
        </header>

        <div className="  w-[85%] grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="mx-9 mb-8 shadow-2xl rounded-[40px]">

                <Cards
                  key={user.id}
                  data={user}
                  onTicketClick={() => console.log(user.id)}
                />
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}
