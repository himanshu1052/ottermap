import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const SearchForm = () => {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    mobileNumber: '',
    searchQuery: '', // Added search query state
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!formData.mobileNumber.trim()) {
      tempErrors.mobileNumber = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = 'Mobile number must be 10 digits';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setUserData(formData);
      navigate('/map');
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="mobileNumber" className="block text-gray-700 font-medium mb-2">
            Mobile Number
          </label>
          <div className="flex">
            <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
              <span className="mr-1">🇮🇳</span>
              <span className="text-gray-700 font-medium">+91</span>
            </div>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className={`flex-1 px-3 py-2 border rounded-r-md ${
                errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-purple-500`}
              placeholder="Enter your mobile number"
            />
          </div>
          {errors.mobileNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>
          )}
        </div>
         
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Continue to Map
        </button>
      </form>
    </div>
  );
};

export default SearchForm;