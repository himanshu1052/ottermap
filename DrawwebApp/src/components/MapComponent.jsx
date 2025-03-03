import React, { useState, useEffect } from 'react';
import OLMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Draw, Modify, Select } from 'ol/interaction';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Feature } from 'ol';
import Polygon from 'ol/geom/Polygon';

const MapComponent = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [map, setMap] = useState(null);
  const [vectorSource, setVectorSource] = useState(new VectorSource());

  useEffect(() => {
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 165, 0, 0.5)',
        }),
        stroke: new Stroke({
          color: '#ff5500',
          width: 2,
        }),
      }),
    });

    const newMap = new OLMap({
      target: 'map',
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    setMap(newMap);
    setVectorSource(vectorSource);

    return () => {
      if (newMap) {
        newMap.setTarget(null); 
      }
    };
  }, []);

  const handleDrawPolygon = () => {
    if (activeButton === 'draw') {
      setActiveButton(null);
      map.removeInteraction(drawInteraction); 
      return;
    }
    setActiveButton('draw');
    const drawInteraction = new Draw({
      source: vectorSource,
      type: 'Polygon',
    });
    map.addInteraction(drawInteraction);
  };

  const handleEditPolygon = () => {
    if (activeButton === 'edit') {
      setActiveButton(null);
      map.removeInteraction(modifyInteraction); // Remove modify interaction
      return;
    }
    setActiveButton('edit');
    const modifyInteraction = new Modify({ source: vectorSource });
    map.addInteraction(modifyInteraction);
  };

  const handleDeletePolygons = () => {
    vectorSource.clear(); 
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex p-2 bg-gray-100 border-b border-gray-200">
        <button
          className={`px-4 py-2 mr-2 text-sm font-medium rounded-md transition duration-200 ${
            activeButton === 'draw'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          onClick={handleDrawPolygon}
        >
          Draw Polygon
        </button>
        <button
          className={`px-4 py-2 mr-2 text-sm font-medium rounded-md transition duration-200 ${
            activeButton === 'edit'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          onClick={handleEditPolygon}
        >
          Edit Polygon
        </button>
        <button
          className="px-4 py-2 text-sm font-medium bg-white text-red-500 border border-red-300 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
          onClick={handleDeletePolygons}
        >
          Delete All
        </button>
      </div>
      <div
        id="map"
        className="flex-1 w-full h-full"
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'white', 
        }}
      >
       
      </div>
    </div>
  );
};

export default MapComponent;
