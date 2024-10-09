/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Dropdown, Button, Pagination } from "flowbite-react";
import db from "../../../Config/firebase";
import Masonry from "react-masonry-css";
import "./style.css";

import {
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Card from "./Card";
import Menu from "../Menu/Menu";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import Paper from '@mui/material/Paper';
import { useLocation } from "react-router-dom"; // QEDAiiiS
import "../../Home/Component/Slider/Hero.css"

// Start Function Component
function Main() {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1,
  };
  const location = useLocation(); // QEDAiiiS

  // const { categoryType } = location.state; // QEDAiiiS

  const [artists, setArtists] = useState([]); // الفنانين
  const [products, setProducts] = useState([]); // المنتجات
  const [filteredProducts, setFilteredProducts] = useState([]); //  المنتجات المتفلتره
  const [selectedCategories, setSelectedCategories] = useState([]);
  // console.log(ctegoryType);
  // console.log(selectedCategories);

  //  الفئه المتحدده
  const [priceRange, setPriceRange] = useState({ min: "", max: "" }); //   حد السعر
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false); // For showing filters dropdown on small screens قائمة الفلترز
  const [searchTerm, setSearchTerm] = useState("");

  // Loader state
  const [loading, setLoading] = useState(true); // حالة اللودر

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1); //  الصفحة الحالية
  const [productsPerPage] = useState(9); // Number of products to display per page   رقم الصفحة

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("accountType", "==", "Artist")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const artistArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setArtists(artistArr);
      },
      []
    );

    return () => unsubscribe();
  }, []);
  // console.log(artists);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "add product"),
      (snapshot) => {
        const productArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productArr);
        setFilteredProducts(productArr); // Initialize with all products
        setLoading(false); // Set loading to false after fetching data
      }
    );
    getUserData();

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // ========= user Data ==========//
  const [UID, setUID] = useState("");

  async function getUserData() {
    const userCollection = collection(db, "users");
    const q = query(
      userCollection,
      where("id", "==", localStorage.getItem("id"))
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      setUID(userData.id);
    });
  }
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.toLowerCase()); // Normalize case for comparison
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  async function clickMe(product) {
    await addDoc(collection(db, "Bag"), {
      title: product.title,
      image: product.img,
      description: product.description,
      price: product.price,
      basePrice: product.price,
      quantity: 1,
      userID: UID,
    });
    toast.success("Added successfully", {
      position: "top-right",
    });
  }

  const sortItemsHighest = () => {
    const sortedItems = [...filteredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedItems);
  };

  const sortItemsLowest = () => {
    const sortedItems = [...filteredProducts].sort((a, b) => b.price - a.price);
    setFilteredProducts(sortedItems);
  };

  const sortItemsByName = () => {
    const sortedItems = [...filteredProducts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setFilteredProducts(sortedItems);
  };

  const handleFilterChange = (categories) => {
    setSelectedCategories(categories);
    filterProducts(categories, priceRange);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
    filterProducts(selectedCategories, { min, max });
  };

  const filterProducts = (categories, price) => {
    let filtered = products;

    // Filter by category
    if (categories.length > 0) {
      filtered = filtered.filter(
        (product) => categories.includes(product.typeproduct) /// مبيرجعش غير المنتجات اللي من الفئه المتحدده
      );
    }

    // Filter by price range
    if (price.min !== "" || price.max !== "") {
      filtered = filtered.filter((product) => {
        const minPrice = price.min ? parseFloat(price.min) : 0;
        const maxPrice = price.max ? parseFloat(price.max) : Infinity;
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    setFilteredProducts(filtered);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // useEffect(() => {
  //   if (categoryType) {
  //     setSelectedCategories(categoryType)
  //     handleFilterChange(categoryType);
  //     console.log(selectedCategories);
  //   }
  // }, []);

  // handleFilterChange(selectedCategories)

  //todo/       Start HTML

  return (
    <div className="containerr grid grid-cols-1 sm:grid-cols-4 gap-4 page-fade-in">
      {/* Button to show the filters dropdown on small screens */}
      <div className="sm:hidden ">
        <Button
          className="bg-secondary my-3 text-nowrap"
          onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
        >
          Filter Options
        </Button>
      </div>

      {/* Show Loader while loading */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Filters Section */}
          <div
            className={`col-span-1 ${
              isFilterDropdownOpen ? "block" : "hidden"
            } sm:block`}
          >
            <Menu
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              onSearch={handleSearch}
            />
          </div>

          {/* Products Section */}
          <main className="col-span-3">
            {/* Sort by */}
            <div className="flex justify-between items-center mb-6">
              {filteredProducts.length} Items Found
              <div className="flex gap-3">
                <Dropdown label="Sort By" color="light" dismissOnClick={true}>
                  <Dropdown.Item onClick={sortItemsHighest}>
                    From Highest to Lowest
                  </Dropdown.Item>
                  <Dropdown.Item onClick={sortItemsLowest}>
                    From Lowest to Highest
                  </Dropdown.Item>
                  <Dropdown.Item onClick={sortItemsByName}>
                    By Name
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>

            {/* <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
              {currentProducts.map((product) => {
                // Find the corresponding artist for each product
                const artist = artists.find(
                  (artist) => artist.id === product.ownerID
                );

                return (
                  <div className="m-3" key={product.id}>
                    <Card
                      image={product.img}
                      title={product.title}
                      desc={product.description}
                      price={product.price}
                      productID={product.id}
                      firstname={artist?.firstname}
                      lastname={artist?.lastname}
                      artistImage={artist?.profilePic}
                      artistData={artist} // Assuming profilePic is the field name
                      func={() => clickMe(product)}
                    />
                  </div>
                );
              })}
            </section> */}

<section className=" mt-20">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {currentProducts.map((product) => {
                  const artist = artists.find(
                    (artist) => artist.id === product.ownerID
                  );

                  return (
                    <div className="m-3" key={product.id}>
                      <Card
                        image={product.img}
                        title={product.title}
                        desc={product.description}
                        price={product.price}
                        productID={product.id}
                        firstname={artist?.firstname}
                        lastname={artist?.lastname}
                        artistImage={artist?.profilePic}
                        artistData={artist} // Assuming profilePic is the field name
                        func={() => clickMe(product)}
                      />
                    </div>
                  );
                })}
              </Masonry>
            </section>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
              <Pagination
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // Smooth scrolling
                  });
                }}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default Main;
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const products = [
//     { id: 1, name: 'Product 1', category: 'Macramé' },
//     { id: 2, name: 'Product 2', category: 'Category 2' },
//     { id: 3, name: 'Product 3', category: 'Category 1' },
//     { id: 4, name: 'Product 4', category: 'Category 3' },
// ];

// const Main = () => {
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const category = queryParams.get('category');

//     const filteredProducts = category
//         ? products.filter(product => product.category === category)
//         : products;

//     return (
//         <div className="main">
//             <h1>Products in {category ? category : 'All Categories'}</h1>
//             <div className="productList">
//                 {filteredProducts.map(product => (
//                     <div key={product.id} className="product">
//                         <h2>{product.name}</h2>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Main;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import db from "../../../Config/firebase";
// import { onSnapshot, collection } from "firebase/firestore";
// import Card from "./Card";
// import Loader from "../../../components/Loader";
// import { toast } from "react-toastify";

// const Main = () => {
//   const location = useLocation();
//   const { categoryType } = location.state || {}; // QEDAiiiS
//   const queryParams = new URLSearchParams(location.search);
//   const categoryFromUrl = queryParams.get('category')

//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, "add product"), (snapshot) => {
//             const productArr = snapshot.docs.map((doc) => ({
//                 ...doc.data(),
//                 id: doc.id,
//             }));
//             setProducts(productArr);
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         if (category) {
//             const filtered = products.filter(product => product.typeproduct === category);
//             setFilteredProducts(filtered);
//         } else {
//             setFilteredProducts(products);
//         }
//     }, [category, products]);

//     const clickMe = (product) => {
//         toast.success("added   ", {
//             position: "top-right",
//         });
//     };

//     return (
//         <div className="container grid grid-cols-1 sm:grid-cols-4 gap-4">
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <main className="col-span-3">
//                     <h1>{category ? category : 'All category'}</h1>
//                     <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
//                         {filteredProducts.map((product) => (
//                             <div className="m-5" key={product.id}>
//                                 <Card
//                                     imgsrc={product.img}
//                                     title={product.title}
//                                     desc={product.description}
//                                     price={product.price}
//                                     productID={product.id}
//                                     func={() => clickMe(product)}
//                                 />
//                             </div>
//                         ))}
//                     </section>
//                 </main>
//             )}
//         </div>
//     );
// };

// export default Main;
