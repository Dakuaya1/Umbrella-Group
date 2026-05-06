import React from 'react';
import { motion } from 'framer-motion';

function MatchScreen({ property, onContinue }) {
  return (
    <motion.div
      className="modal-overlay open"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ pointerEvents: 'all', zIndex: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', color: 'var(--gold)', marginBottom: '30px', fontStyle: 'italic', letterSpacing: '0.05em' }}
      >
        It's a Match!
      </motion.h1>
      <motion.div
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ background: 'var(--bg3)', borderRadius: '24px', overflow: 'hidden', width: '320px', border: '1px solid var(--border)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
      >
        <div style={{ height: '200px', width: '100%' }}>
          <img src={property.img} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--text)' }}>{property.title}</h2>
          <p style={{ color: 'var(--text2)', fontSize: '14px' }}>has been added to your saved list.</p>
        </div>
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        onClick={onContinue} className="btn-primary"
        style={{ marginTop: '40px', padding: '16px 48px', fontSize: '15px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(201,168,76,0.2)' }}
      >
        View Full Details
      </motion.button>
    </motion.div>
  );
}

export default MatchScreen;