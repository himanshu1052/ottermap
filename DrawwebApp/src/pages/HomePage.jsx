import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);  // This updates the search query state
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Ottermap Frontend Task</h1>
      <p className="text-center text-gray-600 mb-8">Please enter your details to continue</p>
      
     
      <input
        type="text"
        id="searchQuery"
        name="searchQuery"
        value={searchQuery}
        placeholder='Enter Any Name or No to search'
        onChange={handleSearchChange} 
        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 mb-4"
      />
      
 
      <SearchForm />
    </div>
  );
};

export default HomePage;
