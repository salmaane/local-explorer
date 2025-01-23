import { Navigation } from 'lucide-react';
import { Loader2 } from "lucide-react";
import { Skeleton } from './ui/skeleton';

const Header = ({temperature, icon} : {temperature: number, icon: string}) => {
    return (
        <>
            <div className="flex items-center mb-6">
                <div className="left-0 flex items-center gap-2 bg-gray-800/50 backdrop-blur-md p-2 rounded-lg border border-gray-700/30 shadow-lg">
                    {temperature ?
                    <>
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} className='w-8'/>
                        <span>{(temperature - 273.15).toFixed(0)} °C</span>
                    </> : 
                    <>
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <Skeleton className="h-[25px] w-[45px] rounded-xl bg-gray-600" />
                    </>
                    }
                </div>

                <div className="flex items-center gap-2 mx-auto">
                    <Navigation className="w-7 h-7 text-blue-400" />
                    <h1 className="text-2xl font-bold text-blue-400">Local Explorer</h1>
                </div>
            </div>
        </>
    );
}

export default Header;