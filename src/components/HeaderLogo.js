import { Globe2, MapPin, Search, Sparkles } from "lucide-react";

const Logo = () => {
    return (
        <div className="flex flex-col items-center justify-center relative">
        {/* Outer glowing effect */}
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-blue-300 opacity-30 blur-2xl animate-pulse"></div>
  
        {/* Logo container */}
        <div className="relative flex items-center justify-center p-4 bg-white shadow-xl rounded-full border border-gray-200">
          {/* Rotating globe */}
          <Globe2 className="w-14 h-14 text-blue-600 animate-spin-slow" />
  
          {/* Animated decorative icons */}
          <MapPin className="w-6 h-6 text-red-500 absolute -right-2 bottom-1 animate-bounce" />
          <Search className="w-5 h-5 text-green-600 absolute -left-3 top-0" />
          <Sparkles className="w-4 h-4 text-yellow-400 absolute right-0 top-1 animate-pulse" />
        </div>
  
        {/* Logo text */}
        <div className="mt-3 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            Geo Genius
          </h1>
          <p className="text-sm text-gray-600 mt-1">AI Travel Companion</p>
        </div>
      </div>
    );
  };
  
  export default Logo;
  