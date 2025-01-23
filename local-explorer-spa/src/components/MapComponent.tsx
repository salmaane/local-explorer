import { APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export type Location = {
  lat: number;
  lng: number;
}

const GoogleMapComponent = ({ selectedLocation } : {selectedLocation : Location | undefined}) => {

  const [mapCenter, setMapCenter] = useState({ lat: 33.5731, lng: -7.5898 }); // Default center
  const [mapZoom, setMapZoom] = useState<number>(12); // Default zoom

  useEffect(() => {
    if (selectedLocation) {
      setMapCenter(selectedLocation);
      setMapZoom(14);
    }
  }, [selectedLocation]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      <Map
        mapId="one"
        style={{ width: '100%', height: '400px' }}
        center={mapCenter}
        zoom={mapZoom}
        gestureHandling="greedy"
        onCenterChanged={(map) => setMapCenter(map.detail.center)}
        onZoomChanged={(map) => setMapZoom(map.detail.zoom)}
      >
        {selectedLocation && <AdvancedMarker position={selectedLocation} />}
      </Map>
    </APIProvider>
  );
};

export default GoogleMapComponent;