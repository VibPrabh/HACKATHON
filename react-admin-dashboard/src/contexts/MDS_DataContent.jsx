// src/contexts/ProductDataContext.js
import React, { createContext, useContext, useState } from "react";

// Create context
const ProductDataContext = createContext();

// Create a custom hook to use the context
export const useProductData = () => {
  return useContext(ProductDataContext);
};

// Create the provider component to wrap your app
export const ProductDataProvider = ({ children }) => {
  // Centralized data
  const [productData, setProductData] = useState([
    { id: 1, name: "Spiral test 1", score: "2", confidence: "0.78", date: "March 1 2024" },
    { id: 2, name: "Spiral test 2", score: "2", confidence: "0.8", date: "March 22 2024" },
    { id: 3, name: "Spiral test 3", score: "3", confidence: "0.88", date: "July 1 2024" },
    { id: 4, name: "Spiral test 4", score: "3", confidence: "0.78", date: "December 22 2024" },
    { id: 5, name: "Spiral test 5", score: "4", confidence: "0.92", date: "March 1 2025" },
  ]);

  // Function to append new data
  const addProductData = (newProduct) => {
    setProductData((prevData) => [...prevData, newProduct]);
  };

  return (
    <ProductDataContext.Provider value={{ productData, addProductData }}>
      {children}
    </ProductDataContext.Provider>
  );
};
