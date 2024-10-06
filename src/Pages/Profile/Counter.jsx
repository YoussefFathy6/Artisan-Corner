import { useEffect, useState } from "react";
import db from "../../Config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "./style.css"
function Counter(){
    const [eventCount, setEventCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const userid = localStorage.getItem("id");
  console.log(userid);
  useEffect(() => {
      const eventQuery = query(collection(db, "add event"), where("ownerID", "==", userid));
      onSnapshot(eventQuery, (snapshot) => {
        setEventCount(snapshot.size);
      });
      const productQuery = query(collection(db, "add product"), where("ownerID", "==", userid));
      onSnapshot(productQuery, (snapshot) => {
        setProductCount(snapshot.size);
      });
      const reviewQuery = query(collection(db, "userReviews"), where("userID", "==", userid));
      onSnapshot(reviewQuery, (snapshot) => {
        setReviewCount(snapshot.size);
      });
  
  }, []);
    return(
        <>
      <div className="flex justify-between w-96 mt-12">
        <div>
          <h2 className="text-3xl text-black mb-3 text-center">+{eventCount}</h2>
          <h2 className=" text-xl  text-center text-[#37977f]">Events</h2>
        </div>
        <div>
          <h2 className="text-3xl text-black mb-3  text-center">+{productCount}</h2>
          <h2 className=" text-xl text-center text-[#37977f]">Products</h2>
        </div>
        <div>
          <h2 className="text-3xl text-black mb-3 text-center">+{reviewCount}</h2>
          <h2 className=" text-xl text-center text-[#37977f]">Reviews</h2>
        </div>
      </div>
    </>
    )
}
export default Counter;


    