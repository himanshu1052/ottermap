import React, { useState, useEffect, useRef } from 'react';
import OLMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Draw, Modify } from 'ol/interaction';
import { Fill, Stroke, Style } from 'ol/style';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';

const MapComponent = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [map, setMap] = useState(null);
  const [vectorSource, setVectorSource] = useState(new VectorSource());
  const drawInteractionRef = useRef(null);
  const modifyInteractionRef = useRef(null);

  useEffect(() => {
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({ color: 'rgba(255, 165, 0, 0.5)' }),
        stroke: new Stroke({ color: '#ff5500', width: 2 }),
      }),
    });

    const newMap = new OLMap({
      target: 'map',
      layers: [rasterLayer, vectorLayer],
      view: new View({ center: [0, 0], zoom: 2 }),
      controls: [] // Remove all default controls
    });

    setMap(newMap);
    setVectorSource(vectorSource);

    return () => newMap.setTarget(null);
  }, []);

  const handleDrawPolygon = () => {
    if (modifyInteractionRef.current) map.removeInteraction(modifyInteractionRef.current);
    if (activeButton === 'draw') {
      setActiveButton(null);
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
        drawInteractionRef.current = null;
      }
      return;
    }
    setActiveButton('draw');
    drawInteractionRef.current = new Draw({ source: vectorSource, type: 'Polygon' });
    map.addInteraction(drawInteractionRef.current);
  };

  const handleEditPolygon = () => {
    if (drawInteractionRef.current) map.removeInteraction(drawInteractionRef.current);
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

  const handleDeletePolygons = () => vectorSource.clear();

  const handleZoomIn = () => map.getView().setZoom(map.getView().getZoom() + 1);
  const handleZoomOut = () => map.getView().setZoom(map.getView().getZoom() - 1);

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex p-2 bg-gray-100 border-b border-gray-200 z-10">
        <button className="px-4 py-2 mr-2 bg-purple-500 text-white rounded-md" onClick={handleDrawPolygon}>Draw</button>
        <button className="px-4 py-2 mr-2 bg-purple-500 text-white rounded-md" onClick={handleEditPolygon}>Edit</button>
        <button className="px-4 py-2 bg-pink-500 text-white rounded-md" onClick={handleDeletePolygons}>Delete All</button>
        <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md" onClick={handleZoomIn}>Zoom In</button>
        <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md" onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <div id="map" className="flex-1 w-full h-full"></div>
      <div className="absolute bottom-0 w-full bg-gray-200 text-center p-2 text-sm">© OpenStreetMap contributors.</div>
    </div>
  );
};

export default MapComponent;