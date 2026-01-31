
import React from 'react';
import { Home, Map as MapIcon, ShoppingBag, MessageCircle, Dog } from 'lucide-react';
import { Tab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: Tab.FEED, icon: Home, label: 'פיד' },
    { id: Tab.MAP, icon: MapIcon, label: 'מפה' },
    { id: Tab.STORES, icon: ShoppingBag, label: 'חנויות' },
    { id: Tab.AI, icon: MessageCircle, label: 'מומחה' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <Dog className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            נביחת השכונה
          </h1>
        </div>
        <button className="bg-orange-100 p-2 rounded-full hover:bg-orange-200 transition-colors">
          <Dog className="w-5 h-5 text-orange-600" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-12 max-w-2xl mx-auto w-full px-4 pt-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-6 py-2 flex justify-around items-center shadow-lg md:max-w-md md:mx-auto md:mb-4 md:rounded-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 px-4 py-1 rounded-2xl ${
                isActive ? 'text-orange-600 bg-orange-50' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
