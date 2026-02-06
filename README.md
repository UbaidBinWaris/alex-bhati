# Real Estate AI Sales Agent (MVP)

A comprehensive **AI-Powered Lead Conversion System** designed to automate the real estate sales process. This project moves beyond a static website to demonstrate a fully automated "Acquisition -> Qualification -> Booking" workflow.

## 🚀 Project Overview

The core objective is to replace manual agent follow-ups with a 24/7 intelligent system that captures, scores, and converts leads automatically.

### Key Logic Flow
1.  **Lead Acquisition:** User lands on the site and is greeted by the AI.
2.  **Smart Qualification:** AI asks intent-based questions (Budget, Location, Purpose).
3.  **Real-Time Scoring:** Leads are graded (Hot/Warm/Cold) based on responses.
4.  **Automated Booking:** High-intent leads are prompted to book a site visit instantly.
5.  **Backend "Brain":** Analyzing data and triggering automated follow-ups (WhatsApp/Email).

---

## 🏗️ Key Modules & Components

### 1. The AI Sales Agent (`components/ai/AIChatWidget.tsx`)
*   **Role:** The front-line sales interface.
*   **Features:**
    *   **Proactive Greeting:** Opens automatically to engage users.
    *   **Guided Conversation:** Uses a simulated state machine to navigate from greeting to closing.
    *   **Context Awareness:** Remembers user preferences (Budget, Plot Size).
    *   **Visual Feedback:** Typing indicators and "Thinking" states for realism.

### 2. Simulation Logic Engine (`lib/ai-simulation.ts`)
*   **Role:** The "Brain" behind the chat.
*   **Functionality:**
    *   Manages the state machine (Acquisition -> Qualification -> Recommendation -> Booking).
    *   **Lead Scoring:** [Coming in Phase 2] Calculates intent scores based on budget and urgency.
    *   **Backend Simulation:** Triggers "fake" API calls to simulate database lookups and WhatsApp API integrations.

### 3. Automated Booking System
*   **Role:** Converting interest into action.
*   **Features:**
    *   Integrated calendar slot selection within the chat.
    *   Instant confirmation feedback.
    *   Simulated sync with Google Calendar and SMS dispatch.

### 4. Admin Command Center (`app/admin-demo/page.tsx`)
*   **Role:** Proof of Value for the client.
*   **Features:**
    *   **Live Feed:** Watch AI conversations happen in real-time.
    *   **KPI Dashboard:** Track "Acquired Leads", "Qualified Conversions", and "Revenue Pipeline".
    *   **System Health:** Visual indicators that the automation is active.

### 5. Toast Notification System (`components/ui/ToastSystem.tsx`)
*   **Role:** Visualizing invisible background processes.
*   **Features:**
    *   Displays "System Logs" to the user (e.g., "Lead Synced to CRM", "WhatsApp Message Sent").
    *   Builds trust by showing *what* the system is doing behind the scenes.

---

## 🛠️ Technology Stack

*   **Framework:** Next.js 14 (App Router)
*   **Styling:** Tailwind CSS (with Glassmorphism & Modern UI principles)
*   **State Management:** React Hooks + Zustand (for global toast state)
*   **Icons:** Lucide React
*   **Language:** TypeScript

---

## 🏃‍♂️ How to Run the Demo

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

3.  **Experience the Flow:**
    *   Open `http://localhost:3000`.
    *   Interact with the **AI Widget** (bottom right).
    *   Book a visit to see the **Toast Notifications** fire.
    *   Open `http://localhost:3000/admin-demo` in a separate tab to see the backend view.

---

## 📂 Project Structure

```
├── app/
│   ├── page.tsx            # Main Landing Page (with AI Widget)
│   ├── admin-demo/         # The "Backend Brain" Dashboard
│   └── layout.tsx          # Root Layout (includes ToastContainer)
├── components/
│   ├── ai/
│   │   └── AIChatWidget.tsx # Core Chat Component
│   ├── ui/
│   │   └── ToastSystem.tsx  # Notification System
│   └── ...                 # Standard UI Components (Hero, Navbar, etc.)
├── lib/
│   └── ai-simulation.ts    # The Logic Engine & State Machine
└── docs/                   # Client Documentation
    ├── architecture_proposal.md
    └── client_presentation_script.md
```
