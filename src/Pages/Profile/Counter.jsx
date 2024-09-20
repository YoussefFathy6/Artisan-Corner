import { useEffect, useState } from "react";
import db from "../../Config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
function Counter(){
    const [eventCount, setEventCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const userid = localStorage.getItem("id");
  console.log(userid);
  useEffect(() => {
      // Query the number of events for the specific user
      const eventQuery = query(collection(db, "add event"), where("organizer", "==", userid));
      onSnapshot(eventQuery, (snapshot) => {
        setEventCount(snapshot.size);
      });

      // Query the number of products for the specific user
      const productQuery = query(collection(db, "add product"), where("ownerID", "==", userid));
      onSnapshot(productQuery, (snapshot) => {
        setProductCount(snapshot.size);
      });

      // Query the number of reviews for the specific user
      const reviewQuery = query(collection(db, "userReviews"), where("userID", "==", userid));
      onSnapshot(reviewQuery, (snapshot) => {
        setReviewCount(snapshot.size);
      });
  
  }, []);
    return(
        <>
      <div className="flex justify-around mt-20">
        <div>
          <h2 className="text-5xl ty mb-3">+{eventCount}</h2>
          <h2 className="text-3xl ty">Events</h2>
        </div>
        <div>
          <h2 className="text-5xl ty mb-3">+{productCount}</h2>
          <h2 className="text-3xl ty">Products</h2>
        </div>
        <div>
          <h2 className="text-5xl ty mb-3">+{reviewCount}</h2>
          <h2 className="text-3xl ty text-center">Reviews</h2>
        </div>
      </div>
    </>
    )
}
export default Counter;


    