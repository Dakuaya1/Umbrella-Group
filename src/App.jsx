import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { 
  Home, Compass, Key, Building, Heart, GitCompare, MessageSquare, 
  MoreHorizontal, Search, Bell, SlidersHorizontal, PlayCircle, Map,
  Bed, Square, MapPin, X, Sparkles, Check, Car, Bath, Maximize, Layers,
  Trash2, XCircle, Mic, Send
} from 'lucide-react';

const PROPS = [
  { id:1, title:'Skyline Residences', loc:'Baner, Pune', price:'₹1.45 Cr', priceSub:'3 BHK · 1680 sq.ft', type:'buy', bhk:3, sqft:1680, img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', tags:['featured'], amenities:['Furnished','Parking','Lift','Security'], desc:'Spacious 3 BHK with modern amenities, beautiful city view and prime location. Perfect for families and working professionals.', yield: 4.5 },
  { id:2, title:'Urban Nest', loc:'Wakad, Pune', price:'₹22,000', priceSub:'/ mo', type:'rent', bhk:2, sqft:956, img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tags:['new'], amenities:['Furnished','Parking','Security'], desc:'Modern 2 BHK apartment with contemporary design, excellent connectivity, and world-class facilities in a prime Wakad location.', yield: 6.2 },
  { id:3, title:'The Horizon Villas', loc:'Kothrud, Pune', price:'₹2.75 Cr', priceSub:'4 BHK · 3200 sq.ft', type:'buy', bhk:4, sqft:3200, img:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', tags:['premium'], amenities:['Garden','Parking','Security','Gym'], desc:'Luxurious villa offering expansive living spaces, private garden, and unparalleled privacy in the heart of Kothrud.', yield: 3.8 },
  { id:4, title:'Greenview Heights', loc:'Hinjewadi, Pune', price:'₹30,000', priceSub:'/ mo', type:'rent', bhk:3, sqft:1100, img:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', tags:['hot'], amenities:['Pool','Gym','Parking'], desc:'Premium rental near IT parks with dedicated workspace, and smart home features. The ultimate urban lifestyle.', yield: 5.6 },
  { id:5, title:'Pearl Apartments', loc:'Kothrud, Pune', price:'₹45 L', priceSub:'1 BHK · 650 sq.ft', type:'buy', bhk:1, sqft:650, img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tags:[], amenities:['Parking','Security'], desc:'Affordable and cozy 1 BHK in the heart of Kothrud. Walking distance to SNDT College and D-Mart.', yield: 4.2 },
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

function TopHeader() {
  return (
    <div className="top-header">
      <div className="search-bar">
        <Search size={18} color="var(--text3)" />
        <input className="search-input" placeholder="Search location, project or keyword" />
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
function PropertyCard({ p, wide = false, onClick, yieldBadge = false, isSaved = false, onSaveToggle }) {
  return (
    <motion.div 
      layoutId={`card-container-${p.id}`}
      className={`prop-card ${wide ? 'prop-card-wide' : ''}`}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      <div className="prop-img-wrapper">
        <motion.img layoutId={`card-img-${p.id}`} src={p.img} className="prop-img" alt={p.title} />
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
        <motion.div layoutId={`card-title-${p.id}`} className="prop-title">{p.title}</motion.div>
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
    <div style={{ marginBottom: '48px' }}>
      <div className="row-header">
        <div className="row-title">{title}</div>
        <button className="row-view-all">View all</button>
      </div>
      <div className="row-scroll">
        {properties.map((p, i) => (
          <PropertyCard key={p.id} p={p} wide={true} onClick={() => onSelect(p)} yieldBadge={yieldBadge} isSaved={savedIds.includes(p.id)} onSaveToggle={onSaveToggle} />
        ))}
      </div>
    </div>
  );
}

// --- PAGE COMPONENTS ---

function HomePage({ onSwipeOpen, onSelect, savedIds, onSaveToggle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="hero-banner">
        <img className="hero-img" src="https://images.unsplash.com/photo-1613490908575-9e6e165b4c1d?auto=format&fit=crop&w=1600&q=80" alt="Luxury Home" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find Your<br/><span>Perfect Space</span></h1>
          <p className="hero-desc">Premium properties. Trusted guidance.<br/>Better investments.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Properties</button>
            <button className="btn-ghost" onClick={onSwipeOpen} style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              <Layers size={18} /> Swipe Rentals
            </button>
          </div>
        </div>
      </div>
      
      <PropertyRow title="Top Picks For You" properties={PROPS.slice(0, 4)} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
      <PropertyRow title="Under ₹50 Lakh" properties={PROPS.filter(p => p.price.includes('L') && parseInt(p.price.replace('₹','').replace(' L','')) <= 50)} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
      <PropertyRow title="High Rental Yield Properties" properties={[...PROPS].sort((a,b) => b.yield - a.yield).slice(0, 4)} onSelect={onSelect} yieldBadge={true} savedIds={savedIds} onSaveToggle={onSaveToggle} />
      <PropertyRow title="New This Week" properties={PROPS.filter(p => p.tags.includes('new') || p.tags.includes('hot'))} onSelect={onSelect} savedIds={savedIds} onSaveToggle={onSaveToggle} />
    </motion.div>
  );
}

function ExplorePage({ onSelect, savedIds, onSaveToggle }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Explore</h1>
        <div className="tabs-pill">
          <div className="tab-pill active">Rent</div>
          <div className="tab-pill">Buy</div>
        </div>
      </div>

      <div className="explore-layout">
        <div className="explore-filters">
          <div className="filter-section">
            <div className="filter-title">Locations</div>
            <div className="filter-pills">
              <div className="filter-pill active">Baner</div>
              <div className="filter-pill">Wakad</div>
              <div className="filter-pill active">Hinjewadi</div>
              <div className="filter-pill">Kothrud</div>
              <div className="filter-pill">More</div>
            </div>
          </div>
          <div className="filter-section">
            <div className="filter-title">Budget</div>
            <div style={{ padding: '10px 0' }}>
              <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20%', right: '40%', height: '100%', background: 'var(--gold)', borderRadius: '2px' }}></div>
                <div style={{ position: 'absolute', left: '20%', top: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', background: 'var(--text)', borderRadius: '50%', border: '2px solid var(--gold)' }}></div>
                <div style={{ position: 'absolute', right: '40%', top: '50%', transform: 'translate(50%, -50%)', width: '16px', height: '16px', background: 'var(--text)', borderRadius: '50%', border: '2px solid var(--gold)' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '13px', color: 'var(--text2)' }}>
                <span>₹20k</span>
                <span>₹60k+</span>
              </div>
            </div>
          </div>
          <div className="filter-section">
            <div className="filter-title">BHK</div>
            <div className="filter-pills">
              <div className="filter-pill">1 BHK</div>
              <div className="filter-pill active">2 BHK</div>
              <div className="filter-pill">3 BHK</div>
              <div className="filter-pill">4+ BHK</div>
            </div>
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>Show 120 Properties</button>
        </div>

        <div className="explore-map">
          <div className="explore-map-overlay"></div>
          {/* Map Pins */}
          <div className="map-pin" style={{ top: '30%', left: '40%' }}>₹28K</div>
          <div className="map-pin" style={{ top: '50%', left: '60%' }}>₹22K</div>
          <div className="map-pin" style={{ top: '70%', left: '30%' }}>₹18K</div>
          <div className="map-pin" style={{ top: '20%', left: '70%' }}>₹45K</div>
          
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
            <PropertyCard p={PROPS[0]} wide={false} onClick={() => onSelect(PROPS[0])} savedIds={savedIds} onSaveToggle={onSaveToggle} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SavedPage({ savedIds, onSelect, onSaveToggle }) {
  const savedProps = PROPS.filter(p => savedIds.includes(p.id));
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Saved Properties</h1>
        <div className="tabs-pill">
          <div className="tab-pill active">Rentals ({savedProps.filter(p=>p.type==='rent').length})</div>
          <div className="tab-pill">Projects ({savedProps.filter(p=>p.type==='buy').length})</div>
        </div>
      </div>

      {savedProps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text2)' }}>
          <Heart size={64} style={{ opacity: 0.2, margin: '0 auto 20px' }} />
          <p>You haven't saved any properties yet.</p>
          <p style={{ fontSize: '13px', marginTop: '8px' }}>Swipe right on properties or tap the heart icon to save them here.</p>
        </div>
      ) : (
        <div className="saved-grid">
          {savedProps.map(p => (
            <PropertyCard key={p.id} p={p} onClick={() => onSelect(p)} isSaved={true} onSaveToggle={onSaveToggle} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ComparePage({ savedIds }) {
  const compareProps = PROPS.filter(p => savedIds.includes(p.id)).slice(0, 3);
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Compare Properties</h1>
        <button className="btn-ghost"><Trash2 size={16}/> Clear All</button>
      </div>

      {compareProps.length < 2 ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text2)' }}>
          <GitCompare size={64} style={{ opacity: 0.2, margin: '0 auto 20px' }} />
          <p>Save at least 2 properties to compare them side-by-side.</p>
        </div>
      ) : (
        <div className="compare-container">
          <div className="compare-header">
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '8px' }}>Properties Selected</div>
              <div style={{ fontSize: '24px', color: 'var(--gold)' }}>{compareProps.length}</div>
            </div>
            {compareProps.map(p => (
              <div key={p.id} style={{ position: 'relative' }}>
                <button style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>×</button>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '16px', marginBottom: '12px' }} />
                <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>{p.title}</div>
                <div style={{ color: 'var(--gold)', fontWeight: 600 }}>{p.price}</div>
              </div>
            ))}
          </div>
          
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
            <div className="compare-label">Furnished</div>
            {compareProps.map(p => <div key={p.id} className="compare-val">{p.amenities.includes('Furnished') ? 'Yes' : 'Semi'}</div>)}
          </div>
          <div className="compare-row">
            <div className="compare-label">Parking</div>
            {compareProps.map(p => <div key={p.id} className="compare-val">{p.amenities.includes('Parking') ? '1 Covered' : 'No'}</div>)}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ChatPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="chat-wrapper">
      <div className="chat-header">
        <Sparkles size={24} color="var(--gold)" />
        <div>
          <div style={{ fontSize: '18px', fontWeight: 500 }}>AI Assistant</div>
          <div style={{ fontSize: '13px', color: 'var(--green)' }}>Online</div>
        </div>
      </div>
      
      <div className="chat-messages">
        <div className="msg-bot">
          <div className="msg-avatar"><Sparkles size={18}/></div>
          <div className="msg-bubble">
            Hi Rohan 👋<br/><br/>
            How can I help you find your perfect property today?
            
            <div className="chat-suggestions">
              <button className="chat-sugg-btn">
                <Search size={16} className="chat-sugg-icon"/>
                Show me 2 BHK in Baner under ₹30,000
              </button>
              <button className="chat-sugg-btn">
                <Building size={16} className="chat-sugg-icon"/>
                Find projects near Hinjewadi
              </button>
              <button className="chat-sugg-btn">
                <Key size={16} className="chat-sugg-icon"/>
                Best rental properties for investment
              </button>
              <button className="chat-sugg-btn">
                <GitCompare size={16} className="chat-sugg-icon"/>
                Compare my saved properties
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chat-input-area">
        <div className="chat-input-box">
          <input className="chat-input" placeholder="Type your message or ask anything..." />
          <Mic size={20} color="var(--text3)" style={{ cursor: 'pointer', marginRight: '16px' }} />
          <div style={{ background: 'var(--gold)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Send size={16} color="#000" style={{ marginLeft: '-2px' }} />
          </div>
        </div>
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

function DetailPage({ property, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{ position: 'absolute', inset: 0, background: 'var(--bg)', zIndex: 100, minHeight: '100vh', paddingBottom: '100px', overflowY: 'auto' }}
    >
      <div style={{ position: 'fixed', top: 24, left: 32, zIndex: 110 }}>
        <button className="swipe-close" onClick={onBack} style={{ width: '44px', height: '44px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: 'white', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}>
          ←
        </button>
      </div>
      
      <div style={{ height: '55vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={property.img} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 40%)' }}></div>
      </div>
      
      <div style={{ padding: '0 48px', maxWidth: '1200px', margin: '-60px auto 0', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', background: 'var(--bg2)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', borderRadius: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '16px' }}>{property.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', marginBottom: '12px', lineHeight: 1.1 }}>{property.title}</h1>
            <div style={{ color: 'var(--text2)', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} /> {property.loc}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '42px', color: 'var(--gold)', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>{property.price}</div>
            <div style={{ color: 'var(--text2)', fontSize: '15px', marginTop: '4px' }}>{property.priceSub}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ flex: 2 }}>
            <h3 style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '20px', borderBottom: '1px solid var(--border2)', paddingBottom: '12px' }}>Property Overview</h3>
            <p style={{ color: 'var(--text2)', lineHeight: 1.8, marginBottom: '40px', fontSize: '15px' }}>
              {property.desc} Enjoy high-end fittings, ample natural light, and access to premium society amenities.
            </p>
            <h3 style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '20px', borderBottom: '1px solid var(--border2)', paddingBottom: '12px' }}>Amenities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {property.amenities.map(a => <div key={a} style={{ background: 'var(--bg3)', padding: '16px 20px', borderRadius: '12px', fontSize: '14px', border: '1px solid var(--border)' }}>{a}</div>)}
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', padding: '32px', borderRadius: '24px', position: 'sticky', top: '100px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '24px', textAlign: 'center' }}>Interested in this property?</h4>
              <button className="btn-primary" style={{ width: '100%', marginBottom: '16px', padding: '18px', borderRadius: '12px' }}>Schedule a Visit</button>
              <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '18px', borderRadius: '12px' }}>Contact Agent</button>
            </div>
          </div>
        </div>
      </div>
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
  
  // State for properties management
  const [savedIds, setSavedIds] = useState([1, 2]); // Pre-populate some saved for demo
  const [showSwipe, setShowSwipe] = useState(false);
  const [matchedProperty, setMatchedProperty] = useState(null);
  const [detailPageProperty, setDetailPageProperty] = useState(null);

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
        return <HomePage onSwipeOpen={() => setShowSwipe(true)} onSelect={setSelectedProperty} savedIds={savedIds} onSaveToggle={handleSaveToggle} />;
      case 'explore':
        return <ExplorePage onSelect={setSelectedProperty} savedIds={savedIds} onSaveToggle={handleSaveToggle} />;
      case 'saved':
        return <SavedPage savedIds={savedIds} onSelect={setSelectedProperty} onSaveToggle={handleSaveToggle} />;
      case 'compare':
        return <ComparePage savedIds={savedIds} />;
      case 'chat':
        return <ChatPage />;
      default:
        // Default to home for Rent/Projects/More placeholders
        return <HomePage onSwipeOpen={() => setShowSwipe(true)} onSelect={setSelectedProperty} savedIds={savedIds} onSaveToggle={handleSaveToggle} />;
    }
  };

  return (
    <div className="app-container">
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
        <TopHeader />
        
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
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
          <DetailPage property={detailPageProperty} onBack={() => setDetailPageProperty(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
