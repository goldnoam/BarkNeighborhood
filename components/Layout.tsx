
import React, { useState, useEffect } from 'react';
import { Home, Map as MapIcon, ShoppingBag, Dog, Type, Globe, Volume2 } from 'lucide-react';
import { Tab } from '../types';
import { translations, Lang } from '../translations';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  fontSize: 's' | 'm' | 'l';
  setFontSize: (s: 's' | 'm' | 'l') => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, activeTab, setActiveTab, lang, setLang, fontSize, setFontSize 
}) => {
  const t = translations[lang];
  const isRtl = lang === 'he';

  const navItems = [
    { id: Tab.FEED, icon: Home, label: t.feed },
    { id: Tab.MAP, icon: MapIcon, label: t.map },
    { id: Tab.STORES, icon: ShoppingBag, label: t.stores },
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'he' ? 'he-IL' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.className = `bg-slate-50 font-assistant font-size-${fontSize}`;
  }, [lang, fontSize, isRtl]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg shadow-sm">
              <Dog className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              {t.appTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Accessibility Bar */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button onClick={() => setFontSize('s')} className={`btn-accessibility ${fontSize === 's' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500'}`} aria-label="Small font">A</button>
              <button onClick={() => setFontSize('m')} className={`btn-accessibility ${fontSize === 'm' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500'}`} aria-label="Medium font">A+</button>
              <button onClick={() => setFontSize('l')} className={`btn-accessibility ${fontSize === 'l' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500'}`} aria-label="Large font">A++</button>
            </div>
            
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Lang)}
              className="bg-white border border-slate-200 rounded-lg text-xs p-2 focus:ring-2 focus:ring-orange-500 outline-none"
              aria-label={t.language}
            >
              <option value="he">🇮🇱 עברית</option>
              <option value="en">🇺🇸 English</option>
              <option value="zh">🇨🇳 中文</option>
              <option value="hi">🇮🇳 हिन्दी</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
            </select>

            <button 
              className="p-2 text-slate-400 hover:text-orange-500" 
              onClick={() => speak(t.appTitle)}
              aria-label="Speak title"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Accessibility Bar */}
      <div className="md:hidden flex justify-center gap-4 py-2 bg-slate-100 border-b border-slate-200">
        <div className="flex gap-1 items-center">
          <Type className="w-4 h-4 text-slate-400" />
          <button onClick={() => setFontSize('s')} className="px-3 py-1 text-xs">A</button>
          <button onClick={() => setFontSize('m')} className="px-3 py-1 text-xs font-bold">A</button>
          <button onClick={() => setFontSize('l')} className="px-3 py-1 text-sm font-black">A</button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-24 max-w-2xl mx-auto w-full px-4 pt-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:max-w-md md:mx-auto md:mb-4 md:rounded-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                speak(item.label);
              }}
              className={`nav-item ${isActive ? 'text-orange-600 bg-orange-50' : 'text-slate-400 hover:text-slate-600'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-8 px-4 text-center text-sm">
        <p>&copy; Noam Gold AI 2026</p>
        <p className="mt-1">
          <a href="mailto:goldnoamai@gmail.com" className="hover:text-white underline">Send Feedback: goldnoamai@gmail.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
