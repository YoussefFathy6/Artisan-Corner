import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import db from "../../Config/firebase"; // Make sure this path is correct
import { Button } from "flowbite-react";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Fetch artists from Firestore
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

  // Fetch products from Firestore
  useEffect(() => {
    const productsCollectionRef = collection(db, "tempProducts");

    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
      const productsData = [];
      snapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  // Function to find the corresponding artist for a product

  // Function to remove a product from 'tempProducts'
  const handleRemoveProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "tempProducts", productId));
      console.log(`Product with ID ${productId} removed from tempProducts.`);
    } catch (error) {
      console.error("Error removing product: ", error);
    }
  };

  // Function to move a product from 'tempProducts' to 'addProduct' collection
  const handleApproveProduct = async (product) => {
    try {
      // Remove from 'tempProducts'
      await deleteDoc(doc(db, "tempProducts", product.id));

      // Add to 'addProduct'
      await addDoc(collection(db, "add product"), {
        title: product.title,
        description: product.description,
        price: Number(product.price),
        review: "",
        img: product.img,
        productquantity: product.productquantity,
        typeproduct: product.typeproduct,
        ownerID: product.ownerID,
      });

      console.log(`Product with ID ${product.id} moved to addProduct.`);
    } catch (error) {
      console.error("Error moving product: ", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Products List</h2>
      {products.length > 0 ? (
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {products.map((product) => {
            const artist = artists.find(
              (artist) => artist.id === product.ownerID
            );
            console.log(artist);
            console.log(artists);
            // Find the artist by ownerID
            return (
              <li key={product.id}>
                <div
                  className="border rounded-lg shadow flex flex-col hover:scale-105 hover:shadow-xl transition-all"
                  style={{ height: "500px" }} // Ensuring card height is consistent
                >
                  {/* Product Image */}
                  <img
                    className="w-full h-56 rounded-t-lg cursor-pointer"
                    src={product.img}
                    alt={product.description}
                  />

                  {/* Artist Info */}
                  {artist && (
                    <div className="flex gap-4 items-center my-2 pe-2">
                      <img
                        className="rounded-full border-2 w-12 h-12 mx-4 cursor-pointer"
                        src={
                          artist.profilePic
                            ? artist.profilePic
                            : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                        }
                        alt="Artist Profile"
                      />
                      <p>{`${artist.firstname} ${artist.lastname}`}</p>
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="m-3">
                    <h5 className="text-base text-[#3E402D] font-Rosario font-bold tracking-tight dark:text-white">
                      {product.title}
                    </h5>
                    <p
                      className={`font-normal text-gray-500 dark:text-gray-400 text-[1rem] ${
                        isExpanded ? "line-clamp-none" : "line-clamp-2"
                      } overflow-hidden`}
                    >
                      {product.description}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDescription();
                      }}
                      className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>

                    {/* Price */}
                    <div className="flex justify-between items-center">
                      <h5 className="text-[1rem] font-medium mt-2">
                        {product.price} $
                      </h5>
                    </div>
                  </div>

                  {/* Approve and Decline Buttons */}
                  <div className="flex justify-between p-2">
                    <Button
                      onClick={() => {
                        handleApproveProduct(product);
                        toast.success("Added successfully", {
                          position: "top-right",
                        });
                      }}
                      color={"success"}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        handleRemoveProduct(product.id);
                        toast.success("Removed successfully", {
                          position: "top-right",
                        });
                      }}
                      color={"red"}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h1>No products found</h1>
      )}
    </div>
  );
}

export default Products;
