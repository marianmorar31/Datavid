import React from 'react';

const SortComponent = ({ sortOrder, onSort }) => {
  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      <label htmlFor="sortOrder" className="text-gray-600 mr-2">
        Sort by birthday
      </label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={onSort}
        className="px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortComponent;
