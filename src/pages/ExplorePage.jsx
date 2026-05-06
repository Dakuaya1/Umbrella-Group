import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { PROPS } from '../data/properties';

function ExplorePage({ onSelect, savedIds, onSaveToggle, searchQuery }) {
  const [type, setType] = useState('rent');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedBhk, setSelectedBhk] = useState([]);
  const [maxBudget, setMaxBudget] = useState(type === 'rent' ? 100000 : 50000000);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [viewMode, setViewMode] = useState('split');
  const [hoveredPropId, setHoveredPropId] = useState(null);

  useEffect(() => {
    setMaxBudget(type === 'rent' ? 100000 : 50000000);
  }, [type]);

  const locations = Array.from(new Set(PROPS.map(p => p.loc.split(',')[0].trim())));
  const bhkOptions = [1, 2, 3, 4];

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const firstPart = priceStr.split('-')[0].trim();
    let val = parseFloat(firstPart.replace(/[₹,]/g, ''));
    if (firstPart.includes('Cr')) val *= 10000000;
    else if (firstPart.includes('Lac') || firstPart.includes('L')) val *= 100000;
    else if (firstPart.includes('K')) val *= 1000;
    return val;
  };

  const filteredProps = PROPS.filter(p => {
    const locMatch = selectedLocations.length === 0 || selectedLocations.some(l => p.loc.includes(l));
    const bhkMatch = selectedBhk.length === 0 || selectedBhk.includes(p.bhk);
    const typeMatch = p.type === type;
    const searchMatch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.loc.toLowerCase().includes(searchQuery.toLowerCase());
    const priceVal = parsePrice(p.price);
    const budgetMatch = priceVal <= maxBudget;
    return locMatch && bhkMatch && typeMatch && searchMatch && budgetMatch;
  });

  const toggleLocation = (loc) => {
    setSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const toggleBhk = (bhk) => {
    setSelectedBhk(prev =>
      prev.includes(bhk) ? prev.filter(b => b !== bhk) : [...prev, bhk]
    );
  };

  const displayLocations = showAllLocations ? locations : locations.slice(0, 5);

  const formatBudget = (val) => {
    if (val >= 10000000) return `${(val/10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `${(val/100000).toFixed(1)} L`;
    return `${(val/1000).toFixed(0)} K`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Explore</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="mobile-only" style={{ background: 'var(--bg2)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <button
              onClick={() => setViewMode('list')}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'list' ? 'var(--surface)' : 'transparent', color: viewMode === 'list' ? 'var(--gold)' : 'var(--text2)', cursor: 'pointer' }}
            >List</button>
            <button
              onClick={() => setViewMode('map')}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'map' ? 'var(--surface)' : 'transparent', color: viewMode === 'map' ? 'var(--gold)' : 'var(--text2)', cursor: 'pointer' }}
            >Map</button>
          </div>
          <div className="tabs-pill">
            <div className={`tab-pill ${type === 'rent' ? 'active' : ''}`} onClick={() => setType('rent')}>Rent</div>
            <div className={`tab-pill ${type === 'buy' ? 'active' : ''}`} onClick={() => setType('buy')}>Buy</div>
          </div>
        </div>
      </div>

      <div className={`explore-layout ${viewMode}`}>
        <div className={`explore-filters ${viewMode === 'map' ? 'mobile-hidden' : ''}`}>
          <div className="filter-section">
            <div className="filter-title">Locations</div>
            <div className="filter-pills">
              {displayLocations.map(loc => (
                <div key={loc} className={`filter-pill ${selectedLocations.includes(loc) ? 'active' : ''}`} onClick={() => toggleLocation(loc)}>{loc}</div>
              ))}
              {!showAllLocations && locations.length > 5 && (
                <div className="filter-pill" onClick={() => setShowAllLocations(true)}>+{locations.length - 5} More</div>
              )}
              {showAllLocations && (
                <div className="filter-pill" onClick={() => setShowAllLocations(false)}>Show Less</div>
              )}
            </div>
          </div>
          <div className="filter-section">
            <div className="filter-title">Budget (Max: ₹{formatBudget(maxBudget)})</div>
            <div style={{ padding: '10px 0' }}>
              <input
                type="range"
                min={type === 'rent' ? 5000 : 1000000}
                max={type === 'rent' ? 300000 : 100000000}
                step={type === 'rent' ? 5000 : 1000000}
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gold)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '13px', color: 'var(--text2)' }}>
                <span>{type === 'rent' ? '₹5k' : '₹10 L'}</span>
                <span>{type === 'rent' ? '₹3 L+' : '₹10 Cr+'}</span>
              </div>
            </div>
          </div>
          <div className="filter-section">
            <div className="filter-title">BHK</div>
            <div className="filter-pills">
              {bhkOptions.map(bhk => (
                <div key={bhk} className={`filter-pill ${selectedBhk.includes(bhk) ? 'active' : ''}`} onClick={() => toggleBhk(bhk)}>{bhk} BHK</div>
              ))}
            </div>
          </div>

          <div className="mobile-only" style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{filteredProps.length} Results Found</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredProps.map(p => (
                <PropertyCard key={p.id} p={p} onClick={() => onSelect(p)} savedIds={savedIds} onSaveToggle={onSaveToggle} />
              ))}
            </div>
          </div>
        </div>

        <div className={`explore-map ${viewMode === 'list' ? 'mobile-hidden' : ''}`}>
          <div className="explore-map-overlay"></div>
          {filteredProps.slice(0, 10).map((p, i) => (
            <div
              key={p.id}
              className={`map-pin ${hoveredPropId === p.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredPropId(p.id)}
              onMouseLeave={() => setHoveredPropId(null)}
              onClick={() => onSelect(p)}
              style={{
                top: `${20 + (i * 12) % 60}%`,
                left: `${20 + (i * 18) % 60}%`,
                zIndex: hoveredPropId === p.id ? 100 : 1
              }}
            >
              <div className="pin-price">{p.price.split(' ')[0]}</div>
              {hoveredPropId === p.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="pin-popup"
                >
                  <img src={p.img} alt={p.title} />
                  <div className="pin-popup-info">
                    <div className="pin-popup-title">{p.title}</div>
                    <div className="pin-popup-loc"><MapPin size={10} /> {p.loc}</div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}

          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }} className="desktop-only">
            {filteredProps.length > 0 ? (
              <PropertyCard
                p={hoveredPropId ? filteredProps.find(p=>p.id===hoveredPropId) : filteredProps[0]}
                wide={false}
                onClick={() => onSelect(hoveredPropId ? filteredProps.find(p=>p.id===hoveredPropId) : filteredProps[0])}
                savedIds={savedIds}
                onSaveToggle={onSaveToggle}
              />
            ) : (
              <div style={{ background: 'var(--bg2)', padding: '20px', borderRadius: '16px', textAlign: 'center', color: 'var(--text2)' }}>
                No properties found for these filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExplorePage;