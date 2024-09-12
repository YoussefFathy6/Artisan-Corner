
import React, { createContext, useState } from 'react';

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [productType, setProductType] = useState("");

  return (
    <ReviewsContext.Provider value={{ productType, setProductType }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsContext;
