import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, MapPin, Tent, Landmark } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ActivitySugestions = ({setError, setSelectedLocation, setMapLoading} : any) => {

    const [activities, setActivities] = useState<Activity[]>();

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
  
            api.post('/api/suggestions/cohere', { lat, lon })
              .then((response) => {
                setActivities(response.data)
              })
              .catch((error) => {
                console.error('Error fetching activities data:', error);
                setError('Failed to fetch activities data.');
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
  
    const getActivityIcon = (type: Activity['category']) => {
      switch (type) {
        case 'outdoor':
          return (<Tent className="w-5 h-5"/>);
        case 'indoor':
          return (<Landmark className="w-5 h-5"/>);
        default:
          return (<Landmark className="w-5 h-5"/>);
      }
    };

    const handleActivityClick = async (location : string) => {
      setMapLoading(true);
      const coords = await geocodeLocation(location);

      if(coords) {
        setSelectedLocation(coords);
      }

      setMapLoading(false);
    }
  
    return (
        <>
          <h2 className="text-xl font-bold mb-4">Recommended Activities</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activities == undefined ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-md p-4 rounded-lg border border-gray-700/30 shadow-lg flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-3/4 rounded-sm bg-gray-600" />
                    <Skeleton className="h-6 w-6 rounded-sm bg-gray-600" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-sm bg-gray-600" />
                    <Skeleton className="h-4 w-2/3 rounded-sm bg-gray-600" />
                  </div>

                  <div className="flex gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4 rounded-sm bg-gray-600" />
                      <Skeleton className="h-4 w-16 rounded-sm bg-gray-600" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4 rounded-sm bg-gray-600" />
                      <Skeleton className="h-4 w-20 rounded-sm bg-gray-600" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              activities?.map((activity, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-md p-4 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer flex flex-col gap-2 justify-between border border-gray-700/30 shadow-lg"
                  onClick={() => handleActivityClick(activity.complete_location)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{activity.name}</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><span>{getActivityIcon(activity.category.toLowerCase())}</span></TooltipTrigger>
                        <TooltipContent>
                          <p>{activity.category}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>
                    <p>{activity.description}</p>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-400" />
                      {activity.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-red-500" />
                      {activity.location}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
    );
}

interface Activity {
    name: string,
    description: string,
    category: string,
    duration: string;
    location: string;
    weather_condition: string,
    complete_location: string
}

export const geocodeLocation = async (location: string): Promise<Location | null> => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location
    )}&key=${apiKey}`
  );
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return data.results[0].geometry.location;
  }
  return null;
};

export default ActivitySugestions;