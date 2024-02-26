import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import SearchResults from '../../components/product/SearchResults';
function SearchResultsPage() {
  const { products } = useContext(ShopContext);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [products, searchQuery]);
  

  return (
    <div className="mx-8">
      <p className="pt-4 font-bold text-2xl">Search Results for "{searchQuery}"</p>
      <p className="py-2">Showing {searchResults.length} of {searchResults.length} items</p>
      <SearchResults searchResults={searchResults} />
    </div>
  );
}

export default SearchResultsPage;
