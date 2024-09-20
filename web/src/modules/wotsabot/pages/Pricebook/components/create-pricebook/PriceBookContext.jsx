import React, { createContext, useState } from 'react';

// Create the context
export const PriceBookContext = createContext();

// Create a provider component
export const PriceBookProvider = ({ children }) => {
  const [priceBookData, setPriceBookData] = useState([]);

  return (
    <PriceBookContext.Provider value={{ priceBookData, setPriceBookData }}>
      {children}
    </PriceBookContext.Provider>
  );
};
