
import React, { useState } from 'react';
import Layout from './components/Layout';
import Feed from './components/Feed';
import MapExplorer from './components/MapExplorer';
import StoreDirectory from './components/StoreDirectory';
import { Tab } from './types';
import { Lang } from './translations';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.FEED);
  const [lang, setLang] = useState<Lang>('he');
  const [fontSize, setFontSize] = useState<'s' | 'm' | 'l'>('m');

  const renderContent = () => {
    switch (activeTab) {
      case Tab.FEED: return <Feed lang={lang} />;
      case Tab.MAP: return <MapExplorer lang={lang} />;
      case Tab.STORES: return <StoreDirectory lang={lang} />;
      default: return <Feed lang={lang} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      lang={lang} 
      setLang={setLang}
      fontSize={fontSize}
      setFontSize={setFontSize}
    >
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
