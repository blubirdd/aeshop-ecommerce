import React from 'react';
import Item from '../product/Item';

function SearchResults({ searchResults }) {
  return (
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {searchResults.map((item) => {
          return <Item key={item.id} {...item} />;
        })}
      </div>
  );
}

export default SearchResults;
