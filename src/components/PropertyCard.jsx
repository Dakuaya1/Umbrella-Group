import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Bed, Bath, Car, Square, MapPin, Check, Star } from 'lucide-react';

export function PropertyCard({ p, wide = false, onClick, yieldBadge = false, savedIds = [], onSaveToggle }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isSaved = savedIds.includes(p.id);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <motion.div 
      className={`property-card ${wide ? 'wide' : ''}`}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onClick}
    >
      <div className="card-image-wrapper">
        <img src={p.img} alt={p.title} className="card-img" />
        <div 
          className="gradient-overlay" 
          style={{ 
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(201,168,76,0.15), transparent 60%)` 
          }} 
        />
        <button 
          className="save-btn"
          onClick={(e) => { e.stopPropagation(); if(onSaveToggle) onSaveToggle(p.id); }}
        >
          <Heart size={20} fill={isSaved ? "var(--gold)" : "none"} color={isSaved ? "var(--gold)" : "white"} />
        </button>
        {p.tags.includes('featured') && <div className="tag featured">Featured</div>}
        {p.tags.includes('premium') && <div className="tag premium">Premium</div>}
        {p.tags.includes('hot') && <div className="tag hot">Hot</div>}
        {p.tags.includes('new') && <div className="tag new">New</div>}
        {yieldBadge && (
          <div className="yield-badge">
            <Star size={14} fill="var(--gold)" color="var(--gold)" />
            <span>{p.yield}% yield</span>
          </div>
        )}
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{p.title}</h3>
          <div className="card-price">
            {p.price}<span className="price-sub">{p.priceSub}</span>
          </div>
        </div>
        
        <div className="card-location">
          <MapPin size={14} color="var(--text3)" />
          <span>{p.loc}</span>
        </div>
        
        <div className="card-features">
          {p.bhk > 0 && (
            <div className="feature">
              <Bed size={16} color="var(--text3)" />
              <span>{p.bhk} BHK</span>
            </div>
          )}
          <div className="feature">
            <Square size={16} color="var(--text3)" />
            <span>{p.sqft} sq.ft</span>
          </div>
          {p.type === 'buy' && (
            <div className="feature">
              <Check size={16} color="var(--gold)" />
              <span>Ready to Move</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function PropertyRow({ title, properties, onSelect, yieldBadge = false, savedIds, onSaveToggle }) {
  return (
    <div className="property-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="property-row">
        {properties.map(p => (
          <PropertyCard 
            key={p.id} 
            p={p} 
            onClick={() => onSelect(p)}
            yieldBadge={yieldBadge}
            savedIds={savedIds}
            onSaveToggle={onSaveToggle}
          />
        ))}
      </div>
    </div>
  );
}
