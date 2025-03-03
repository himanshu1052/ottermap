import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ firstName }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
      <div className="w-1/3">
        <Link to="/" className="text-blue-500 hover:underline font-medium">
          ← Back
        </Link>
      </div>
      <div className="w-1/3 text-center">
        <h2 className="text-xl font-semibold text-gray-800">Welcome, {firstName}</h2>
      </div>
      <div className="w-1/3">
       
      </div>
    </header>
  );
};

export default Header;