import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation, useScroll } from 'framer-motion';
import { 
  Home, Compass, Key, Building, Heart, GitCompare, MessageSquare, 
  MoreHorizontal, Search, Bell, SlidersHorizontal, Layers,
  X, Sparkles, Check, ArrowLeft, Phone, Mail, Calendar, Share2, Shield, MapPin, Bed, Bath, Car, Square
} from 'lucide-react';

// Import modular components
import { PROPS } from './data/properties';
import { PropertyCard } from './components/PropertyCard';
import { HomePage } from './components/HomePage';
import { SavedPage, ComparePage } from './components/SavedCompare';
import { ChatPage } from './components/ChatPage';

// --- LAYOUT COMPONENTS (Sidebar, TopHeader) ---
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
