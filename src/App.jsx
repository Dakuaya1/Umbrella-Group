import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import SavedPage from './pages/SavedPage';
import ComparePage from './pages/ComparePage';
import ChatPage from './pages/ChatPage';
import DetailPage from './pages/DetailPage';
import SwipeMode from './components/SwipeMode';
import MatchScreen from './components/MatchScreen';
import { PROPS } from './data/properties';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState([1, 2]);
  const [showSwipe, setShowSwipe] = useState(false);
  const [matchedProperty, setMatchedProperty] = useState(null);
  const [detailPageProperty, setDetailPageProperty] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');

  useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('button') || target.closest('.prop-card') || target.closest('.nav-item') || target.closest('a')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      setDetailPageProperty(selectedProperty);
      setSelectedProperty(null);
    }
  }, [selectedProperty]);

  const handleSaveToggle = (id) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(sid => sid !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const handleSwipeResult = (property, direction) => {
    if (direction === 'right') {
      if (!savedIds.includes(property.id)) {
        setSavedIds([...savedIds, property.id]);
      }
      setMatchedProperty(property);
    }
  };

  const openDetailsFromMatch = () => {
    setDetailPageProperty(matchedProperty);
    setMatchedProperty(null);
    setShowSwipe(false);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomePage onSwipeOpen={() => setShowSwipe(true)} onSelect={setSelectedProperty} savedIds={savedIds} onSaveToggle={handleSaveToggle} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
      case 'explore':
        return <ExplorePage onSelect={setSelectedProperty} savedIds={savedIds} onSaveToggle={handleSaveToggle} searchQuery={searchQuery} />;
      case 'saved':
        return <SavedPage savedIds={savedIds} onSelect={setSelectedProperty} onSaveToggle={handleSaveToggle} />;
      case 'compare':
        return <ComparePage savedIds={savedIds} onSelect={setSelectedProperty} onSaveToggle={handleSaveToggle} />;
      case 'chat':
        return <ChatPage onSearch={setSearchQuery} />;
      default:
        return <HomePage onSwipeOpen={() => setShowSwipe(true)} onSelect={setSelectedProperty} savedIds={savedIds} onSaveToggle={handleSaveToggle} searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="app-container" style={{ cursor: 'none' }}>
      <CustomCursor pos={cursorPos} type={cursorType} />
      <AnimatedBackground />
      <Sidebar
        activeTab={showSwipe ? 'swipe-virtual' : activeTab}
        setActiveTab={(t) => {
          if (t === 'swipe') {
            setShowSwipe(true);
          } else {
            setShowSwipe(false);
            setActiveTab(t);
          }
        }}
        savedCount={savedIds.length}
      />

      <div className="main-content">
        <TopHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'opacity, transform, filter' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSwipe && (
          <SwipeMode onClose={() => setShowSwipe(false)} onSwipeResult={handleSwipeResult} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {matchedProperty && (
          <MatchScreen property={matchedProperty} onContinue={openDetailsFromMatch} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailPageProperty && (
          <DetailPage
            property={detailPageProperty}
            onBack={() => setDetailPageProperty(null)}
            savedIds={savedIds}
            onSaveToggle={handleSaveToggle}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CustomCursor({ pos, type }) {
  const isPointer = type === 'pointer';

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: pos.x - 16,
        y: pos.y - 16,
        scale: isPointer ? 1.8 : 1,
        backgroundColor: isPointer ? 'rgba(201,168,76,0.1)' : 'transparent',
        borderColor: isPointer ? 'rgba(201,168,76,0.5)' : 'var(--gold)',
        borderWidth: isPointer ? '0px' : '1px'
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: isPointer ? 'blur(4px)' : 'none'
      }}
    >
      <motion.div
        animate={{
          scale: isPointer ? 0.5 : 1,
          opacity: isPointer ? 1 : 0.8
        }}
        style={{ width: '4px', height: '4px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}
      />
    </motion.div>
  );
}

function AnimatedBackground() {
  return (
    <div className="animated-bg">
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      <div className="bg-orb bg-orb-3"></div>
    </div>
  );
}

export default App;