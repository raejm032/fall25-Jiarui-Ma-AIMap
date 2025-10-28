# AI Map Project

### Overview
The **AI Map Project** explores a conversational and intelligent way to interact with digital maps.  
Instead of typing exact destinations or addresses, users can describe their trip in natural, everyday language — for example:  
> “Start from home, stop by Starbucks, then go to the Morgan Building.”

The AI system (to be implemented later) will analyze this input, extract destinations, and plan an optimized route using integrated map and chat APIs.

---

## 🧭 Architecture Decision

### **Option Chosen: Option C — Hybrid**
I chose **Option C (Hybrid)** because it provides the flexibility of both multi-page and dynamic single-page design.  
This structure best supports the long-term goal of the project — combining **AI-driven chat interaction** with **interactive map visualization**.

**Reasons for choosing Option C:**
1. The project requires multiple distinct sections (Home, About, Contact) for clarity and structure.  
2. The **Map page** needs interactive elements (chat + map layout) that can dynamically show or hide sections (e.g., chat results, route visualization).  
3. Option C allows for incremental API integration later (e.g., OpenAI API for language understanding, Google Maps API for routing).  
4. It balances organization (multi-page) and interactivity (in-page dynamic updates).

---

## 📄 Project Structure

/AImapProject
│
├── index.html ← Home page introducing the concept
├── map.html ← Core interactive page (hybrid structure: chatbox + map + AI output area)
├── about.html ← Project overview and goals
├── contact.html ← Contact information and links
├── style.css ← Shared styling across all pages (Morandi-inspired theme)
└── script.js ← Script controlling hybrid interactions on the Map page

---

## 🧱 Pages & Sections

| Page | Description | Type |
|------|--------------|------|
| **Home (index.html)** | Welcomes users, introduces the AI Map concept | Static |
| **Map (map.html)** | Contains chat interface + simulated map + sample AI route planning output | **Hybrid (show/hide)** | 
| **About (about.html)** | Explains project goals and inspiration | Static |
| **Contact (contact.html)** | Provides contact form and developer information | Static |

---

## 🚗 Navigation Flow

- The **top navigation bar** is consistent across all pages (`Home`, `Map`, `About`, `Contact`).
- Users can:
  - Start from **Home**, learn about the concept
  - Click **Map** to interact with the AI + map hybrid page
  - Visit **About** to read more about the project’s purpose
  - Go to **Contact** to reach out or provide feedback
- Within the **Map page**, users can:
  - Enter trip descriptions into a chatbox
  - See mock data of extracted locations and route suggestions
  - Switch between sections (chat/map/results) dynamically without leaving the page

---


## ⚙️ Anticipated Challenges

1. **AI Integration** – connecting Chat API (e.g., OpenAI or Azure) to interpret natural language.  
2. **Map API Integration** – incorporating APIs like Google Maps or Leaflet for live route visualization.  
3. **Data Synchronization** – linking conversational outputs with map rendering logic.  

---

## 🧩 Future Development

- Integrate live speech-to-text for trip description.
- Connect with real AI APIs for natural language parsing.
- Display dynamic map routes and directions.
- Add user history tracking for frequent routes.


