import React from 'react';
import { motion } from 'framer-motion';
import { Search, Layers } from 'lucide-react';
import PropertyRow from '../components/PropertyRow';
import { PROPS } from '../data/properties';

function HomePage({ onSwipeOpen, onSelect, savedIds, onSaveToggle, searchQuery, onSearchChange }) {
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

  const recentlyAdded = [...PROPS].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate)).slice(0, 4);
  const under50L = PROPS.filter(p => {
    const priceMatch = p.price.match(/(\d+(?:\.\d+)?)\s*L/);
    if (priceMatch && parseFloat(priceMatch[1]) <= 50) return true;
    return false;
  });
  const highYield = [...PROPS].sort((a, b) => b.yield - a.yield).slice(0, 4);
  const newProperties = PROPS.filter(p => p.tags && p.tags.includes('new')) ||
    PROPS.filter(p => p.tags && p.tags.includes('hot'));

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
              <div key={p.id} className="prop-card" onClick={() => onSelect(p)} style={{ cursor: 'pointer' }}>
                <div className="prop-img-wrapper">
                  <img src={p.img} className="prop-img" alt={p.title} />
                  <div className="prop-img-overlay"></div>
                </div>
                <div className="prop-details">
                  <div className="prop-title">{p.title}</div>
                  <div className="prop-loc">{p.loc}</div>
                  <div className="prop-price">{p.price} <span>{p.priceSub}</span></div>
                </div>
              </div>
            ))}
          </div>
          {searchResults.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
              <Search size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p style={{ fontSize: '18px', color: 'var(--text)' }}>No properties match your search.</p>
              <div style={{ marginTop: '32px' }}>
                <p style={{ fontSize: '13px', marginBottom: '16px' }}>Popular Searches</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['Baner', 'Kharadi', 'Koregaon Park', '3 BHK', 'Under 50L'].map(term => (
                    <button
                      key={term}
                      className="filter-pill"
                      onClick={() => onSearchChange(term)}
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
                ))}
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
                  ))}
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
                <button className="btn-ghost" onClick={onSwipeOpen}>
                  <Layers size={18} /> Swipe Rentals
                </button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PropertyRow title="Recently Added" properties={recentlyAdded} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PropertyRow title="Top Picks For You" properties={PROPS.slice(0, 4)} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PropertyRow title="Under ₹50 Lakh" properties={under50L} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PropertyRow title="High Rental Yield" properties={highYield} onSelect={onSelect} yieldBadge={true} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PropertyRow title="New This Week" properties={newProperties.slice(0, 4)} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default HomePage;