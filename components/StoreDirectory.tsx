
import React, { useState, useMemo } from 'react';
import { ShoppingBag, Tag, Star, ArrowRight, Calendar, Clock, CheckCircle2, User, Filter, SortAsc, ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilitySlot {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

interface Walker {
  id: string;
  name: string;
  services: string[];
  availability: string;
  schedule: Record<string, AvailabilitySlot>;
  rating: number;
  price: string;
  image: string;
}

const DAYS_HE = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];
const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WALKERS_DATA: Walker[] = [
  {
    id: 'w1',
    name: 'נועה ברק',
    services: ['טיולים ארוכים', 'פנסיון ביתי'],
    availability: 'בקרים וערבים',
    schedule: {
      '0': { morning: true, afternoon: false, evening: true },
      '1': { morning: true, afternoon: false, evening: true },
      '2': { morning: false, afternoon: false, evening: true },
      '3': { morning: true, afternoon: true, evening: true },
      '4': { morning: true, afternoon: false, evening: true },
      '5': { morning: true, afternoon: false, evening: false },
      '6': { morning: false, afternoon: false, evening: false },
    },
    rating: 5.0,
    price: '₪50',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'w2',
    name: 'עידו לוי',
    services: ['ריצה עם כלבים', 'אילוף בסיסי'],
    availability: 'זמין עכשיו',
    schedule: {
      '0': { morning: false, afternoon: true, evening: true },
      '1': { morning: false, afternoon: true, evening: true },
      '2': { morning: true, afternoon: true, evening: true },
      '3': { morning: false, afternoon: true, evening: true },
      '4': { morning: true, afternoon: true, evening: true },
      '5': { morning: true, afternoon: true, evening: false },
      '6': { morning: true, afternoon: false, evening: false },
    },
    rating: 4.7,
    price: '₪70',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

const STORES = [
  { id: '1', name: 'כלב וחתול בשכונה', type: 'חנות מזון וציוד', rating: 4.8, distance: '300 מ׳', image: 'https://picsum.photos/seed/store1/400/300' },
  { id: '2', name: 'פט-סנטר המרכזי', type: 'מספרה וחנות', rating: 4.5, distance: '850 מ׳', image: 'https://picsum.photos/seed/store2/400/300' },
  { id: '3', name: 'וטרינר ד״ר רותם', type: 'מרפאה וטרינרית', rating: 4.9, distance: '1.2 ק״מ', image: 'https://picsum.photos/seed/vet1/400/300' },
];

const CATEGORIES = [
  { id: 'all', label: 'הכל' },
  { id: 'food', label: 'חנות מזון', keyword: 'מזון' },
  { id: 'grooming', label: 'מספרה', keyword: 'מספרה' },
  { id: 'vet', label: 'וטרינר', keyword: 'וטרינר' },
];

const AvailabilityCalendar: React.FC<{ schedule: Record<string, AvailabilitySlot> }> = ({ schedule }) => {
  return (
    <div className="mt-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          לו״ז זמינות שבועי
        </h5>
      </div>
      <div className="flex justify-between gap-1">
        {DAYS_HE.map((day, index) => {
          const daySchedule = schedule[index.toString()];
          return (
            <div key={index} className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">{day}</span>
              <div className="flex flex-col gap-1 w-full">
                <div 
                  title="בוקר"
                  className={`h-1.5 w-full rounded-full transition-colors ${daySchedule?.morning ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-slate-200 dark:bg-slate-700'}`} 
                />
                <div 
                  title="צהריים"
                  className={`h-1.5 w-full rounded-full transition-colors ${daySchedule?.afternoon ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-slate-200 dark:bg-slate-700'}`} 
                />
                <div 
                  title="ערב"
                  className={`h-1.5 w-full rounded-full transition-colors ${daySchedule?.evening ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-slate-200 dark:bg-slate-700'}`} 
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-4 justify-center items-center">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[8px] text-slate-400">זמין</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
          <span className="text-[8px] text-slate-400">תפוס</span>
        </div>
      </div>
    </div>
  );
};

const StoreDirectory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortByRating, setSortByRating] = useState(false);

  const handleBooking = (name: string) => {
    alert(`מתחיל תהליך הזמנה עבור ${name}. הודעה תישלח אליהם בקרוב!`);
  };

  const sortedWalkers = useMemo(() => {
    const data = [...WALKERS_DATA];
    if (sortByRating) {
      data.sort((a, b) => b.rating - a.rating);
    }
    return data;
  }, [sortByRating]);

  const filteredStores = STORES.filter(store => {
    if (activeFilter === 'all') return true;
    const category = CATEGORIES.find(c => c.id === activeFilter);
    return category && store.type.includes(category.keyword || '');
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Featured Ad Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="relative z-10">
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">בחסות</span>
          <h2 className="text-2xl font-bold mt-2">15% הנחה על כל חטיפי הבריאות!</h2>
          <p className="text-indigo-100 text-sm mt-2 opacity-90">בלעדי לחברי נביחת השכונה בשימוש בקוד BARK15</p>
          <button className="mt-4 bg-white text-indigo-600 font-bold px-6 py-2 rounded-full text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2">
            לקנייה עכשיו
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
      </section>

      {/* Dog Walkers Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
            <User className="text-emerald-500 w-5 h-5" />
            דוג-ווקרים בשכונה
          </h3>
          <button 
            onClick={() => setSortByRating(!sortByRating)}
            className={`flex items-center gap-1 text-xs font-bold transition-colors ${sortByRating ? 'text-orange-500' : 'text-slate-500 hover:text-emerald-600'}`}
          >
            <SortAsc className="w-3.5 h-3.5" />
            {sortByRating ? 'ממוין לפי דירוג' : 'מיין לפי דירוג'}
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
          {sortedWalkers.map((walker) => (
            <div key={walker.id} className="min-w-[300px] bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all">
              <div className="flex gap-3 items-center mb-3">
                <img src={walker.image} className="w-14 h-14 rounded-full object-cover border-2 border-emerald-50 dark:border-emerald-900 shadow-sm" alt={walker.name} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">{walker.name}</h4>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">{walker.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 mt-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-semibold">{walker.availability}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1.5 mb-2">
                {walker.services.map((service, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {service}
                  </div>
                ))}
              </div>

              {/* Availability Calendar Component */}
              <AvailabilityCalendar schedule={walker.schedule} />

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">החל מ-</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{walker.price}/שעה</span>
                </div>
                <button 
                  onClick={() => handleBooking(walker.name)}
                  className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm shadow-emerald-100 dark:shadow-none"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  הזמן עכשיו
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Store List */}
      <section>
        <div className="flex flex-col gap-4 mb-4 px-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
              <ShoppingBag className="text-orange-500 w-5 h-5" />
              חנויות ומרפאות
            </h3>
          </div>
          
          {/* Filtering Chips */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full flex gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeFilter === cat.id 
                      ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-1 text-slate-400">
              <Filter className="w-3 h-3" />
              <span className="text-[10px] font-medium uppercase tracking-tight">סינון</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <div key={store.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4 hover:shadow-md transition-shadow group">
                <img src={store.image} className="w-24 h-24 rounded-xl object-cover" alt={store.name} />
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">{store.name}</h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{store.type}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded text-amber-700 dark:text-amber-400">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold">{store.rating}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{store.distance} ממך</span>
                    <button className="text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center gap-1 hover:underline">
                      לפרטים
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-sm">לא נמצאו עסקים בקטגוריה זו בשכונה.</p>
            </div>
          )}
        </div>
      </section>

      {/* Banner Ad */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-2xl p-4 flex items-center gap-4">
        <div className="bg-amber-200 dark:bg-amber-800/40 p-3 rounded-full text-amber-700 dark:text-amber-400">
          <Tag className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 dark:text-amber-100 text-sm">מבצעי סופ״ש בחנות המרכזית</h4>
          <p className="text-xs text-amber-700 dark:text-amber-400">קנו שק אוכל וקבלו צעצוע לעיסה במתנה!</p>
        </div>
      </div>
    </div>
  );
};

export default StoreDirectory;
