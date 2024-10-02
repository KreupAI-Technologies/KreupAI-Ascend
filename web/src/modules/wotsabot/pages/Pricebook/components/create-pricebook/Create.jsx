import React, { createContext, useState } from 'react';
import Header from './Header';
import PageContent from './PageContent';

// Create a Context to store the price book data
export const PriceBookContext = createContext();

const Create = () => {
  const [priceBookData, setPriceBookData] = useState(null); // State to store price book data

  return (
    <PriceBookContext.Provider value={{ priceBookData, setPriceBookData }}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <PageContent />
      </div>
    </PriceBookContext.Provider>
  );
};

export default Create;
