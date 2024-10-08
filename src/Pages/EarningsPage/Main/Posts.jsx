import  { useState, useEffect } from "react";
import { Dropdown, Button, Pagination } from "flowbite-react";
import db from "../../../Config/firebase";
import "./style.css";
import {
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Masonry from "react-masonry-css";
import Menu from "../Menu/Menu";
import Loader from "../../../components/Loader";
import PostCard from "./PostCard";

function Posts() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
    500: 1,
  };

  const [artists, setArtists] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "add product"),
      (snapshot) => {
        const productArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productArr);
        setFilteredProducts(productArr);
        setLoading(false);
      }
    );
    getUserData();

    return () => unsubscribe();
  }, []);

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

  async function clickMe(product) {
    await addDoc(collection(db, "Bag"), {
      name: product.title,
      imgsrc: product.img,
      description: product.description,
      price: product.price,
      basePrice: product.price,
      quantity: 1,
      userID: UID,
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
      a.name.localeCompare(b.name)
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

    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.typeproduct)
      );
    }

    if (price.min !== "" || price.max !== "") {
      filtered = filtered.filter((product) => {
        const minPrice = price.min ? parseFloat(price.min) : 0;
        const maxPrice = price.max ? parseFloat(price.max) : Infinity;
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    setFilteredProducts(filtered);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="containerr ">
      {loading ? (
        <Loader />
      ) : (
        <>
          <main className="w-full col-span-8 ">
            <div className="flex justify-between items-center mb-6">
              <div className="col-span-1">
                <Button
                  className="bg-white text-black my-3 border-2  border-gray-400"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} 
                >
                  Filter Options
                </Button>
            <div className="col-span-1">


                {isFilterDropdownOpen && (
                  <div className="mt-2 border border-gray-300 shadow-lg rounded-md p-4 bg-white absolute z-40">
                    <Menu
                      onFilterChange={handleFilterChange}
                      onPriceChange={handlePriceChange}
                    />
                  </div>
                )}
              </div>
  {isFilterDropdownOpen && (
    <div className="mt-2 border border-gray-300 shadow-lg rounded-md p-4 bg-white absolute z-40">
      <Menu
        onFilterChange={handleFilterChange}
        onPriceChange={handlePriceChange}
      />
    </div>
  )}
</div>

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
            <section className="grid gap-5 mt-20">
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
                    <PostCard
                      key={product.id}
                      imgsrc={product.img}
                      Type={product.title}
                      title={product.description}
                      price={product.price}
                      productID={product.id}
                      firstname={artist?.firstname}
                      lastname={artist?.lastname}
                      artistImage={artist?.profilePic}
                      artistData={artist}
                      func={() => clickMe(product)}
                    />
                  );
                })}
              </Masonry>
            </section>

            <div className="flex justify-center mt-6">
              <Pagination
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
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

export default Posts;
