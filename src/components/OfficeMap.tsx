import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Ubicacion } from '../data/ubicanos_data';

interface OfficeMapProps {
  center: [number, number];
  zoom: number;
  locations: Ubicacion[];
  onLocationClick: (location: Ubicacion) => void;
}

const GoogleMarker = L.divIcon({
  className: 'custom-google-marker',
  html: '<div style="background-color:#EA4335;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

L.Marker.prototype.options.icon = GoogleMarker;

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 300);
    map.setView(center, zoom);
    return () => window.clearTimeout(timer);
  }, [center, zoom, map]);

  return null;
};

const OfficeMap: React.FC<OfficeMapProps> = ({ center, zoom, locations, onLocationClick }) => (
  <MapContainer center={center} zoom={zoom} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {locations.map((location, index) => (
      <Marker
        key={`${location.estado}-${index}`}
        position={[location.coords.lat, location.coords.lng]}
        eventHandlers={{ click: () => onLocationClick(location) }}
      >
        <Popup>
          <div className="p-1">
            <strong className="text-[#273376] block border-b mb-1 break-words">{location.estado}</strong>
            <span className="text-xs text-slate-600 break-words block">{location.correo}</span>
          </div>
        </Popup>
      </Marker>
    ))}
    <ChangeView center={center} zoom={zoom} />
  </MapContainer>
);

export default OfficeMap;