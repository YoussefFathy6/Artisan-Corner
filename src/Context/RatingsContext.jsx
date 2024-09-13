import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot, setDoc, addDoc } from "firebase/firestore";
import db from "../Config/firebase";

export const RatingsContext = createContext();

export const RatingsProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const productsData = {};
      snapshot.forEach((doc) => {
        productsData[doc.id] = doc.data();
      });
      setRatings(productsData);
    });

    return () => unsubscribe();
  }, []);


  const saveRating = async (productId, rating, review , userNameEmail) => {
   
    const reviewsRef = collection(db, "reviews");
    await addDoc(reviewsRef, {
      productId,
      rating,
      review,
      userNameEmail
    });
  };

  return (
    <RatingsContext.Provider value={{ ratings, saveRating }}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = () => useContext(RatingsContext);
