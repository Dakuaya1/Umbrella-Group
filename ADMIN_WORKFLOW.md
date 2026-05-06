# Umbrella Property Directory - Admin Workflow

## Overview

This document describes how to manage properties in the Umbrella Property Directory. The system consists of:
- **Frontend App**: React app at `/Users/priyanshu-ai/Desktop/Umbrella`
- **Admin Panel**: Standalone admin interface at `admin.html`

## Daily Property Addition Process

### Step 1: Open Admin Panel
```
Open /Users/priyanshu-ai/Desktop/Umbrella/admin.html in a browser
```

### Step 2: Add New Property
1. Fill in property details:
   - Title (required)
   - Location (required)
   - Type: "For Rent" or "For Sale"
   - Price with ₹ symbol (e.g., "₹45 L" or "₹30,000")
   - Price Subtext (e.g., "3 BHK · 1680 sq.ft" or "/ mo")
   - BHK configuration
   - Square footage
2. Select tags by clicking (Featured, New, Premium, Hot)
3. Select amenities by clicking tags
4. Add description
5. Optionally add an image URL
6. Click "Add Property"

### Step 3: Export Data
1. Click "Export JSON" button in the admin panel
2. Save the downloaded `properties.json` file to:
   `/Users/priyanshu-ai/Desktop/Umbrella/data/properties.json`

### Step 4: Rebuild Frontend
```bash
cd /Users/priyanshu-ai/Desktop/Umbrella
npm run build
```

### Step 5: Deploy
Copy the `dist/` folder contents to your hosting (Vercel, Netlify, etc.)

## Quick Add (Without Rebuild)

For testing without rebuilding, the admin uses localStorage:
1. Add properties in admin.html → saves to localStorage
2. Run dev server with: `npm run dev`
3. Changes reflect immediately

For production, always export + rebuild.

## Property Data Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | auto | Unique ID (timestamp) |
| title | string | yes | Property name |
| loc | string | yes | Location (Area, City) |
| price | string | yes | Price with ₹ symbol |
| priceSub | string | no | e.g., "3 BHK · 1200 sq.ft" or "/ mo" |
| type | string | yes | "rent" or "buy" |
| bhk | number | yes | 1, 2, 3, 4, or 4.5 |
| sqft | number | yes | Carpet area |
| img | string | yes | Main image URL |
| gallery | array | no | Additional image URLs |
| tags | array | no | "featured", "new", "premium", "hot" |
| amenities | array | no | List of amenities |
| desc | string | no | Full description |
| yield | number | no | Rental yield % |
| agent | object | no | Agent info (name, phone, img) |
| features | array | no | Property features |
| addedDate | string | auto | YYYY-MM-DD format (auto-generated) |

## Available Tags

- **featured**: Shows gold badge on property card
- **new**: Shows green "NEW" badge
- **premium**: Shows purple "PREMIUM" badge
- **hot**: Shows pink/red "HOT" badge

## Available Amenities

- Furnished
- Fully Furnished
- Parking
- Security
- Lift
- Gym
- Pool / Swimming Pool
- Garden
- CCTV
- Power Backup
- Clubhouse

## Example Property Addition

```
Title: Azure Residence
Location: Viman Nagar, Pune
Type: For Rent
Price: ₹55,000
Price Subtext: / mo · 3 BHK
BHK: 3
Sq Ft: 1400
Tags: new, featured
Amenities: Fully Furnished, Security, Lift, Parking
Description: Premium 3BHK apartment with modern amenities...
```

## Troubleshooting

**Build fails after adding properties:**
- Check that `data/properties.json` is valid JSON
- Run `node scripts/compile-data.js` to regenerate the data file

**Admin panel not loading:**
- Ensure you're opening `admin.html` directly (not through the React app)

**Changes not appearing:**
- Rebuild after exporting: `npm run build`
- Clear browser cache

## File Locations

| File | Purpose |
|------|---------|
| `admin.html` | Admin panel for adding/editing properties |
| `data/properties.json` | Source of truth for all property data |
| `src/data/properties.js` | Auto-generated file (do not edit directly) |
| `scripts/compile-data.js` | Script that converts JSON to JS import |
| `dist/` | Production build output |

## Adding Multiple Properties

For bulk additions, you can:
1. Add properties one by one in the admin panel
2. Click "Export JSON" to get current state
3. Manually edit the JSON to add more properties
4. Replace `data/properties.json` with the edited version
5. Run `npm run build`

## Resetting Data

To reset all admin data:
```javascript
localStorage.removeItem('umbrella_admin_properties');
location.reload();
```