
import React, { useState } from 'react';
import { Search, MapPin, Star, ShieldCheck, WifiOff } from 'lucide-react';
import { translations, Lang } from '../translations';

const MOCK_PLACES = [
  { id: 1, title: 'גינת כלבים הרצל', type: 'park', rating: 4.8, address: 'הרצל 45' },
  { id: 2, title: 'מרכז וטרינרי שכונתי', type: 'vet', rating: 4.9, address: 'בן גוריון 12' },
  { id: 3, title: 'גינת שעשועים הצפון', type: 'playground', rating: 4.2, address: 'הנביאים 5' },
  { id: 4, title: 'חנות חיות השכונה', type: 'food', rating: 4.7, address: 'ויצמן 10' },
  { id: 5, title: 'מספרת פאפיז', type: 'grooming', rating: 4.5, address: 'רוטשילד 22' },
];

interface MapExplorerProps { lang: Lang; }

const MapExplorer: React.FC<MapExplorerProps> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const t = translations[lang];

  const filtered = MOCK_PLACES.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MapPin className="text-orange-500" />
            {t.map}
          </h2>
          
          {/* Enhanced Offline Status Badge */}
          <div 
            className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full cursor-help transition-all hover:bg-emerald-100" 
            title={t.offlineMode}
            aria-label={t.offlineMode}
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 whitespace-nowrap uppercase tracking-wider">
              {t.offlineMode}
            </span>
          </div>
        </div>
        
        <div className="relative mb-2">
          <Search className={`absolute ${lang === 'he' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400`} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlace} 
            className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 ${lang === 'he' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
          />
        </div>
        <div className="flex items-center gap-1.5 px-1">
          <WifiOff className="w-3 h-3 text-slate-400" />
          <p className="text-[10px] text-slate-400 font-medium">
            {lang === 'he' ? 'נתוני מפה טעונים מקומית לגישה מהירה ללא אינטרנט' : 'Map data cached locally for offline access'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.length > 0 ? filtered.map((loc) => (
          <div 
            key={loc.id} 
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-orange-200 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors">{loc.title}</h4>
                <p className="text-[10px] text-slate-400">{loc.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 group-hover:bg-amber-50 px-2 py-1 rounded-lg transition-colors">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-slate-700">{loc.rating}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
            <p className="text-slate-400 text-sm">
              {lang === 'he' ? `לא נמצאו מקומות עבור "${query}"` : `No places found for "${query}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapExplorer;
