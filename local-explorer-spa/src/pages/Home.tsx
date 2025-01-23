import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import ActivitySugestions from '../components/ActivitySuggestions';
import axios from 'axios';
import MapComponent, { Location } from '@/components/MapComponent';
import { Loader2 } from 'lucide-react';


const Home = () => {

  const [weather, setWeather] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [mapLoading, setMapLoading] = useState<boolean>(false);
  
  const api = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_EXPLORER_API,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          api.post('/api/weather', { lat, lon })
            .then((response) => {
              setWeather(response.data);
            })
            .catch((error) => {
              console.error('Error fetching weather data:', error);
              setError('Failed to fetch weather data.');
            });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setError('Failed to fetch your location. Please enable location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4">
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <Header temperature={weather?.main.temp} icon={weather?.weather[0].icon}/>

      <CurrentWeather weather={weather?.weather[0]}/>

      <ActivitySugestions setError={setError} setSelectedLocation={setSelectedLocation} setMapLoading={setMapLoading}/>

      <div className="mt-8 bg-gray-800/50 backdrop-blur-md rounded-lg p-4 border border-gray-700/30 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Explore the Map</h2>
        {mapLoading && (
          <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
        )}
      </div>
      <MapComponent selectedLocation={selectedLocation} />
    </div>

    </div>
  );
};

export default Home;