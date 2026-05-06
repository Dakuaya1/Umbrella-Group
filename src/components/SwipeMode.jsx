import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';
import { PROPS } from '../data/properties';

function SwipeCard({ p, index, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [0, -100], [0, 1]);
  const controls = useAnimation();

  const handleDragEnd = async (e, { offset, velocity }) => {
    const threshold = 100;
    if (offset.x > threshold || velocity.x > 500) {
      await controls.start({ x: window.innerWidth, transition: { duration: 0.3 } });
      onSwipe(p, 'right');
    } else if (offset.x < -threshold || velocity.x < -500) {
      await controls.start({ x: -window.innerWidth, transition: { duration: 0.3 } });
      onSwipe(p, 'left');
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      className="swipe-card"
      style={{
        zIndex: 10 - index, x, rotate,
        opacity: index === 0 ? opacity : 1,
        scale: 1 - index * 0.05,
        y: index * 12
      }}
      animate={controls}
      drag={index === 0 ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
    >
      <div className="swipe-card-img">
        <img src={p.img} alt={p.title} />
        <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'}}></div>
      </div>
      <div className="swipe-card-body">
        <div className="swipe-card-name">{p.title}</div>
        <div className="swipe-card-loc">📍 {p.loc}</div>
        <div className="swipe-card-price">{p.price} <span style={{fontSize:14, color:'var(--text2)'}}>{p.priceSub}</span></div>
        <div className="swipe-card-specs">
          <span>{p.bhk} BHK</span>
          <span>{p.sqft} sq.ft</span>
        </div>
      </div>

      <motion.div className="swipe-feedback like" style={{ opacity: likeOpacity, position: 'absolute', top: 20, left: 16 }}>LIKED</motion.div>
      <motion.div className="swipe-feedback pass" style={{ opacity: passOpacity, position: 'absolute', top: 20, right: 16 }}>PASS</motion.div>
    </motion.div>
  );
}

function SwipeMode({ onClose, onSwipeResult }) {
  const [cards, setCards] = useState([...PROPS].sort(()=>Math.random()-0.5));

  const handleSwipe = (property, direction) => {
    setCards(prev => prev.filter(c => c.id !== property.id));
    onSwipeResult(property, direction);
  };

  return (
    <motion.div
      className="swipe-overlay open"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ pointerEvents: 'all' }}
    >
      <div className="swipe-header">
        <div style={{ fontSize: '16px', color: 'var(--gold)', fontWeight: 500 }}>Swipe to Explore Rentals</div>
        <div className="swipe-count">{PROPS.length - cards.length} / {PROPS.length}</div>
        <button className="swipe-close" onClick={onClose}><X size={20}/></button>
      </div>
      <div className="swipe-card-stack">
        <AnimatePresence>
          {cards.map((p, i) => (
            <SwipeCard key={p.id} p={p} index={i} onSwipe={handleSwipe} />
          ))}
          {cards.length === 0 && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{color:'var(--text2)', textAlign:'center', marginTop:'50%'}}>You're all caught up!</motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="swipe-buttons">
        <button className="swipe-btn pass" onClick={() => cards.length && handleSwipe(cards[0], 'left')}><X size={24}/></button>
        <button className="swipe-btn info"><Sparkles size={24}/></button>
        <button className="swipe-btn like" onClick={() => cards.length && handleSwipe(cards[0], 'right')}><Check size={24} strokeWidth={3}/></button>
      </div>
    </motion.div>
  );
}

export default SwipeMode;