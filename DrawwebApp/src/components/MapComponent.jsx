import React, { useState, useEffect, useRef } from 'react';
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
  const drawInteractionRef = useRef(null);
  const modifyInteractionRef = useRef(null);
  const selectInteractionRef = useRef(null);

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
    // Clear any existing interactions
    if (modifyInteractionRef.current) {
      map.removeInteraction(modifyInteractionRef.current);
    }
    if (selectInteractionRef.current) {
      map.removeInteraction(selectInteractionRef.current);
    }
    
    if (activeButton === 'draw') {
      setActiveButton(null);
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
        drawInteractionRef.current = null;
      }
      return;
    }
    
    setActiveButton('draw');
    drawInteractionRef.current = new Draw({
      source: vectorSource,
      type: 'Polygon',
    });
    map.addInteraction(drawInteractionRef.current);
  };

  const handleEditPolygon = () => {
    // Clear any existing interactions
    if (drawInteractionRef.current) {
      map.removeInteraction(drawInteractionRef.current);
    }
    if (selectInteractionRef.current) {
      map.removeInteraction(selectInteractionRef.current);
    }
    
    if (activeButton === 'edit') {
      setActiveButton(null);
      if (modifyInteractionRef.current) {
        map.removeInteraction(modifyInteractionRef.current);
        modifyInteractionRef.current = null;
      }
      return;
    }
    
    setActiveButton('edit');
    modifyInteractionRef.current = new Modify({ source: vectorSource });
    map.addInteraction(modifyInteractionRef.current);
  };

  const handleDeletePolygons = () => {
    vectorSource.clear();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex p-2 bg-gray-100 border-b border-gray-200">
        <button
          className={`px-4 py-2 mr-2 text-sm font-medium rounded-md transition duration-200 hover:bg-purple-500 hover:text-white ${
            activeButton === 'draw'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'
          }`}
          onClick={handleDrawPolygon}
        >
          Draw Polygon
        </button>
        <button
          className={`px-4 py-2 mr-2 text-sm font-medium rounded-md transition duration-200 hover:bg-purple-500 hover:text-white ${
            activeButton === 'edit'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'
          }`}
          onClick={handleEditPolygon}
        >
          Edit Polygon
        </button>
        <button
          className="px-4 py-2 text-sm font-medium bg-white text-pink-500 border border-pink-300 rounded-md hover:bg-pink-500 hover:text-white transition duration-200"
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
      ></div>
    </div>
  );
};

export default MapComponent;