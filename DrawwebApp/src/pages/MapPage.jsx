import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import MapComponent from '../components/MapComponent';

const MapPage = () => {
  const { userData } = useContext(UserContext);
  

  if (!userData.firstName) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header firstName={userData.firstName} />
      <div className="flex-1 relative">
        <MapComponent />
      </div>
    </div>
  );
};

export default MapPage;