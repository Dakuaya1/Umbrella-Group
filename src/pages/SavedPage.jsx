import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { PROPS } from '../data/properties';

function SavedPage({ savedIds, onSelect, onSaveToggle }) {
  const savedProps = PROPS.filter(p => savedIds.includes(p.id));
  const [filter, setFilter] = useState('all');

  const filteredSaved = filter === 'all'
    ? savedProps
    : savedProps.filter(p => p.type === filter);

  const rentCount = savedProps.filter(p => p.type === 'rent').length;
  const buyCount = savedProps.filter(p => p.type === 'buy').length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Saved Collection</h1>
        <div className="tabs-pill">
          <div className={`tab-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({savedProps.length})</div>
          <div className={`tab-pill ${filter === 'rent' ? 'active' : ''}`} onClick={() => setFilter('rent')}>Rentals ({rentCount})</div>
          <div className={`tab-pill ${filter === 'buy' ? 'active' : ''}`} onClick={() => setFilter('buy')}>Buy ({buyCount})</div>
        </div>
      </div>

      {filteredSaved.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--bg2)', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <Heart size={48} color="var(--border)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
            {savedProps.length === 0 ? 'Your collection is empty' : `No ${filter} properties saved`}
          </h2>
          <p style={{ color: 'var(--text2)', maxWidth: '400px', margin: '0 auto' }}>
            {savedProps.length === 0
              ? 'Start exploring luxury properties and save your favorites to view them later in one place.'
              : `You haven't saved any properties for ${filter} yet.`}
          </p>
        </div>
      ) : (
        <div className="props-grid">
          {filteredSaved.map(p => (
            <PropertyCard key={p.id} p={p} onClick={() => onSelect(p)} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default SavedPage;