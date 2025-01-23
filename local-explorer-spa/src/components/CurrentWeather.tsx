import { Skeleton } from "./ui/skeleton";

const CurrentWeather = ( {weather} : {weather: weather}) => {
    return (
        <>
            <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-4 mb-6 border border-gray-700/30 shadow-lg">
                <h2 className="text-lg font-bold mb-2">Current Conditions</h2>
                {weather ? 
                <div className="flex items-center gap-4">
                    <img src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`} className='w-16'/> 
                    <div>
                        <p className="text-2xl">{weather?.main}</p>
                        <p className="text-gray-400">{weather?.description}</p>
                    </div>
                </div>
                : 
                <div className="flex gap-2 justify-start">
                    <Skeleton className="h-[70px] w-[70px] rounded-md bg-gray-600" />
                    <div className="flex flex-col gap-2 items-baseline">
                        <Skeleton className="h-[20px] w-[90px] rounded-sm bg-gray-600" />
                        <Skeleton className="h-[15px] w-[100px] rounded-sm bg-gray-600" />
                    </div>
                </div>
                }
            </div>
        </>
    );
}

type weather = {
    id: number,
    main: string,
    description: string,
    icon: string
}

export default CurrentWeather;