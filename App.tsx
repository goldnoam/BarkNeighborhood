
import React, { useState } from 'react';
import Layout from './components/Layout';
import Feed from './components/Feed';
import MapExplorer from './components/MapExplorer';
import StoreDirectory from './components/StoreDirectory';
import AiAssistant from './components/AiAssistant';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.FEED);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.FEED:
        return <Feed />;
      case Tab.MAP:
        return <MapExplorer />;
      case Tab.STORES:
        return <StoreDirectory />;
      case Tab.AI:
        return <AiAssistant />;
      default:
        return <Feed />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
