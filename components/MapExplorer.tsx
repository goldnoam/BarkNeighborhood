
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, Loader2, Star, ExternalLink } from 'lucide-react';
import { searchDogLocations } from '../services/geminiService';

const MapExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.log("Geolocation error:", err)
    );
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const data = await searchDogLocations(query, coords?.lat, coords?.lng);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickFilters = [
    "גינת כלבים קרובה",
    "וטרינר חירום",
    "חנות חיות",
    "גינת שעשועים"
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <MapPin className="text-orange-500" />
          חיפוש מקומות בשכונה
        </h2>
        
        <form onSubmit={handleSearch} className="relative mb-4">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חפש גינות, חנויות או שירותים..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => { setQuery(filter); }}
              className="text-xs bg-slate-100 hover:bg-orange-100 hover:text-orange-600 px-3 py-1.5 rounded-full transition-colors text-slate-600"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {!results && !isLoading && (
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
            <div className="bg-orange-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="text-orange-600 w-8 h-8" />
            </div>
            <p className="text-orange-800 font-medium">הזן חיפוש כדי למצוא מקומות ידידותיים לכלבים סביבך</p>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            <p className="text-slate-500 text-sm animate-pulse">מנתח את מפת השכונה בשבילך...</p>
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
               <p className="text-sm text-slate-700 leading-relaxed mb-4">{results.text}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {results.locations.map((loc: any, idx: number) => (
                <a 
                  key={idx} 
                  href={loc.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-orange-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                        {loc.title}
                      </h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] text-slate-400 font-medium">מקודם בשכונה</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapExplorer;
