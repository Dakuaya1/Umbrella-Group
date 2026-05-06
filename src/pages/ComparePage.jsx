import React from 'react';
import { motion } from 'framer-motion';
import { GitCompare, X } from 'lucide-react';
import { PROPS } from '../data/properties';

function ComparePage({ savedIds, onSelect, onSaveToggle }) {
  const compareProps = PROPS.filter(p => savedIds.includes(p.id)).slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Compare Properties</h1>
        <div style={{ color: 'var(--text2)', fontSize: '15px' }}>{compareProps.length} of 3 spots filled</div>
      </div>

      {compareProps.length < 2 ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--bg2)', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <GitCompare size={48} color="var(--border)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>Add more properties</h2>
          <p style={{ color: 'var(--text2)', maxWidth: '400px', margin: '0 auto' }}>
            Save at least 2 properties to compare their features, amenities, and pricing side-by-side.
          </p>
        </div>
      ) : (
        <div className="compare-container">
          <div className="compare-header">
            <div className="compare-label-col">
              <div style={{ fontSize: '13px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Comparison</div>
              <div style={{ fontSize: '20px', fontWeight: 600, marginTop: '8px' }}>Key Metrics</div>
            </div>
            {compareProps.map(p => (
              <div key={p.id} className="compare-prop-card">
                <button
                  className="compare-remove"
                  onClick={(e) => { e.stopPropagation(); onSaveToggle(p.id); }}
                >
                  <X size={14} />
                </button>
                <img src={p.img} alt={p.title} onClick={() => onSelect(p)} />
                <div className="compare-prop-info">
                  <div className="compare-prop-title">{p.title}</div>
                  <div className="compare-prop-price">{p.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="compare-rows">
            <div className="compare-row">
              <div className="compare-label">Location</div>
              {compareProps.map(p => <div key={p.id} className="compare-val">{p.loc}</div>)}
            </div>
            <div className="compare-row">
              <div className="compare-label">Configuration</div>
              {compareProps.map(p => <div key={p.id} className="compare-val highlight">{p.bhk} BHK</div>)}
            </div>
            <div className="compare-row">
              <div className="compare-label">Size</div>
              {compareProps.map(p => <div key={p.id} className="compare-val">{p.sqft} sq.ft</div>)}
            </div>
            <div className="compare-row">
              <div className="compare-label">Type</div>
              {compareProps.map(p => <div key={p.id} className="compare-val" style={{ textTransform: 'capitalize' }}>{p.type}</div>)}
            </div>
            <div className="compare-row">
              <div className="compare-label">Yield</div>
              {compareProps.map(p => <div key={p.id} className="compare-val highlight">{p.yield}%</div>)}
            </div>
            <div className="compare-row">
              <div className="compare-label">Amenities</div>
              {compareProps.map(p => (
                <div key={p.id} className="compare-val amenities">
                  {p.amenities && p.amenities.slice(0, 3).join(', ')}
                  {p.amenities && p.amenities.length > 3 && ` +${p.amenities.length - 3}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ComparePage;