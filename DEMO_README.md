# Real Estate Automated Lead Conversion System - MVP Demo

## 🎯 Overview

A complete frontend-only MVP demo showcasing an AI-powered real estate lead conversion and CRM system. Built to demonstrate automation, lead scoring, WhatsApp integration simulation, and booking management without any backend infrastructure.

## ✨ Features

### 1. **Landing Page** (`/landing`)
- Real estate styled lead capture form
- Fields: Name, Phone, Budget, Timeline, Purpose
- Real-time lead score calculation
- Success animation with redirect

### 2. **Lead Scoring System**
- Automatic intent scoring (0-100)
- Based on:
  - Budget (higher budget = higher score)
  - Timeline (shorter timeline = more urgent)
  - Purpose (Investment vs Residential)
- Status classification: High / Medium / Cold

### 3. **WhatsApp Simulation** (`/whatsapp-simulation`)
- Realistic WhatsApp UI
- Animated message delivery with delays
- Personalized messages based on lead data
- Shows lead score badge
- Call-to-action buttons

### 4. **Booking Page** (`/booking`)
- Calendar-style date selection
- Time slot picker
- Lead information display
- Booking confirmation with animation
- WhatsApp reminder scheduling simulation

### 5. **CRM Dashboard** (`/dashboard`)
- **Metrics Cards:**
  - Total Leads
  - High Intent Leads
  - Bookings
  - Conversion Rate
  
- **Charts:**
  - Lead sources distribution
  - Intent distribution
  
- **Automation Features:**
  - Old lead reactivation with progress animation
  - Follow-up automation overview
  
- **Recent leads table**
- **Upcoming bookings list**

### 6. **Leads Table** (`/leads`)
- Filterable by status (All / High / Medium / Cold)
- Detailed lead information
- Follow-up timeline modal
- Statistics cards

### 7. **Automation Demos**
- Old lead reactivation simulation
- Follow-up message timeline
- Scheduled vs sent messages tracking

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **State Management:** React Hooks + SessionStorage
- **Data:** Local JSON files (mock data)

## 📁 Project Structure

```
app/
├── page.tsx                 # Home/landing with navigation
├── landing/page.tsx         # Lead capture form
├── whatsapp-simulation/     # WhatsApp automation demo
├── booking/page.tsx         # Site visit booking
├── dashboard/page.tsx       # CRM dashboard
├── leads/page.tsx          # Leads table with filters
└── globals.css             # Global styles + animations

data/
├── leads.json              # Active leads data
├── oldLeads.json           # Inactive leads for reactivation
├── bookings.json           # Confirmed bookings
└── followups.json          # Follow-up messages

lib/
├── leadScoring.ts          # Lead scoring logic & utilities
└── whatsappMessages.ts     # Message generation functions
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🎨 Key Features Demonstrated

### Lead Scoring Algorithm
```typescript
Score Components:
- Budget: 10-30 points (based on amount)
- Timeline: 5-40 points (urgency factor)
- Purpose: 20-30 points (Investment gets higher score)

Status:
- High: 70+ points
- Medium: 40-69 points
- Cold: <40 points
```

### Automation Simulation
- WhatsApp messages appear with realistic delays (1-2 seconds)
- Progress animations for bulk operations
- Timeline visualization for follow-ups
- Status indicators (sent/scheduled)

### UI/UX Highlights
- Professional SaaS design
- Smooth transitions and animations
- Loading states
- Success confirmations
- Toast notifications
- Real estate themed colors
- Responsive layout

## 📊 Mock Data

The system includes pre-populated data:
- **6 active leads** with varying intent scores
- **4 inactive leads** for reactivation demo
- **3 confirmed bookings**
- **7 follow-up messages** (sent and scheduled)

## 🎯 Demo Flow

1. **Home Page** → Overview and navigation
2. **Landing Page** → Fill lead form
3. **Lead Scoring** → Automatic calculation
4. **WhatsApp Sim** → Watch automation
5. **Booking** → Schedule site visit
6. **Dashboard** → View all metrics
7. **Leads Table** → Manage leads
8. **Reactivation** → Bulk automation demo

## 💡 Technical Highlights

### Frontend-Only Architecture
- No API calls
- SessionStorage for temporary data
- JSON imports for static data
- Client-side state management
- Simulated async operations with timeouts

### Production-Ready UI
- Professional gradients
- Status badges
- Progress indicators
- Modal dialogs
- Responsive tables
- Interactive filters

## 🎨 Design System

**Colors:**
- Primary: Blue (600-700)
- Secondary: Purple (600-700)
- Success: Green (500-700)
- Warning: Yellow (500-700)
- Danger: Red (500-700)

**Components:**
- Cards with shadow-md/lg
- Rounded corners (xl/2xl)
- Gradient backgrounds
- Border highlights
- Hover effects

## 📝 Notes

- This is a **demo/prototype** - not connected to any backend
- All data is **mock data** stored in JSON files
- Automation is **simulated** using setTimeout
- Perfect for **client presentations** and **proof of concept**
- Can be deployed to Vercel/Netlify as-is

## 🚀 Deployment

Deploy to Vercel:
```bash
vercel
```

The app is 100% static and will work perfectly on any hosting platform.

## 📧 Contact

Built as a frontend MVP demo for real estate lead automation system.
