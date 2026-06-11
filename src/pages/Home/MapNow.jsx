import React, { use, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { customMarker } from "../../utils/customMarker";
import { motion } from "framer-motion";
import Ptext from "../../utils/Ptext";

const data = fetch("/warehouse.json").then((res) => res.json());

const HomeMap = () => {
  const weaerhouse = use(data);
  const mapRef = useRef(null);

  const [darkMode, setDarkMode] = useState(false); // Changed to false for light mode default
  const [loading, setLoading] = useState(true);

  const centerBD = [23.685, 90.3563];

  // auto zoom on marker click
  const handleMarkerClick = (lat, lng) => {
    mapRef.current.flyTo([lat, lng], 10, {
      duration: 1.5,
    });
  };

  return (
    <section className="w-full">
      {/* Full width container */}
      <div className="w-full px-4 md:px-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl text-primary font-bold  mb-4">
            Bangladesh All Book Delivery Coverage Districts
          </h1>
           <Ptext>
             Our warehouses cover major districts across Bangladesh.
           </Ptext>
          
        </motion.div>

        {/* Map Card - Full Width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-700"
        >
         

          {/* Skeleton Loader */}
          {loading && (
            <div className="absolute inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-white text-lg font-semibold">Loading Map...</p>
              </div>
            </div>
          )}

          {/* Map Container - Full Width */}
          <div className="h-[500px] md:h-[700px] w-full">
            <MapContainer
              center={centerBD}
              zoom={8}
              minZoom={6}
              scrollWheelZoom={false}
              className="h-full w-full"
              whenReady={() => setLoading(false)}
              ref={mapRef}
            >
              {/* Tile Layer */}
              <TileLayer
                url={
                  darkMode
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
              />

              {/* Delivery Radius */}
              <Circle
                center={centerBD}
                radius={350000}
                pathOptions={{
                  color: darkMode ? "#16a34a" : "#059669",
                  fillColor: darkMode ? "#22c55e" : "#10b981",
                  fillOpacity: darkMode ? 0.08 : 0.12,
                }}
              />

              {/* Markers */}
              <MarkerClusterGroup chunkedLoading>
                {weaerhouse?.map((item) => (
                  <Marker
                    key={item.district}
                    position={[item.latitude, item.longitude]}
                    icon={customMarker}
                    eventHandlers={{
                      click: () =>
                        handleMarkerClick(item.latitude, item.longitude),
                      mouseover: (e) => e.target.openPopup(),
                    }}
                  >
                    <Popup>
                      <div className="text-sm space-y-1 p-2">
                        <p className="font-bold text-lg text-gray-800">{item.district}</p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Areas:</span> {item.covered_area.join(", ")}
                        </p>
                        <p
                          className={`font-semibold ${
                            item.status ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          Status: {item.status ? "✓ Open" : "✗ Closed"}
                        </p>
                        {item.flowchart && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="font-semibold text-xs text-gray-500 mb-1">Workflow:</p>
                            <img 
                              src={item.flowchart} 
                              alt="Flowchart" 
                              className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-90"
                              onClick={() => window.open(item.flowchart, '_blank')}
                            />
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeMap;