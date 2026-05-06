import React from 'react';
import { Search, Bell, SlidersHorizontal, X } from 'lucide-react';

function TopHeader({ searchQuery, onSearchChange }) {
  return (
    <div className="top-header">
      <div className="mobile-brand">
        <div className="brand-icon">
          <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 16 Q14 6 21 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="14" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="brand-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>UMBRELLA</div>
      </div>
      <div className="search-bar">
        <Search size={18} color="var(--text3)" />
        <input
          className="search-input"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <X
            size={18}
            color="var(--text3)"
            style={{ cursor: 'pointer' }}
            onClick={() => onSearchChange('')}
          />
        )}
        <SlidersHorizontal size={18} color="var(--gold)" style={{ cursor: 'pointer' }} />
      </div>
      <div className="header-actions">
        <div className="icon-btn">
          <Bell size={20} />
          <div className="badge"></div>
        </div>
        <img className="user-avatar" src="https://i.pravatar.cc/100?img=33" alt="Profile" />
      </div>
    </div>
  );
}

export default TopHeader;