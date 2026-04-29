import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Layers, MapPin } from 'lucide-react';
import { PROPS } from '../data/properties';
import { PropertyCard } from './PropertyCard';

export function HomePage({ onSwipeOpen, onSelect, savedIds, onSaveToggle, searchQuery, onSearchChange }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 120 }
    }
  };

  const searchResults = PROPS.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {searchQuery ? (
        <motion.div variants={itemVariants} style={{ padding: '20px 0' }}>
          <div className="page-header">
            <h1 className="page-title">Search Results for "{searchQuery}"</h1>
            <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Found {searchResults.length} properties</p>
          </div>
          <div className="saved-grid">
            {searchResults.map(p => (
              <PropertyCard key={p.id} p={p} onClick={() => onSelect(p)} savedIds={savedIds} onSaveToggle={onSaveToggle} />
            ))}
          </div>
          {searchResults.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
              <Search size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p style={{ fontSize: '18px', color: 'var(--text)' }}>No properties match your search.</p>
              <p style={{ marginTop: '8px' }}>Try searching for a different location or property type.</p>
              
              <div style={{ marginTop: '32px' }}>
                <p style={{ fontSize: '13px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Popular Searches</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['Baner', 'Kharadi', 'Koregaon Park', '3 BHK', 'Under 50L'].map(term => (
                    <button 
                      key={term}
                      className="filter-pill"
                      onClick={() => onSearchChange(term)}
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <>
          <motion.div className="hero-banner" variants={itemVariants}>
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="hero-img" 
              src="https://images.unsplash.com/photo-1613490908575-9e6e165b4c1d?auto=format&fit=crop&w=1600&q=80" 
              alt="Luxury Home" 
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <motion.h1 
                className="hero-title"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                { "Find Your".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.03, duration: 0.5 }}
                  >
                    {char}
                  </motion.span>
                )) }
                <br/>
                <span>
                  { "Perfect Space".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.03, duration: 0.5 }}
                    >
                      {char}
                    </motion.span>
                  )) }
                </span>
              </motion.h1>
              <motion.p 
                className="hero-desc"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Premium properties. Trusted guidance.<br/>Better investments.
              </motion.p>
              <motion.div 
                className="hero-buttons"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <button className="btn-primary">Explore Properties</button>
                <button className="btn-ghost" onClick={onSwipeOpen} style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                  <Layers size={18} /> Swipe Rentals
                </button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="property-section">
              <div className="section-header">
                <h2 className="section-title">Top Picks For You</h2>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="property-row">
                {PROPS.slice(0, 4).map(p => (
                  <PropertyCard 
                    key={p.id} 
                    p={p} 
                    onClick={() => onSelect(p)}
                    savedIds={savedIds}
                    onSaveToggle={onSaveToggle}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="property-section">
              <div className="section-header">
                <h2 className="section-title">Under ₹50 Lakh</h2>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="property-row">
                {PROPS.filter(p => p.price.includes('L') && parseInt(p.price.replace('₹','').replace(' L','')) <= 50).map(p => (
                  <PropertyCard 
                    key={p.id} 
                    p={p} 
                    onClick={() => onSelect(p)}
                    savedIds={savedIds}
                    onSaveToggle={onSaveToggle}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="property-section">
              <div className="section-header">
                <h2 className="section-title">High Rental Yield</h2>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="property-row">
                {[...PROPS].sort((a,b) => b.yield - a.yield).slice(0, 4).map(p => (
                  <PropertyCard 
                    key={p.id} 
                    p={p} 
                    onClick={() => onSelect(p)}
                    yieldBadge={true}
                    savedIds={savedIds}
                    onSaveToggle={onSaveToggle}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="property-section">
              <div className="section-header">
                <h2 className="section-title">New This Week</h2>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="property-row">
                {PROPS.filter(p => p.tags.includes('new') || p.tags.includes('hot')).map(p => (
                  <PropertyCard 
                    key={p.id} 
                    p={p} 
                    onClick={() => onSelect(p)}
                    savedIds={savedIds}
                    onSaveToggle={onSaveToggle}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
