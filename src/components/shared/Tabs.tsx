'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

export function Tabs({ tabs, defaultTab, onChange, variant = 'underline' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const getTabStyles = (isActive: boolean) => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-100';
      case 'underline':
        return isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-600 hover:text-gray-800';
      default:
        return isActive
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-600 hover:text-gray-800';
    }
  };

  return (
    <div>
      <div className={`flex ${variant === 'pills' ? 'gap-2' : ''} border-b`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 ${getTabStyles(
              activeTab === tab.id
            )}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

