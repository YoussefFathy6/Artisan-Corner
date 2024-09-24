



import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import db from '../../Config/firebase';  
import Cards from './Card';
import Loader from "../../components/Loader";

export default function Users() {
  const [users, setUsers] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //    'accountType', '==', 'artist'

        const q = query(collection(db, 'users'), where('accountType', '==', 'Artist'));
        const querySnapshot = await getDocs(q);
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
        setFilteredUsers(usersList); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    const results = users.filter((user) => 
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <>
 
      <div className="p-16 h-96 bg-slate-300 justify-center items-center m-auto text-center">
       
         <h1 className='text-5xl text-red-950 text-center font-semibold'>Our Artists</h1>
         <input 
    
    type="text" 
    placeholder="Search users..." 
    className="  border rounded-lg w-96 mt-7 " 
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
  />

      </div>

      <div className=" mb-28 -mt-40 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  items-center justify-center p-9">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Cards key={user.id} data={user} onTicketClick={() => console.log(user.id)} />
          ))
        ) : (
          <Loader/>
        )}
      </div>
    </>
  );
}
