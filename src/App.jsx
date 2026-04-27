import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation, useScroll } from 'framer-motion';
import { 
  Home, Compass, Key, Building, Heart, GitCompare, MessageSquare, 
  MoreHorizontal, Search, Bell, SlidersHorizontal, PlayCircle, Map,
  Bed, Square, MapPin, X, Sparkles, Check, Car, Bath, Maximize, Layers,
  Trash2, XCircle, Mic, Send, ArrowLeft, Shield, Wifi, Coffee, Users,
  Phone, Mail, Calendar, Info, Star, Share2, ExternalLink
} from 'lucide-react';

const PROPS = [
  { 
    id:1, 
    title:'Skyline Residences', 
    loc:'Baner, Pune', 
    price:'₹1.45 Cr', 
    priceSub:'3 BHK · 1680 sq.ft', 
    type:'buy', 
    bhk:3, 
    sqft:1680, 
    img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', 
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    tags:['featured'], 
    amenities:['Furnished','Parking','Lift','Security', 'Swimming Pool', 'Gym', 'Clubhouse'], 
    desc:'Spacious 3 BHK with modern amenities, beautiful city view and prime location. Perfect for families and working professionals.', 
    yield: 4.5,
    agent: { name: 'Sarah Kapoor', phone: '+91 98765 43210', img: 'https://i.pravatar.cc/100?img=44' },
    features: ['Vastu Compliant', 'Sea View', 'Corner Unit', 'High Floor']
  },
  { 
    id:2, 
    title:'Urban Nest', 
    loc:'Wakad, Pune', 
    price:'₹22,000', 
    priceSub:'/ mo', 
    type:'rent', 
    bhk:2, 
    sqft:956, 
    img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
    ],
    tags:['new'], 
    amenities:['Furnished','Parking','Security', 'CCTV', 'Power Backup'], 
    desc:'Modern 2 BHK apartment with contemporary design, excellent connectivity, and world-class facilities in a prime Wakad location.', 
    yield: 6.2,
    agent: { name: 'Rahul Mehra', phone: '+91 98765 00000', img: 'https://i.pravatar.cc/100?img=12' },
    features: ['Pet Friendly', 'Balcony', 'Modular Kitchen']
  },
  { 
    id:3, 
    title:'The Horizon Villas', 
    loc:'Kothrud, Pune', 
    price:'₹2.75 Cr', 
    priceSub:'4 BHK · 3200 sq.ft', 
    type:'buy', 
    bhk:4, 
    sqft:3200, 
    img:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', 
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    tags:['premium'], 
    amenities:['Garden','Parking','Security','Gym', 'Private Pool', 'Home Theater'], 
    desc:'Luxurious villa offering expansive living spaces, private garden, and unparalleled privacy in the heart of Kothrud.', 
    yield: 3.8,
    agent: { name: 'Anita Desai', phone: '+91 99999 88888', img: 'https://i.pravatar.cc/100?img=25' },
    features: ['Private Garden', 'Duplex', 'Solar Power']
  },
  { 
    id:4, 
    title:'Greenview Heights', 
    loc:'Hinjewadi, Pune', 
    price:'₹30,000', 
    priceSub:'/ mo', 
    type:'rent', 
    bhk:3, 
    sqft:1100, 
    img:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', 
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    tags:['hot'], 
    amenities:['Pool','Gym','Parking', 'Clubhouse', 'Play Area'], 
    desc:'Premium rental near IT parks with dedicated workspace, and smart home features. The ultimate urban lifestyle.', 
    yield: 5.6,
    agent: { name: 'Vikram Singh', phone: '+91 98888 77777', img: 'https://i.pravatar.cc/100?img=11' },
    features: ['Near IT Park', 'Smart Home', '24/7 Water']
  },
  { 
    id:5, 
    title:'Pearl Apartments', 
    loc:'Kothrud, Pune', 
    price:'₹45 L', 
    priceSub:'1 BHK · 650 sq.ft', 
    type:'buy', 
    bhk:1, 
    sqft:650, 
    img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    tags:[], 
    amenities:['Parking','Security'], 
    desc:'Affordable and cozy 1 BHK in the heart of Kothrud. Walking distance to SNDT College and D-Mart.', 
    yield: 4.2,
    agent: { name: 'Priya Sharma', phone: '+91 97777 66666', img: 'https://i.pravatar.cc/100?img=32' },
    features: ['Low Maintenance', 'Prime Location']
  },
  { id:6, title:'Serene Retreat', loc:'Ravet, Pune', price:'₹50 L', priceSub:'2 BHK · 820 sq.ft', type:'buy', bhk:2, sqft:820, img:'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80', tags:['new'], amenities:['Garden','Security'], desc:'Beautifully designed compact homes away from the city noise.', yield: 5.3 },
  { id:7, title:'Tech Park Suites', loc:'Kharadi, Pune', price:'₹90 L', priceSub:'2 BHK · 1000 sq.ft', type:'buy', bhk:2, sqft:1000, img:'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', tags:['hot'], amenities:['Gym','Pool','Security'], desc:'Premium homes right next to EON IT Park.', yield: 5.4 },
  { id:8, title:'Lakeview Apartments', loc:'Moshi, Pune', price:'₹49 L', priceSub:'1 BHK · 680 sq.ft', type:'buy', bhk:1, sqft:680, img:'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80', tags:[], amenities:['Parking','Security'], desc:'Quiet lakeview apartments with modern styling.', yield: 4.8 },
  { id:9, title:'Cheryle & Beryle Shop', loc:'Kharadi, Pune', price:'₹60K - 1.2L', priceSub:'/ mo · 400 sq.ft', type:'rent', bhk:0, sqft:400, img:'https://images.unsplash.com/photo-1582037928769-181f2644ce62?auto=format&fit=crop&w=800&q=80', tags:['hot'], amenities:['Parking', 'Security'], desc:'Urgent requirement shop for rent in Cheryle & Beryle. Ideal for a diagnostic centre. Carpet area between 200 to 600 sq.ft.', yield: 7.2 },
  { id:10, title:'Luxury Row House', loc:'Kalyani Nagar, Pune', price:'₹75,000', priceSub:'/ mo · 3 BHK', type:'rent', bhk:3, sqft:2000, img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tags:['featured'], amenities:['Furnished', 'Parking'], desc:'Fully furnished 3BHK row house for rent in Kalyani Nagar. Ideal for a family. Negotiable rent and immediately available.', yield: 5.5 },
  { id:11, title:'Cozy 1BHK Flat', loc:'Lane No 8, Koregaon Park', price:'₹30,000', priceSub:'/ mo · 1 BHK', type:'rent', bhk:1, sqft:600, img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', tags:['new'], amenities:['Furnished', 'Security'], desc:'Available 1BHK furnished flat for rent in Koregaon Park, Lane No 8. Possession from 25 April.', yield: 6.0 },
  { id:12, title:'Bramha Sun City', loc:'New Kalyani Nagar, Pune', price:'₹1.80 Cr', priceSub:'3 BHK · 1600 sq.ft', type:'buy', bhk:3, sqft:1600, img:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', tags:['premium'], amenities:['Covered Parking', 'Security', 'Lift'], desc:'Available 3BHK flat for sale in Bramha Sun City, New Kalyani Nagar. Comes with 1 covered car park.', yield: 3.5 },
  { id:13, title:'Lavish 4BHK Apartment', loc:'7 Loves Chowk, Pune', price:'₹1.35 Lacs', priceSub:'/ mo · 4 BHK', type:'rent', bhk:4, sqft:3000, img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tags:['premium'], amenities:['New Interiors', 'Furnished', 'Lift', 'Security'], desc:'Lavish 4BHK on rent near Kumar Pacific Mall. Features new interiors, bathrooms, wardrobe, beds, TV units, and kitchen. Note: Only for Jain family.', yield: 4.8 },
  { id:14, title:'Premium Showroom', loc:'Kalyani Nagar, Pune', price:'₹6 Lacs', priceSub:'/ mo · 4300 sq.ft', type:'rent', bhk:0, sqft:4300, img:'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', tags:['hot'], amenities:['Parking', 'Security'], desc:'Huge 4300 sq.ft showroom on rent in Kalyani Nagar. All businesses allowed.', yield: 8.5 },
  // Kalyani Nagar Additions
  { id: 15, title: 'Konark Kinara', loc: 'Kalyani Nagar, Pune', price: '₹32K', priceSub: '/ mo · 1 BHK', type: 'rent', bhk: 1, sqft: 600, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: '1BHK fully furnished apartment available from 1 June.', yield: 5.0 },
  { id: 16, title: 'Kumar Kruti', loc: 'Kalyani Nagar, Pune', price: '₹1.55L', priceSub: '/ mo · 4.5 BHK', type: 'rent', bhk: 4.5, sqft: 3200, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Fully Furnished', 'Parking'], desc: 'Luxurious 4.5BHK fully furnished apartment in Kumar Kruti.', yield: 4.8 },
  { id: 17, title: 'Tulips Co-op Housing', loc: 'Kalyani Nagar, Pune', price: '₹60K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1500, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: 'Spacious 3BHK fully furnished flat in Tulips Co-op Housing.', yield: 5.2 },
  { id: 18, title: 'Madhusudan', loc: 'Kalyani Nagar, Pune', price: '₹80K', priceSub: '/ mo · 3.5 BHK', type: 'rent', bhk: 3.5, sqft: 2000, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Furnished'], desc: '3.5BHK furnished apartment in Madhusudan.', yield: 4.9 },
  { id: 19, title: 'Kumar Kruti 3BHK', loc: 'Kalyani Nagar, Pune', price: '₹80K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1600, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: '3BHK fully furnished in Kumar Kruti.', yield: 5.1 },
  { id: 20, title: 'Nirman Adi', loc: 'Kalyani Nagar, Pune', price: '₹55K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1500, img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Unfurnished'], desc: 'Unfurnished 3BHK in Nirman Adi.', yield: 5.4 },
  { id: 21, title: 'Anandtara Silicon Bay', loc: 'Kalyani Nagar, Pune', price: '₹90K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1700, img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: [], desc: 'Premium 3BHK in Anandtara Silicon Bay.', yield: 4.7 },
  { id: 22, title: 'Victoria Garden', loc: 'Kalyani Nagar, Pune', price: '₹70K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1600, img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Semi Furnished'], desc: 'Semi furnished 3BHK in Victoria Garden.', yield: 5.0 },
  { id: 23, title: 'Standalone 2BHK', loc: 'Kalyani Nagar, Pune', price: '₹40K', priceSub: '/ mo · 2 BHK', type: 'rent', bhk: 2, sqft: 1000, img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Semi Furnished'], desc: '2BHK semi furnished standalone property.', yield: 5.5 },
  { id: 24, title: 'Konark Kinara 3BHK', loc: 'Kalyani Nagar, Pune', price: '₹68K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1550, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Semi Furnished'], desc: '3BHK semi furnished in Konark Kinara.', yield: 5.1 },
  { id: 25, title: 'Fortaleza', loc: 'Kalyani Nagar, Pune', price: '₹1.25L', priceSub: '/ mo · 4 BHK', type: 'rent', bhk: 4, sqft: 2800, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Fully Furnished'], desc: 'Premium 4BHK fully furnished in Fortaleza.', yield: 4.6 },
  { id: 26, title: 'Neelanjali', loc: 'Kalyani Nagar, Pune', price: '₹65K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1500, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: '3BHK fully furnished in Neelanjali.', yield: 5.2 },
  { id: 27, title: 'Myra Residency', loc: 'Kalyani Nagar, Pune', price: '₹1.3L', priceSub: '/ mo · 3.5 BHK', type: 'rent', bhk: 3.5, sqft: 2200, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Fully Furnished'], desc: '3.5BHK fully furnished in Myra Residency.', yield: 4.8 },
  { id: 28, title: 'Sunshine Court', loc: 'Kalyani Nagar, Pune', price: '₹35K', priceSub: '/ mo · 1 BHK', type: 'rent', bhk: 1, sqft: 600, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: '1BHK fully furnished in Sunshine Court.', yield: 5.8 },
  // Koregaon Park Additions
  { id: 29, title: 'Summer Garden Duplex', loc: 'Koregaon Park, Pune', price: '₹70K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1800, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Fully Furnished'], desc: '3BHK Duplex fully furnished in Summer Garden.', yield: 4.9 },
  { id: 30, title: 'Marvel Crest', loc: 'Koregaon Park, Pune', price: '₹2.2L', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 2400, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', tags: ['premium', 'hot'], amenities: ['Fully Furnished', 'Luxury'], desc: 'Ultra-luxury 3BHK fully furnished in Marvel Crest.', yield: 4.2 },
  { id: 31, title: 'Power Boulevard', loc: 'Koregaon Park, Pune', price: '₹75K', priceSub: '/ mo · 3.5 BHK', type: 'rent', bhk: 3.5, sqft: 2100, img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Unfurnished'], desc: '3.5BHK unfurnished in Power Boulevard.', yield: 5.0 },
  { id: 32, title: 'Liberty Society', loc: 'Koregaon Park, Pune', price: '₹50K', priceSub: '/ mo · 2 BHK', type: 'rent', bhk: 2, sqft: 1100, img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: '2BHK fully furnished in Liberty Society.', yield: 5.4 },
  { id: 33, title: 'The Address', loc: 'Koregaon Park, Pune', price: '₹45K', priceSub: '/ mo · 2 BHK', type: 'rent', bhk: 2, sqft: 1050, img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Unfurnished'], desc: '2BHK unfurnished in The Address.', yield: 5.6 },
  { id: 34, title: 'Rahul Society', loc: 'Koregaon Park, Pune', price: '₹35K', priceSub: '/ mo · 2 BHK', type: 'rent', bhk: 2, sqft: 950, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: '2BHK fully furnished in Rahul Society.', yield: 6.0 },
  { id: 35, title: 'Clover Garden', loc: 'Koregaon Park, Pune', price: '₹1.05L', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1700, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Fully Furnished'], desc: '3BHK fully furnished in Clover Garden.', yield: 4.8 },
  { id: 36, title: 'Amol Heights', loc: 'Koregaon Park, Pune', price: '₹40K', priceSub: '/ mo · 2 BHK', type: 'rent', bhk: 2, sqft: 1000, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: '2BHK fully furnished in Amol Heights.', yield: 5.5 },
  { id: 37, title: 'Sukhwani Park', loc: 'Koregaon Park, Pune', price: '₹45K', priceSub: '/ mo · 2 BHK', type: 'rent', bhk: 2, sqft: 1050, img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', tags: [], amenities: [], desc: '2BHK in Sukhwani Park.', yield: 5.3 },
  { id: 38, title: 'Luxury 4.5BHK', loc: 'Koregaon Park, Pune', price: '₹4L', priceSub: '/ mo · 4.5 BHK', type: 'rent', bhk: 4.5, sqft: 4000, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', tags: ['premium', 'hot'], amenities: ['Unfurnished'], desc: 'Luxury 4.5BHK unfurnished property.', yield: 3.5 },
  { id: 39, title: 'Clover Classic', loc: 'Koregaon Park, Pune', price: '₹85K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1600, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished'], desc: '3BHK fully furnished in Clover Classic.', yield: 5.1 },
  { id: 40, title: 'Park View Terrace', loc: 'Koregaon Park, Pune', price: '₹50K', priceSub: '/ mo · 2 BHK', type: 'rent', bhk: 2, sqft: 1100, img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Unfurnished'], desc: '2BHK unfurnished in Park View Terrace.', yield: 5.4 },
  { id: 41, title: 'Aureta', loc: 'Koregaon Park, Pune', price: '₹95K', priceSub: '/ mo · 3.5 BHK', type: 'rent', bhk: 3.5, sqft: 1900, img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Fully Furnished'], desc: '3.5BHK fully furnished in Aureta.', yield: 4.7 },
  { id: 42, title: 'Satellite Tower', loc: 'Koregaon Park, Pune', price: '₹1.95L', priceSub: '/ mo · 4.5 BHK', type: 'rent', bhk: 4.5, sqft: 3500, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Semi Furnished'], desc: '4.5BHK semi furnished in Satellite Tower.', yield: 4.4 },
  { id: 43, title: 'Blossom Boulevard', loc: 'Koregaon Park, Pune', price: '₹1.1L', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1800, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Fully Furnished'], desc: '3BHK fully furnished in Blossom Boulevard.', yield: 4.8 },
  { id: 44, title: 'Sanctuary Society', loc: 'Koregaon Park, Pune', price: '₹65K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1550, img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Unfurnished'], desc: '3BHK unfurnished in Sanctuary society.', yield: 5.2 },
  // Magarpatta Additions
  { id: 45, title: 'Marvel Diva Phase 2', loc: 'Magarpatta, Pune', price: '₹2.3L', priceSub: '/ mo · 4 BHK', type: 'rent', bhk: 4, sqft: 4200, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', tags: ['premium', 'featured'], amenities: ['Fully Furnished', 'Infinity Pool', 'Smart Home'], desc: 'Ultra-luxury 4BHK spanning over 4000 sqft in Marvel Diva Phase 2. Features premium amenities and smart home tech.', yield: 4.1 },
  { id: 46, title: 'Erica Row House', loc: 'Magarpatta, Pune', price: '₹1L', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 2500, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Garden', 'Parking'], desc: 'Spacious 3BHK Row House in Erica, Magarpatta. Ideal for families.', yield: 4.5 },
  { id: 47, title: 'Marvel Diva', loc: 'Magarpatta, Pune', price: '₹90K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 2000, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Fully Furnished', 'Premium Interiors'], desc: '3BHK fully furnished apartment in the sought-after Marvel Diva society.', yield: 4.9 },
  // Viman Nagar Additions
  { id: 48, title: 'Shubh Gateway', loc: 'Viman Nagar, Pune', price: '₹75K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1400, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', tags: ['hot'], amenities: ['Semi Furnished', 'Security'], desc: 'Modern 3BHK semi-furnished flat in Shubh Gateway, prime Viman Nagar location.', yield: 5.2 },
  { id: 49, title: 'Shubh Nirvana', loc: 'Viman Nagar, Pune', price: '₹63K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1300, img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', tags: [], amenities: ['Semi Furnished'], desc: 'Comfortable 3BHK semi-furnished in Shubh Nirvana.', yield: 5.5 },
  // Wadgaon Sheri Additions
  { id: 50, title: 'Silicon Bay', loc: 'Wadgaon Sheri, Pune', price: '₹90K', priceSub: '/ mo · 3 BHK', type: 'rent', bhk: 3, sqft: 1600, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tags: ['premium'], amenities: ['Semi Furnished', 'Security'], desc: 'Premium 3BHK semi-furnished apartment in Silicon Bay, Wadgaon Sheri.', yield: 4.8 }
];

function Sidebar({ activeTab, setActiveTab, savedCount }) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'swipe', icon: Layers, label: 'Swipe Mode' },
    { id: 'rent', icon: Key, label: 'Rent' },
    { id: 'projects', icon: Building, label: 'Projects' },
    { id: 'saved', icon: Heart, label: 'Saved', badge: savedCount },
    { id: 'compare', icon: GitCompare, label: 'Compare' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'more', icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <div className="sidebar">
      <div className="brand" onClick={() => setActiveTab('home')}>
        <div className="brand-icon">
          <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 16 Q14 6 21 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="14" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="brand-text">UMBRELLA</div>
      </div>
      
      <div className="nav-menu">
        {menuItems.map(item => (
          <div 
            key={item.id} 
            className={`nav-item ${activeTab === item.id || (item.id === 'swipe' && activeTab === 'swipe-virtual') ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="nav-item-left">
              <item.icon className="nav-icon" />
              <span style={item.id === 'swipe' ? { color: 'var(--gold)', fontWeight: 600 } : {}}>{item.label}</span>
            </div>
            {item.badge > 0 && (
              <span style={{ background: 'var(--gold)', color: '#000', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '10px' }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="ai-sidebar-btn" onClick={() => setActiveTab('chat')}>
        <Sparkles size={20} />
        <span style={{ fontWeight: 500, fontSize: '13px' }}>AI Assisting</span>
      </div>
    </div>
  );
}

function TopHeader({ searchQuery, onSearchChange }) {
  return (
    <div className="top-header">
      <div className="mobile-brand">
        <div className="brand-icon">
          <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 16 Q14 6 21 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="14" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="brand-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>UMBRELLA</div>
      </div>
      <div className="search-bar">
        <Search size={18} color="var(--text3)" />
        <input 
          className="search-input" 
          placeholder="Search location..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <X 
            size={18} 
            color="var(--text3)" 
            style={{ cursor: 'pointer' }} 
            onClick={() => onSearchChange('')} 
          />
        )}
        <SlidersHorizontal size={18} color="var(--gold)" style={{ cursor: 'pointer' }} />
      </div>
      <div className="header-actions">
        <div className="icon-btn">
          <Bell size={20} />
          <div className="badge"></div>
        </div>
        <img className="user-avatar" src="https://i.pravatar.cc/100?img=33" alt="Profile" />
      </div>
    </div>
  );
}

// --- SHARED COMPONENTS ---
function PropertyCard({ p, wide = false, onClick, yieldBadge = false, savedIds = [], onSaveToggle }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isSaved = savedIds.includes(p.id);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div 
      className={`prop-card ${wide ? 'prop-card-wide' : ''}`}
      whileHover={{ y: -10 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="prop-img-wrapper">
        <img src={p.img} className="prop-img" alt={p.title} loading="lazy" />
        <div className="prop-img-overlay"></div>
        <div className="prop-tags">
          {yieldBadge && p.yield && (
            <span className="prop-tag" style={{ background: 'rgba(46,204,122,0.2)', color: 'var(--green)', border: '1px solid var(--green)' }}>Yield {p.yield}%</span>
          )}
          {!yieldBadge && p.tags.map(t => (
            <span key={t} className={`prop-tag tag-${t}`}>{t}</span>
          ))}
        </div>
        <div className="prop-actions">
          <div className={`prop-like ${isSaved ? 'liked' : ''}`} onClick={(e) => { e.stopPropagation(); onSaveToggle && onSaveToggle(p.id); }}>
            <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
          </div>
        </div>
      </div>
      <div className="prop-details">
        <motion.div layoutId={`card-title-${p.id}`} className="prop-title" transition={{ duration: 0.2 }}>{p.title}</motion.div>
        <div className="prop-loc">{p.loc}</div>
        <div className="prop-price-row">
          <div className="prop-price">{p.price} <span>{p.priceSub}</span></div>
        </div>
        <div className="prop-specs">
          {p.bhk} BHK • {p.sqft} sq.ft
        </div>
      </div>
    </motion.div>
  );
}

function PropertyRow({ title, properties, onSelect, yieldBadge = false, savedIds, onSaveToggle }) {
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
              yieldBadge={yieldBadge} 
              savedIds={savedIds} 
              onSaveToggle={onSaveToggle} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- PAGE COMPONENTS ---

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
              <PropertyCard key={p.id} p={p} onClick={() => onSelect(p)} savedIds={savedIds} onSaveToggle={onSaveToggle} />
            ))}
          </div>
          {searchResults.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
              <Search size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p style={{ fontSize: '18px', color: 'var(--text)' }}>No properties match your search.</p>
              <p style={{ marginTop: '8px' }}>Try searching for a different location or property type.</p>
              
              <div style={{ marginTop: '32px' }}>
                <p style={{ fontSize: '13px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Popular Searches</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['Baner', 'Kharadi', 'Koregaon Park', '3 BHK', 'Under 50L'].map(term => (
                    <button 
                      key={term}
                      className="filter-pill"
                      onClick={() => onSearchChange(term)}
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
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
                )) }
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
                  )) }
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
                <button className="btn-ghost" onClick={onSwipeOpen} style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                  <Layers size={18} /> Swipe Rentals
                </button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <PropertyRow title="Top Picks For You" properties={PROPS.slice(0, 4)} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PropertyRow title="Under ₹50 Lakh" properties={PROPS.filter(p => p.price.includes('L') && parseInt(p.price.replace('₹','').replace(' L','')) <= 50)} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PropertyRow title="High Rental Yield" properties={[...PROPS].sort((a,b) => b.yield - a.yield).slice(0, 4)} onSelect={onSelect} yieldBadge={true} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PropertyRow title="New This Week" properties={PROPS.filter(p => p.tags.includes('new') || p.tags.includes('hot'))} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

function ExplorePage({ onSelect, savedIds, onSaveToggle, searchQuery }) {
  const [type, setType] = useState('rent');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedBhk, setSelectedBhk] = useState([]);
  const [maxBudget, setMaxBudget] = useState(type === 'rent' ? 100000 : 50000000);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'map', 'list'
  const [hoveredPropId, setHoveredPropId] = useState(null);
  
  useEffect(() => {
    setMaxBudget(type === 'rent' ? 100000 : 50000000);
  }, [type]);
   
  const locations = Array.from(new Set(PROPS.map(p => p.loc.split(',')[0].trim())));
  const bhkOptions = [1, 2, 3, 4];
 
  const filteredProps = PROPS.filter(p => {
    const locMatch = selectedLocations.length === 0 || selectedLocations.some(l => p.loc.includes(l));
    const bhkMatch = selectedBhk.length === 0 || selectedBhk.includes(p.bhk);
    const typeMatch = p.type === type;
    const searchMatch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.loc.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Robust budget check
    const parsePrice = (priceStr) => {
      if (!priceStr) return 0;
      // Handle ranges like "60K - 1.2L" - take the lower bound for filtering or maybe the upper?
      // Usually users want to see if it fits their budget, so we check if the minimum fits.
      const firstPart = priceStr.split('-')[0].trim();
      let val = parseFloat(firstPart.replace(/[₹,]/g, ''));
      
      if (firstPart.includes('Cr')) val *= 10000000;
      else if (firstPart.includes('Lac') || firstPart.includes('L')) val *= 100000;
      else if (firstPart.includes('K')) val *= 1000;
      
      return val;
    };

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Explore</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="mobile-only" style={{ background: 'var(--bg2)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <button 
              onClick={() => setViewMode('list')}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'list' ? 'var(--surface)' : 'transparent', color: viewMode === 'list' ? 'var(--gold)' : 'var(--text2)', cursor: 'pointer' }}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('map')}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'map' ? 'var(--surface)' : 'transparent', color: viewMode === 'map' ? 'var(--gold)' : 'var(--text2)', cursor: 'pointer' }}
            >
              Map
            </button>
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
                <div 
                  key={loc} 
                  className={`filter-pill ${selectedLocations.includes(loc) ? 'active' : ''}`}
                  onClick={() => toggleLocation(loc)}
                >
                  {loc}
                </div>
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
            <div className="filter-title">Budget (Max: ₹{maxBudget >= 10000000 ? `${(maxBudget/10000000).toFixed(1)} Cr` : maxBudget >= 100000 ? `${(maxBudget/100000).toFixed(1)} L` : `${(maxBudget/1000).toFixed(0)} K`})</div>
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
                <div 
                  key={bhk} 
                  className={`filter-pill ${selectedBhk.includes(bhk) ? 'active' : ''}`}
                  onClick={() => toggleBhk(bhk)}
                >
                  {bhk} BHK
                </div>
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
          {/* Map Pins */}
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
                    <div className="pin-popup-loc">{p.loc}</div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
          
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }} className="desktop-only">
            {filteredProps.length > 0 ? (
              <PropertyCard p={hoveredPropId ? filteredProps.find(p=>p.id===hoveredPropId) : filteredProps[0]} wide={false} onClick={() => onSelect(hoveredPropId ? filteredProps.find(p=>p.id===hoveredPropId) : filteredProps[0])} savedIds={savedIds} onSaveToggle={onSaveToggle} />
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

function SavedPage({ savedIds, onSelect, onSaveToggle }) {
  const savedProps = PROPS.filter(p => savedIds.includes(p.id));
  const [filter, setFilter] = useState('all');
  
  const filteredSaved = filter === 'all' 
    ? savedProps 
    : savedProps.filter(p => p.type === filter);
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-container">
      <div className="page-header">
        <h1 className="page-title">Saved Collection</h1>
        <div className="tabs-pill">
          <div className={`tab-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({savedProps.length})</div>
          <div className={`tab-pill ${filter === 'rent' ? 'active' : ''}`} onClick={() => setFilter('rent')}>Rentals ({savedProps.filter(p=>p.type==='rent').length})</div>
          <div className={`tab-pill ${filter === 'buy' ? 'active' : ''}`} onClick={() => setFilter('buy')}>Buy ({savedProps.filter(p=>p.type==='buy').length})</div>
        </div>
      </div>

      {filteredSaved.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--bg2)', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <Heart size={48} color="var(--border)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '24px', color: 'var(--text1)', marginBottom: '12px' }}>
            {savedProps.length === 0 ? 'Your collection is empty' : `No ${filter} properties saved`}
          </h2>
          <p style={{ color: 'var(--text3)', maxWidth: '400px', margin: '0 auto' }}>
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

function ComparePage({ savedIds, onSelect, onSaveToggle }) {
  const compareProps = PROPS.filter(p => savedIds.includes(p.id)).slice(0, 3);
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-container">
      <div className="page-header">
        <h1 className="page-title">Compare Properties</h1>
        <div style={{ color: 'var(--text3)', fontSize: '15px' }}>{compareProps.length} of 3 spots filled</div>
      </div>

      {compareProps.length < 2 ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--bg2)', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <GitCompare size={48} color="var(--border)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '24px', color: 'var(--text1)', marginBottom: '12px' }}>Add more properties</h2>
          <p style={{ color: 'var(--text3)', maxWidth: '400px', margin: '0 auto' }}>
            Save at least 2 properties to compare their features, amenities, and pricing side-by-side.
          </p>
        </div>
      ) : (
        <div className="compare-container">
          <div className="compare-header">
            <div className="compare-label-col">
              <div style={{ fontSize: '13px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Comparison</div>
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
              <div className="compare-label">Amenities</div>
              {compareProps.map(p => (
                <div key={p.id} className="compare-val amenities">
                  {p.amenities.slice(0, 3).join(', ')}
                  {p.amenities.length > 3 && ` +${p.amenities.length - 3}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ChatPage({ onSearch }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hi! I'm your AI property assistant. How can I help you find your dream home today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    
    const newMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simple mock logic
    setTimeout(() => {
      let botResponse = "I'm searching for that. Would you like to see our latest listings in that category?";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('rent') || lowerText.includes('bhk') || lowerText.includes('under')) {
        botResponse = "I've found several great rental options matching your criteria. Check the Explore page for the updated results!";
        if (onSearch) onSearch(text);
      } else if (lowerText.includes('buy') || lowerText.includes('project')) {
        botResponse = "New luxury projects are coming up! I've filtered the best ones for you on the Explore page.";
        if (onSearch) onSearch(text);
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="chat-wrapper">
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(201,168,76,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} color="var(--gold)" />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Umbrella AI</div>
            <div style={{ fontSize: '12px', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: 'var(--green)', borderRadius: '50%' }}></div>
              Always Online
            </div>
          </div>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map(m => (
          <div key={m.id} className={m.type === 'bot' ? 'msg-bot' : 'msg-user'}>
            {m.type === 'bot' && <div className="msg-avatar"><Sparkles size={16}/></div>}
            <div className="msg-bubble">
              {m.text}
              {m.id === 1 && (
                <div className="chat-suggestions">
                  {[
                    { label: "2 BHK under 30k", icon: Search },
                    { label: "Projects in Baner", icon: Building },
                    { label: "Luxury villas for sale", icon: Key },
                    { label: "Compare my saved", icon: GitCompare }
                  ].map((s, idx) => (
                    <button key={idx} className="chat-sugg-btn" onClick={() => handleSend(s.label)}>
                      <s.icon size={14} className="chat-sugg-icon"/>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="chat-input-area">
        <form className="chat-input-box" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
          <input 
            className="chat-input" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about properties, locations, or pricing..." 
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mic size={20} color="var(--text3)" style={{ cursor: 'pointer' }} />
            <button type="submit" style={{ background: 'var(--gold)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={16} color="#000" style={{ marginLeft: '-2px' }} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

// --- CORE MODALS ---
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
        <div className="swipe-card-loc"><MapPin size={14} style={{display:'inline'}}/> {p.loc}</div>
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

function DetailPage({ property, onBack, savedIds, onSaveToggle }) {
  const [activeImg, setActiveImg] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const isSaved = savedIds.includes(property.id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const gallery = property.gallery || [property.img];

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
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', zIndex: 2100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', pointerEvents: 'none' }}>
        <button className="swipe-close" onClick={onBack} style={{ pointerEvents: 'auto', width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', color: 'white', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ display: 'flex', gap: '12px', pointerEvents: 'auto' }}>
          <button style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', color: 'white', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Share2 size={20} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onSaveToggle(property.id); }}
            style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', color: isSaved ? 'var(--gold)' : 'white', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
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
        
        {/* Gallery Navigation Arrows */}
        <div className="desktop-only" style={{ position: 'absolute', top: '50%', left: '20px', right: '20px', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
          <button onClick={prevImg} style={{ pointerEvents: 'auto', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
            <ArrowLeft size={24} />
          </button>
          <button onClick={nextImg} style={{ pointerEvents: 'auto', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
            <ArrowRight size={24} />
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
                  transition: 'all 0.3s',
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

      <div className="detail-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 120px' }}>
        <div className="detail-main-grid">
          
          {/* Left Column: Info */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ background: 'var(--bg2)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ padding: '4px 12px', background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>{property.type === 'rent' ? 'For Rent' : 'For Sale'}</span>
                    {property.tags && property.tags.map(t => (
                      <span key={t} style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', border: '1px solid var(--border)' }}>{t}</span>
                    ))}
                  </div>
                  <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', marginBottom: '8px', lineHeight: 1.1, color: 'var(--text)' }}>{property.title}</h1>
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
                  <div style={{ color: 'var(--text)', fontWeight: 600 }}>{property.bhk} BHK</div>
                  <div style={{ color: 'var(--text3)', fontSize: '11px', textTransform: 'uppercase' }}>Bedrooms</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Bath size={20} color="var(--gold)" style={{ marginBottom: '8px' }} />
                  <div style={{ color: 'var(--text)', fontWeight: 600 }}>{property.bhk}</div>
                  <div style={{ color: 'var(--text3)', fontSize: '11px', textTransform: 'uppercase' }}>Bathrooms</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Square size={20} color="var(--gold)" style={{ marginBottom: '8px' }} />
                  <div style={{ color: 'var(--text)', fontWeight: 600 }}>{property.sqft}</div>
                  <div style={{ color: 'var(--text3)', fontSize: '11px', textTransform: 'uppercase' }}>Sq.Ft</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Car size={20} color="var(--gold)" style={{ marginBottom: '8px' }} />
                  <div style={{ color: 'var(--text)', fontWeight: 600 }}>1</div>
                  <div style={{ color: 'var(--text3)', fontSize: '11px', textTransform: 'uppercase' }}>Parking</div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '16px', fontFamily: "'Cormorant Garamond', serif" }}>Description</h3>
                <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: '15px' }}>
                  {property.desc} This property features premium finishes, state-of-the-art kitchen appliances, and expansive windows that offer breathtaking views and abundant natural light. Every detail has been meticulously curated to provide a sophisticated living experience.
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '22px', color: 'var(--text)', marginBottom: '20px', fontFamily: "'Cormorant Garamond', serif", display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sparkles size={20} color="var(--gold)" /> Premium Amenities
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                {property.amenities.map(a => (
                  <div key={a} style={{ background: 'var(--bg2)', padding: '16px 20px', borderRadius: '16px', fontSize: '14px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }}></div>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {property.features && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', color: 'var(--text)', marginBottom: '20px', fontFamily: "'Cormorant Garamond', serif" }}>Property Features</h3>
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
                <h4 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--text)', fontFamily: "'Cormorant Garamond', serif" }}>Schedule a Viewing</h4>
                <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Expert guidance for your premium investment</p>
              </div>

              {property.agent && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--border2)' }}>
                  <img src={property.agent.img} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)' }}>{property.agent.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>Senior Advisor</div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="btn-primary" style={{ width: '100%', padding: '18px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <Calendar size={18} /> Book Private Tour
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button className="btn-ghost" style={{ padding: '16px', borderRadius: '14px', justifyContent: 'center', gap: '8px', borderColor: 'var(--border)' }}>
                    <Phone size={18} /> Call
                  </button>
                  <button className="btn-ghost" style={{ padding: '16px', borderRadius: '14px', justifyContent: 'center', gap: '8px', borderColor: 'var(--border)' }}>
                    <MessageSquare size={18} /> WhatsApp
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border2)', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text3)', fontSize: '12px' }}>
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

      <motion.div 
        className="mobile-only" 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
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
      
      {isPointer && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.5)',
          }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}

function AnimatedBackground() {
  return (
    <div className="animated-bg">
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      <div className="bg-orb bg-orb-3"></div>
      <div className="bg-noise"></div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for properties management
  const [savedIds, setSavedIds] = useState([1, 2]); // Pre-populate some saved for demo
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

  // Switch renderer
  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomePage onSwipeOpen={() => setShowSwipe(true)} onSelect={setSelectedProperty} savedIds={savedIds} onSaveToggle={handleSaveToggle} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
      case 'explore':
        return <ExplorePage onSelect={setSelectedProperty} savedIds={savedIds} onSaveToggle={handleSaveToggle} searchQuery={searchQuery} />;
      case 'saved':
        return <SavedPage savedIds={savedIds} onSelect={setSelectedProperty} onSaveToggle={handleSaveToggle} />;
      case 'compare':
        return <ComparePage savedIds={savedIds} />;
      case 'chat':
        return <ChatPage />;
      default:
        // Default to home for Rent/Projects/More placeholders
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

export default App;
