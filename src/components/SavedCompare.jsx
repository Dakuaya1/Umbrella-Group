import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, XCircle, Trash2, MapPin, Bed, Bath, Car, Square, Star } from 'lucide-react';
import { PROPS } from '../data/properties';
import { PropertyCard } from './PropertyCard';

export function SavedPage({ savedIds, onSelect, onSaveToggle }) {
  const savedProps = PROPS.filter(p => savedIds.includes(p.id));
  const [filter, setFilter] = useState('all');
  
  const filteredSaved = filter === 'all' 
    ? savedProps 
    : savedProps.filter(p => p.type === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="page-header">
        <h1 className="page-title">Saved Properties</h1>
        <p style={{ color: 'var(--text2)', fontSize: '14px' }}>{savedProps.length} properties saved</p>
      </div>

      {savedProps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text2)' }}>
          <Heart size={64} style={{ opacity: 0.2, marginBottom: '24px' }} />
          <h3 style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '8px' }}>No saved properties yet</h3>
          <p>Start exploring and save properties you like!</p>
        </div>
      ) : (
        <>
          <div className="tabs-pill" style={{ marginBottom: '24px' }}>
            <div 
              className={`tab-pill ${filter === 'all' ? 'active' : ''}`} 
              onClick={() => setFilter('all')}
            >
              All ({savedProps.length})
            </div>
            <div 
              className={`tab-pill ${filter === 'rent' ? 'active' : ''}`} 
              onClick={() => setFilter('rent')}
            >
              Rent ({savedProps.filter(p => p.type === 'rent').length})
            </div>
            <div 
              className={`tab-pill ${filter === 'buy' ? 'active' : ''}`} 
              onClick={() => setFilter('buy')}
            >
              Buy ({savedProps.filter(p => p.type === 'buy').length})
            </div>
          </div>

          <div className="saved-grid">
            {filteredSaved.map(p => (
              <PropertyCard 
                key={p.id} 
                p={p} 
                onClick={() => onSelect(p)}
                savedIds={savedIds}
                onSaveToggle={onSaveToggle}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

export function ComparePage({ savedIds, onSelect, onSaveToggle }) {
  const [compareList, setCompareList] = useState([]);
  
  const toggleCompare = (id) => {
    setCompareList(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const propertiesToCompare = PROPS.filter(p => compareList.includes(p.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="page-header">
        <h1 className="page-title">Compare Properties</h1>
        <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Select up to 3 properties to compare</p>
      </div>

      {savedIds.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text2)' }}>
          <Heart size={64} style={{ opacity: 0.2, marginBottom: '24px' }} />
          <h3 style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '8px' }}>No saved properties</h3>
          <p>Save some properties first to compare them.</p>
        </div>
      ) : (
        <>
          <div className="saved-grid" style={{ marginBottom: '32px' }}>
            {PROPS.filter(p => savedIds.includes(p.id)).map(p => (
              <div key={p.id} style={{ position: 'relative' }}>
                <PropertyCard 
                  p={p} 
                  onClick={() => onSelect(p)}
                  savedIds={savedIds}
                  onSaveToggle={onSaveToggle}
                />
                <button
                  className={`compare-select-btn ${compareList.includes(p.id) ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleCompare(p.id); }}
                  disabled={!compareList.includes(p.id) && compareList.length >= 3}
                >
                  {compareList.includes(p.id) ? 'Selected' : 'Compare'}
                </button>
              </div>
            ))}
          </div>

          {propertiesToCompare.length > 0 && (
            <div className="comparison-view">
              <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Comparison ({propertiesToCompare.length}/3)</h2>
              <div className="comparison-table">
                <div className="comparison-row header">
                  <div>Property</div>
                  {propertiesToCompare.map(p => (
                    <div key={p.id} style={{ textAlign: 'left' }}>
                      <img src={p.img} alt={p.title} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', marginBottom: '8px' }} />
                      <div style={{ fontWeight: 600 }}>{p.title}</div>
                      <button 
                        onClick={() => toggleCompare(p.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: '4px' }}
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="comparison-row">
                  <div>Price</div>
                  {propertiesToCompare.map(p => (
                    <div key={p.id}>{p.price} {p.priceSub}</div>
                  ))}
                </div>
                
                <div className="comparison-row">
                  <div>Location</div>
                  {propertiesToCompare.map(p => (
                    <div key={p.id}>{p.loc}</div>
                  ))}
                </div>
                
                <div className="comparison-row">
                  <div>Type</div>
                  {propertiesToCompare.map(p => (
                    <div key={p.id}>{p.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
                  ))}
                </div>
                
                <div className="comparison-row">
                  <div>BHK</div>
                  {propertiesToCompare.map(p => (
                    <div key={p.id}>{p.bhk} BHK</div>
                  ))}
                </div>
                
                <div className="comparison-row">
                  <div>Area</div>
                  {propertiesToCompare.map(p => (
                    <div key={p.id}>{p.sqft} sq.ft</div>
                  ))}
                </div>
                
                <div className="comparison-row">
                  <div>Rental Yield</div>
                  {propertiesToCompare.map(p => (
                    <div key={p.id}>
                      <Star size={14} fill="var(--gold)" color="var(--gold)" />
                      {p.yield}%
                    </div>
                  ))}
                </div>
                
                <div className="comparison-row">
                  <div>Amenities</div>
                  {propertiesToCompare.map(p => (
                    <div key={p.id} style={{ fontSize: '13px' }}>
                      {p.amenities.slice(0, 5).join(', ')}
                      {p.amenities.length > 5 && ` +${p.amenities.length - 5} more`}
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'center' }}>
                <button 
                  className="btn-ghost"
                  onClick={() => setCompareList([])}
                >
                  <Trash2 size={18} /> Clear All
                </button>
                <button className="btn-primary">
                  Contact Agent for Selected
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
