import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RouteMap = ({ itinerary }: { itinerary: any[] }) => {

    const locations = itinerary?.flatMap(day => day.plan).filter(place => place.geoCoordinates);

    if (!locations || locations.length === 0) return null;

    const centerPosition = [locations[0].geoCoordinates.lat, locations[0].geoCoordinates.lng];

    return (
        <div className="mt-12 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[450px] w-full relative z-0">
            <h3 className="text-2xl font-bold text-white mb-4 px-2">🗺️ Trip Route Map</h3>
            
            <MapContainer 
                center={[centerPosition[0], centerPosition[1]]} 
                zoom={10} 
                scrollWheelZoom={false} 
                className="h-full w-full rounded-2xl"
            >
                {/* OpenStreetMap Tiles (Free) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Markers Loop */}
                {locations.map((place: any, index: number) => (
                    <Marker 
                        key={index} 
                        position={[place.geoCoordinates.lat, place.geoCoordinates.lng]}
                    >
                        <Popup>
                            <div className="font-bold text-slate-900">{place.place}</div>
                            <div className="text-xs text-slate-600">{place.time}</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default RouteMap;