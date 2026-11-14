# Campus Lost & Found Portal 🎓🔍

> **"Lost something? Let's help you find it."**

A centralized, modern, and intuitive web application designed for college campuses to help students, faculty, and security personnel report, cross-reference, and recover lost belongings safely.

Built as a working frontend prototype for college **Design Thinking** reviews and project evaluations.

---

## 🌟 Key Features

### 1. 🏠 Landing & Home Page
- **Hero Presentation**: Eye-catching college theme with primary action buttons: **Report Lost Item**, **Report Found Item**, and **View Matches**.
- **Real-Time Summary Metrics**: Instant counts of total lost reports, found inventory, successfully returned belongings, and active algorithmic matches.
- **Recent Reports Feed**: Quick toggle between all reports, lost belongings, and found items.
- **Design Thinking Workflow**: 3-step intuitive explanation (01. Report → 02. Smart Match → 03. Verify & Reclaim).

### 2. 📊 Student Dashboard
- **Demo Student Persona**: Easily switch between realistic student profiles (e.g. *Alex Sharma - CSE*, *Priya Patel - ECE*, *Rohan Mehta - ME*) or create a custom profile.
- **Activity Sections**:
  - *My Lost Items*: All reports initiated by the logged-in student.
  - *My Found Items*: All turned-in possessions submitted by the student.
  - *My Possible Matches*: Algorithmic matches linked specifically to the student's reports.

### 3. 📝 Interactive Reporting Forms
- **Report Lost Item** & **Report Found Item**:
  - Fields: Item Name, Category, Colour, Location (Classroom, Library, Canteen, Laboratory, Hostel, Other), Date, and Additional Description.
  - **Live Photo Upload**: Client-side preview with base64 storage in `LocalStorage`.
  - Form validation with clear inline alerts and responsive design.

### 4. 🗂️ Search & Filterable Directories
- **Lost Belongings Directory (`/lost-items`)** & **Found Inventory (`/found-items`)**:
  - Real-time search across item name, color, keywords, and description.
  - Multi-attribute filter panel (Category, Campus Location, Status).
  - Cards showing image/placeholder, category badge, color, location, date, and status badge.

### 5. 🤖 Rule-Based Smart Matching Engine
- Automated rule-based scoring system:
  - **Category Match**: High priority (+40 pts)
  - **Colour Overlap**: Exact & shade matching (+20 pts)
  - **Campus Location**: Common zone matching (+20 pts)
  - **Keyword Tokenizer**: Identifies overlapping words in title and description (+15 pts)
  - **Date Window**: Reported within reasonable timeline (+10 pts)
- Displays matching confidence score (e.g., *90% Match*) and visual criteria checklist tags.
- Direct **"Express Interest / Claim Match"** modal enabling students to submit proof of ownership without exposing sensitive personal phone numbers.

### 6. 📄 Item Details & Claiming
- Complete view of item specifications, category, reporter metadata (privacy-safe without leaking phone numbers).
- Integrated matching section showing all correlated opposite-type reports.
- One-click shareable link copy and "Mark as Returned" action.

### 7. 🛡️ Helpdesk Admin Console (`/admin`)
- Demonstration console for campus security / student welfare evaluators.
- Search and filter all campus reports in a structured table.
- Update report statuses (`Open` ➔ `Pending` ➔ `Returned`).
- Review student claim verification requests and approve returns.
- **Reset Sample Demo Data**: Instant button to reset demo items for clean, repeatable evaluator walkthroughs.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Data Persistence**: Browser `LocalStorage` (Works 100% offline without backend, Supabase, or paid APIs)

---

## 🎨 Theme & Design System

- **Background**: Soft clean slate `#f8fafc`
- **Primary Accent**: Deep Navy Blue (`#0f2038`, `#1c3456`) representing campus trust and professionalism
- **Secondary Accent**: Vibrant Teal (`#0d9488`, `#14b8a6`) for positive recovery actions
- **Status Badges**:
  - 🔵 **Open**: Active report awaiting resolution
  - 🟡 **Under Verification**: Claim or match under review
  - 🟢 **Returned to Owner**: Successfully resolved
  - 🟣 **Claimed**: Verified by student

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Navigate to the project directory
cd campus-lost-and-found

# Install dependencies
npm install

# Start development server
npm run dev
```

The portal will run at `http://localhost:5173/`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📋 Evaluation & Demo Walkthrough Guide

1. **Homepage Overview**: Open `http://localhost:5173/` and note the live summary metrics and recent belongings.
2. **Explore Pre-Loaded Match**:
   - Notice the "Possible Matches" banner on the homepage or click **Possible Matches** in the navbar.
   - Inspect the **Blue Milton Water Bottle** (Lost at Library) paired with **Milton Steel Water Bottle** (Found at Library).
   - Click **"Express Interest / Claim Match"** to see the student verification flow.
3. **Submit a New Report**:
   - Click **Report Lost** or **Report Found**.
   - Fill in details (e.g. *Black Wireless Earphones* at *Laboratory*).
   - Submit and observe immediate notification and dynamic matching calculation.
4. **Student Dashboard**:
   - Navigate to `/dashboard` to view student-specific lost and found reports.
   - Click **"Switch / Edit Persona"** to switch demo student profiles.
5. **Admin Desk Verification**:
   - Navigate to `/admin`.
   - Update an item's status to `Returned` or approve a claim.
   - Test the **"Reset Demo Data"** button to restore the clean initial state anytime.
