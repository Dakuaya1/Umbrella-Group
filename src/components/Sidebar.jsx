import React from 'react';
import {
  Home, Compass, Key, Building, Heart, GitCompare, MessageSquare,
  MoreHorizontal, Layers, Sparkles
} from 'lucide-react';

function Sidebar({ activeTab, setActiveTab, savedCount }) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'swipe', icon: Layers, label: 'Swipe Mode' },
    { id: 'rent', icon: Key, label: 'Rent' },
    { id: 'projects', icon: Building, label: 'Projects' },
    { id: 'saved', icon: Heart, label: 'Saved', badge: savedCount },
    { id: 'compare', icon: GitCompare, label: 'Compare' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'more', icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <div className="sidebar">
      <div className="brand" onClick={() => setActiveTab('home')}>
        <div className="brand-icon">
          <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 16 Q14 6 21 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="14" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="brand-text">UMBRELLA</div>
      </div>

      <div className="nav-menu">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id || (item.id === 'swipe' && activeTab === 'swipe-virtual') ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="nav-item-left">
              <item.icon className="nav-icon" />
              <span style={item.id === 'swipe' ? { color: 'var(--gold)', fontWeight: 600 } : {}}>{item.label}</span>
            </div>
            {item.badge > 0 && (
              <span style={{ background: 'var(--gold)', color: '#000', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '10px' }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="ai-sidebar-btn" onClick={() => setActiveTab('chat')}>
        <Sparkles size={20} />
        <span style={{ fontWeight: 500, fontSize: '13px' }}>AI Assisting</span>
      </div>
    </div>
  );
}

export default Sidebar;