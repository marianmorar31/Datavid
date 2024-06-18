import React from 'react';

const SearchComponent = ({ searchTerm, onSearch }) => {
  return (
    <div className="max-w-md mx-auto p-4 pt-6 border border-black rounded-lg">
      <input
        type="search"
        value={searchTerm}
        onChange={onSearch}
        placeholder="Search by name, country, or city"
        className="w-full p-2 pl-10 text-lg text-gray-700 bg-white rounded-lg outline-none border-none"
      />
    </div>
  );
};

export default SearchComponent;
