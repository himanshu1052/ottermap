import React from 'react';
import SearchForm from '../components/SearchForm';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Ottermap Frontend Task</h1>
      <p className="text-center text-gray-600 mb-8">Please enter your details to continue</p>
      <SearchForm />
    </div>
  );
};

export default HomePage;