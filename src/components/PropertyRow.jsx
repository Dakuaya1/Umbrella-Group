import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';

function PropertyRow({ title, properties, onSelect, savedIds, onSaveToggle, yieldBadge = false }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <motion.div
        className="row-header"
        style={{ padding: '0 4px' }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="row-title">{title}</div>
        <button className="row-view-all">View all</button>
      </motion.div>
      <div className="row-scroll">
        {properties.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
          >
            <PropertyCard
              p={p}
              wide={true}
              onClick={() => onSelect(p)}
              savedIds={savedIds}
              onSaveToggle={onSaveToggle}
              yieldBadge={yieldBadge}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PropertyRow;