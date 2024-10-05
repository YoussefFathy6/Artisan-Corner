// eslint-disable-next-line no-unused-vars
// import React from "react";
// import Comp_SmCard from "./componant/CompSmCard";
// import best1 from "../../../../../../assets/imges/newww/best1.jpg";
// import best2 from "../../../../../../assets/imges/newww/best2.jpeg";
// import best3 from "../../../../../../assets/imges/newww/best3.jpeg";
// import best4 from "../../../../../../assets/imges/newww/best4.jpeg";
// import best5 from "../../../../../../assets/imges/newww/best5.jpeg";

// function SmallC() {
//   return (
//     <div className="  grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-8 xl:gap-5 justify-center">
//       <Comp_SmCard url={best1} />
//       <Comp_SmCard url={best2} />
//       <Comp_SmCard url={best3} />
//       <Comp_SmCard url={best4} />
//       <Comp_SmCard url={best5} />
//     </div>
//   );
// }

// export default SmallC;

// QEDAiiiS Newwwwwwwwwwwwwwwwwwwwwwwwwwww============================================Newwwwwwwwwwwwwwwwwwww

import React, { useEffect, useState } from "react";
import db from "../../../../../../Config/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import Comp_SmCard from "./componant/CompSmCard";

import "./componant/small.css";

function SmallC() {
  const [products, setProducts] = useState([]); // المنتجات

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "add product"),
      (snapshot) => {
        const productArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productArr);
        // setFilteredProducts(productArr); // Initialize with all products
        // setLoading(false); // Set loading to false after fetching data
      }
    );
    // getUserData();
    console.log(products);

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <div className=" carousel  overflow-hidden h-[50vh]">
      <div class="carousel__container grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5   justify-center">
        {products.map((product) => {
          return (
              <Comp_SmCard
                url={product.img}
                title={product.title}
                price={product.price}
              />
          );
        })}
      </div>
    </div>
  );
}

export default SmallC;
