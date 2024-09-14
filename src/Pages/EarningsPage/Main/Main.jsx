import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "flowbite-react";
import db from "../../../Config/firebase";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import Card from "./Card";
import Menu from "../Menu/Menu";

function Main() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false); // For showing filters dropdown on small screens

  useEffect(() => {
    let arr;
    onSnapshot(collection(db, "add product"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setProducts([...arr]);
      setFilteredProducts([...arr]); // Initialize with all products
    });
  }, []);

  async function clickMe(product) {
    await addDoc(collection(db, "Bag"), {
      name: product.title,
      imgsrc: product.img,
      description: product.description,
      price: product.price,
      basePrice: product.price,
      quantity: 1,
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

    // Filter by category
    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.typeproduct)
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

  return (
    <div className="containerr grid grid-cols-1 sm:grid-cols-4 gap-4">
      {/* Button to show the filters dropdown on small screens */}
      <div className="sm:hidden">
        <Button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}>
          Filter Options
        </Button>
      </div>

      {/* Filters Section */}
      <div
        className={`col-span-1 ${
          isFilterDropdownOpen ? "block" : "hidden"
        } sm:block`}
      >
        <Menu
          onFilterChange={handleFilterChange}
          onPriceChange={handlePriceChange}
        />
      </div>

      {/* Products Section */}
      <main className="col-span-3">
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
              <Dropdown.Item onClick={sortItemsByName}>By Name</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div className="m-5" key={product.id}>
              <Card
                imgsrc={product.img}
                productType={product.title}
                title={product.description}
                price={product.price}
                productID={product.id}
                func={() => clickMe(product)}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
