# ANVESHAN – Discover Beyond the Famous (Ambala, Haryana)

An editorial, premium-quality local tourism discovery web application dedicated to uncovering the lesser-known historical, spiritual, and cultural landmarks of **Ambala, Haryana**.

---

## 🌟 The Vision

Tourists traveling through Ambala typically encounter it solely as a transit railway junction or military cantonment along National Highway 44 (the historic Grand Trunk Road). They regularly miss:
- The quiet **1843 European Cemetery** holding 1857 mutiny graves and South African Boer War POW memorials.
- The **1857 Kranti Udyan**, commemorating the mutiny that erupted in Ambala **9 hours before Meerut** on the morning of May 10, 1857.
- The ancestral childhood home of Mata Gujri Ji and early training grounds of Sri Guru Gobind Singh Ji at **Gurudwara Lakhnaur Sahib**.
- The sacred miracle site of 8th Guru Sri Guru Harkrishan Sahib Ji at **Gurudwara Panjokhara Sahib**.
- The ancient **Bhawani Amba Temple**, from which Ambala derives its historic name (*Amba-Wala*).
- **Ambala Cloth Market**, one of Asia’s largest wholesale & bridal textile epicenters with over a thousand heritage shops.
- Atmospheric 1857 **St. Paul’s Gothic Church Ruins** and 1848 **Holy Redeemer Church**.
- The authentic 1840s culinary traditions of **Halwai Bazaar Desi Ghee Jalebis**, **Khurchan**, and **Rawal Pindi Chhole Bhature**.

---

## 🚀 Key Features

### 1. Home / Discover
- **Editorial Travel-Magazine Aesthetic**: Deep forest green (`#0E221A`, `#142F25`), warm ivory linen backgrounds (`#FAF7F2`, `#FDFBF7`), subtle saffron/terracotta accents (`#C3532B`, `#D96B27`), serif typography (*Playfair Display*), and clean sans-serif (*Plus Jakarta Sans*).
- **Real-Time Search**: Search by name, Hindi script, historical tags, or locality with zero latency.
- **Categorical Exploration**: Filter by *Heritage*, *Spiritual*, *Culture*, *Shopping (Bazaars)*, and *Nature & Lakes*.
- **Zone Filtering**: Separate and explore between *Ambala Cantt*, *Ambala City*, and *Ambala Rural*.
- **Hidden Gems Toggle**: One-click filter to display only lesser-known destinations.
- **Featured Hidden Gems & Thematic Trails**: Pre-curated circuits including the *1857 Ambala Revolt Trail*, *Sacred Gurus Circuit*, *Silk & Savor Bazaar Walk*, and *Hidden Sanctuaries*.

### 2. Destination Details Dossier
Each destination modal provides comprehensive, verified information:
- Curated photography with image fallback handling.
- Name and Hindi script.
- Verified historical or cultural narrative (cross-referenced with Ambala District Gazetteers and Haryana Tourism).
- Key Highlights checklist with curated significance points.
- Architectural style and historical period.
- Practical Dossier: Timings, entry fee, visit duration, dress code etiquette, photography guidelines, accessibility, and ideal traveler profile.
- Official source citation linking to `ambala.gov.in` and `haryanatourism.gov.in`.
- One-click Google Maps directions.
- "Save to Favourites" and "Mark as Visited" with star rating and personal travel note.
- "Add to Smart Itinerary" action.

### 3. Smart Itinerary Builder
- **Transparent Rule-Based Recommendation Algorithm**:
  - Computes real **Haversine distances** between Ambala coordinates.
  - Accounts for the ~8.5 km transit gap between Ambala Cantonment and Ambala City, clustering stops geographically to eliminate wasteful backtracking.
  - Time budgets: **2 Hours** (Express, 2 stops), **4 Hours** (Half-Day, 3 stops), **Full Day** (8 Hours, 4-5 curated stops).
  - Multi-interest selection and budget filtering (100% Free / Community Hospitality option).
  - Mode selection: *Car / Cab* vs *Walking / E-Rickshaw*.
- **Interactive Sequence Control**:
  - Reorder stops using Move Up (↑) and Move Down (↓) buttons with instant timeline recalculation.
  - Remove unwanted stops with automatic timing readjustment.
  - Add additional destinations from available inventory.
  - Multi-stop sequential Google Maps route link.
  - Export / Print-friendly view.
  - Save customized itinerary directly to the Travel Passport.

### 4. Travel Passport & Milestone Badges
- **Exploration Level**: Dynamic status titles ranging from *Armchair Explorer* to *Grand Anveshak (Master Voyager)* based on discovery progress.
- **8 Collector Badges**:
  - 🧭 *Ambala Explorer* (First visit logged)
  - 🛡️ *1857 Chronicler* (Visit European Cemetery, St. Paul's, or Kranti Memorial)
  - 🤝 *Sacred Seeker* (Visit 2+ Gurudwaras or Temples)
  - 💎 *Hidden Gem Hunter* (Visit 2+ hidden gems)
  - 🛍️ *Bazaar Maestro* (Visit Cloth Market or Sadar Bazaar)
  - 🌳 *Nature Sojourner* (Visit Rani Ka Talab or Bose Park)
  - 🏛️ *Heritage Custodian* (Visit 4+ heritage sites)
  - 👑 *Grand Anveshak* (Master traveler: 6+ sites visited)
- **Zero-Dependency Confetti Burst**: Rewarding animations when badges are unlocked.
- **Personal Visited Logbook**: Stores visit dates, personal memories, and star ratings.
- **Persistent LocalStorage**: Automatically synchronizes to browser storage; includes JSON export backup and data reset options.

### 5. Interactive Spatial Map & Culinary Guide
- **Spatial Schematic Guide**: Visual representation of the Cantonment vs Old City clusters along the NH-44 highway.
- **Interactive Map Pins**: Click any pin to inspect the destination dossier and open maps.
- **Food Guide**: Verified spots for Ambala's famous *Desi Ghee Jalebi*, *Amritsari/Rawal Pindi Chhole Bhature*, *Khurchan*, and *Cloth Market Chaat*.

---

## 🛠️ Tech Stack

- **React 18** (Modern hooks, functional architecture)
- **TypeScript** (Strict type definitions for destinations, itineraries, and passport)
- **Vite 5** (Fast bundling and hot module reloading)
- **Tailwind CSS** (Editorial travel palette: ivory, forest green, saffron)
- **Lucide Icons** (`lucide-react`)
- **Zero Paid APIs**: Pure client-side calculations, open Google Maps deep links, and LocalStorage persistence.

---

## 💻 Running the Application

### Development Server:
```bash
cd C:\Users\ST\.gemini\antigravity\scratch\anveshan-ambala
npm run dev
```

### Production Build:
```bash
npm run build
npm run preview
```
All production builds have been verified with `tsc && vite build` passing with 0 errors.
