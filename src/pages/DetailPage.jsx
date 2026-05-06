import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Bed, Bath, Square, Car, MapPin, Calendar, Phone, MessageSquare, Shield, Maximize, ExternalLink, Check } from 'lucide-react';

function DetailPage({ property, onBack, savedIds, onSaveToggle }) {
  const [activeImg, setActiveImg] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const isSaved = savedIds.includes(property.id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.img];

  const nextImg = () => setActiveImg(prev => (prev + 1) % gallery.length);
  const prevImg = () => setActiveImg(prev => (prev - 1 + gallery.length) % gallery.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        zIndex: 2000,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Header Actions */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', zIndex: 2100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <button onClick={onBack} style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', color: 'white', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', color: 'white', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Share2 size={20} />
          </button>
          <button
            onClick={() => onSaveToggle(property.id)}
            style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', color: isSaved ? 'var(--gold)' : 'white', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Heart size={20} fill={isSaved ? "var(--gold)" : "none"} />
          </button>
        </div>
      </div>

      {/* Hero Gallery */}
      <div style={{ height: '65vh', position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={gallery[activeImg]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              y: y1
            }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)' }}></div>

        {/* Gallery Navigation */}
        <div className="desktop-only" style={{ position: 'absolute', top: '50%', left: '20px', right: '20px', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={prevImg} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
            <ArrowLeft size={24} />
          </button>
          <button onClick={nextImg} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
            <ArrowLeft size={24} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 1 && (
          <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', padding: '10px', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(15px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImg(idx)}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: activeImg === idx ? '2px solid var(--gold)' : '2px solid transparent',
                  cursor: 'pointer',
                  opacity: activeImg === idx ? 1 : 0.6
                }}
              >
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ position: 'absolute', bottom: '40px', right: '40px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '24px', color: 'white', fontSize: '13px', fontWeight: 500, border: '1px solid rgba(255,255,255,0.1)' }}>
          {activeImg + 1} / {gallery.length} Photos
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 120px' }}>
        <div className="detail-main-grid">

          {/* Left Column */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ background: 'var(--bg2)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', marginBottom: '32px', marginTop: '-60px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ padding: '4px 12px', background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>{property.type === 'rent' ? 'For Rent' : 'For Sale'}</span>
                    {property.tags && property.tags.map(t => (
                      <span key={t} style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', border: '1px solid var(--border)' }}>{t}</span>
                    ))}
                  </div>
                  <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', marginBottom: '8px', lineHeight: 1.1 }}>{property.title}</h1>
                  <div style={{ color: 'var(--text2)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} color="var(--gold)" /> {property.loc}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '36px', color: 'var(--gold)', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>{property.price}</div>
                  <div style={{ color: 'var(--text2)', fontSize: '15px' }}>{property.priceSub}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)', padding: '24px 0', margin: '24px 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <Bed size={20} color="var(--gold)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600 }}>{property.bhk} BHK</div>
                  <div style={{ color: 'var(--text2)', fontSize: '11px', textTransform: 'uppercase' }}>Bedrooms</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Bath size={20} color="var(--gold)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600 }}>{property.bhk}</div>
                  <div style={{ color: 'var(--text2)', fontSize: '11px', textTransform: 'uppercase' }}>Bathrooms</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Square size={20} color="var(--gold)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600 }}>{property.sqft}</div>
                  <div style={{ color: 'var(--text2)', fontSize: '11px', textTransform: 'uppercase' }}>Sq.Ft</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Car size={20} color="var(--gold)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600 }}>1</div>
                  <div style={{ color: 'var(--text2)', fontSize: '11px', textTransform: 'uppercase' }}>Parking</div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: "'Cormorant Garamond', serif" }}>Description</h3>
                <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '15px' }}>
                  {property.desc} This property features premium finishes, state-of-the-art kitchen appliances, and expansive windows that offer breathtaking views and abundant natural light.
                </p>
              </div>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', marginBottom: '20px', fontFamily: "'Cormorant Garamond', serif", display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Sparkles size={20} color="var(--gold)" /> Premium Amenities
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                  {property.amenities.map(a => (
                    <div key={a} style={{ background: 'var(--bg2)', padding: '16px 20px', borderRadius: '16px', fontSize: '14px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }}></div>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {property.features && property.features.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', marginBottom: '20px', fontFamily: "'Cormorant Garamond', serif" }}>Property Features</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {property.features.map(f => (
                    <div key={f} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 20px', borderRadius: '30px', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={14} color="var(--gold)" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Contact */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '32px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: "'Cormorant Garamond', serif" }}>Schedule a Viewing</h4>
                <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Expert guidance for your premium investment</p>
              </div>

              {property.agent && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--border2)' }}>
                  <img src={property.agent.img} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{property.agent.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>Senior Advisor</div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="btn-primary" style={{ width: '100%', padding: '18px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <Calendar size={18} /> Book Private Tour
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button className="btn-ghost" style={{ padding: '16px', borderRadius: '14px', justifyContent: 'center', gap: '8px' }}>
                    <Phone size={18} /> Call
                  </button>
                  <button className="btn-ghost" style={{ padding: '16px', borderRadius: '14px', justifyContent: 'center', gap: '8px' }}>
                    <MessageSquare size={18} /> WhatsApp
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border2)', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text2)', fontSize: '12px' }}>
                <Shield size={16} /> Verified Luxury Listing by Umbrella
              </div>
            </div>

            <div style={{ marginTop: '20px', background: 'var(--gold)', padding: '20px', borderRadius: '24px', color: '#000', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
              <div style={{ background: 'rgba(0,0,0,0.1)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Maximize size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Virtual 3D Tour</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Explore every corner from home</div>
              </div>
              <ExternalLink size={16} style={{ marginLeft: 'auto' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <motion.div
        className="mobile-only"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(10,10,12,0.95)', backdropFilter: 'blur(20px)', padding: '16px 20px', paddingBottom: 'calc(16px + env(safe-area-inset-bottom))', borderTop: '1px solid var(--border)', zIndex: 2200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
      >
        <div>
          <div style={{ fontSize: '20px', color: 'var(--gold)', fontWeight: 600 }}>{property.price}</div>
          <div style={{ fontSize: '12px', color: 'var(--text2)' }}>{property.priceSub}</div>
        </div>
        <button className="btn-primary" style={{ flex: 1, padding: '14px', borderRadius: '12px' }}>Contact Agent</button>
      </motion.div>
    </motion.div>
  );
}

export default DetailPage;