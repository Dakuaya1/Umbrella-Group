import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

function PropertyCard({ p, wide = false, onClick, savedIds = [], onSaveToggle, yieldBadge = false }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isSaved = savedIds.includes(p.id);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      className={`prop-card ${wide ? 'prop-card-wide' : ''}`}
      whileHover={{ y: -10 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="prop-img-wrapper">
        <img src={p.img} className="prop-img" alt={p.title} loading="lazy" />
        <div className="prop-img-overlay"></div>
        <div className="prop-tags">
          {yieldBadge && p.yield && (
            <span className="prop-tag" style={{ background: 'rgba(46,204,122,0.2)', color: 'var(--green)', border: '1px solid var(--green)' }}>Yield {p.yield}%</span>
          )}
          {!yieldBadge && p.tags && p.tags.map(t => (
            <span key={t} className={`prop-tag tag-${t}`}>{t}</span>
          ))}
        </div>
        <div className="prop-actions">
          <div className={`prop-like ${isSaved ? 'liked' : ''}`} onClick={(e) => { e.stopPropagation(); onSaveToggle && onSaveToggle(p.id); }}>
            <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
          </div>
        </div>
      </div>
      <div className="prop-details">
        <motion.div layoutId={`card-title-${p.id}`} className="prop-title" transition={{ duration: 0.2 }}>{p.title}</motion.div>
        <div className="prop-loc">{p.loc}</div>
        <div className="prop-price-row">
          <div className="prop-price">{p.price} <span>{p.priceSub}</span></div>
        </div>
        <div className="prop-specs">
          {p.bhk} BHK • {p.sqft} sq.ft
        </div>
      </div>
    </motion.div>
  );
}

export default PropertyCard;