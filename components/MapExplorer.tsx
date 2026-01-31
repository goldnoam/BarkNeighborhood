
import React, { useState } from 'react';
import { Search, MapPin, Star, ShieldCheck, WifiOff, Info, Clock, CheckCircle2 } from 'lucide-react';
import { translations, Lang } from '../translations';

const MOCK_PLACES = [
  { id: 1, title: 'גינת כלבים הרצל', type: 'park', rating: 4.8, address: 'הרצל 45' },
  { id: 2, title: 'מרכז וטרינרי שכונתי', type: 'vet', rating: 4.9, address: 'בן גוריון 12' },
  { id: 3, title: 'גינת שעשועים הצפון', type: 'playground', rating: 4.2, address: 'הנביאים 5' },
  { id: 4, title: 'חנות חיות השכונה', type: 'food', rating: 4.7, address: 'ויצמן 10' },
  { id: 5, title: 'מספרת פאפיז', type: 'grooming', rating: 4.5, address: 'רוטשילד 22' },
];

const LAST_UPDATED = "12/05/2026, 09:45";

interface MapExplorerProps { lang: Lang; }

const MapExplorer: React.FC<MapExplorerProps> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const t = translations[lang];

  const filtered = MOCK_PLACES.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.address.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate stats for offline summary
  const categories = [...new Set(MOCK_PLACES.map(p => p.type))];
  
  return (
    <div className="space-y-4 pb-10">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
            <MapPin className="text-orange-500" />
            {t.map}
          </h2>
          
          {/* Enhanced Offline Status Badge */}
          <div 
            className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full cursor-help transition-all hover:bg-emerald-100 dark:hover:bg-emerald-500/20" 
            title={t.offlineMode}
            aria-label={t.offlineMode}
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap uppercase tracking-wider">
              {t.offlineMode}
            </span>
          </div>
        </div>

        {/* Detailed Offline Info Section */}
        <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-2 mb-2">
            <Info className="w-4 h-4 text-emerald-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {lang === 'he' ? 'מידע זמין במצב לא מקוון:' : 'Offline Data Available:'}
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'he' ? 'הנתונים הבאים נשמרו במכשירך לגישה מיידית.' : 'The following categories are stored on your device.'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map(cat => (
              <span key={cat} className="flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 text-[9px] font-bold text-slate-600 dark:text-slate-300 capitalize">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                {cat}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[9px] text-slate-400 dark:text-slate-500">
            <Clock className="w-3 h-3" />
            <span>
              {lang === 'he' ? 'סנכרון אחרון:' : 'Last Synced:'} {LAST_UPDATED}
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
            className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 ${lang === 'he' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all text-red-600 dark:text-red-500`}
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
            className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{loc.title}</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{loc.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 group-hover:bg-amber-50 dark:group-hover:bg-amber-500/10 px-2 py-1 rounded-lg transition-colors">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{loc.rating}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              {lang === 'he' ? `לא נמצאו מקומות עבור "${query}"` : `No places found for "${query}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapExplorer;
