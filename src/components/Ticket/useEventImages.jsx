import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./../../Config/firebase"; // Adjust the import path as necessary

const useEventImages = (directory) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRef = ref(storage, directory);
        const imageList = await listAll(imageRef);
        const urls = await Promise.all(
          imageList.items.map((item) => getDownloadURL(item))
        );
        console.log("Fetched image URLs:", urls); // Debugging line
        setImages(urls);
      } catch (err) {
        console.error("Error fetching images:", err); // Debugging line
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchImages();
  }, [directory]);
  

  return { images, loading, error };
};

export default useEventImages;
