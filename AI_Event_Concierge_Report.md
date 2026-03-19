# AI Event Concierge: Project Report 🥂

## 🚀 My Approach to the Problem
The goal was to create a "concierge" experience that feels premium, intelligent, and effortless. Instead of forcing users through complex forms, I focused on a **Natural Language First** approach. 

By using **Gemini 1.5 Flash**, I implemented a system that doesn't just "search" for venues but actually "reasons" through the user's constraints. I designed the system to act as a **Strategic Event Architect**—taking a vague query like "I'm planning a small team dinner" and enriching it with professional justifications, cost estimates, and location specifics. 

Visually, I chose a **Serene Tech (Glassmorphism)** aesthetic. For a concierge service, the UI needs to look as premium as the advice it gives, which is why I prioritized smooth animations and a sophisticated dark theme.

## 🧠 Key Challenges Faced
Building the core logic was straightforward, but the "real world" deployment presented some interesting hurdles:

*   **The Database Pivot**: Switching from a local SQLite setup to a production PostgreSQL database on Render was a major inflection point. I had to manage the migration sync carefully to ensure that no data was lost and that the schema remained consistent across environments.
*   **The "Psycopg" Puzzle**: Modern Python environments (especially Linux-based ones like Render) can be picky with database drivers. We hit a wall with `psycopg2-binary`, which I resolved by transitioning the entire project to the more modern `psycopg` (v3) driver—ensuring better long-term stability and easier deployments.
*   **The Multi-Venue Shift**: Initially, the system was built for a single "best" suggestion. Expanding this to support multiple venues involved a full-stack refactor—from the LLM prompt structure to the database relationship and finally the React UI grid—all while keeping the history functionality backwards-compatible.

## 🔮 Possible Improvements & Future Scope
While the current version is a powerful MVP, there is a lot of room for growth:

*   **Live Data Integration**: Connecting to real-world APIs like Google Maps for live traffic/location data or Yelp for real-time reviews would add another layer of trust.
*   **User Personalization**: Implementing authentication would allow the AI to remember user preferences (e.g., "always suggest vegan-friendly spots" or "prefer downtown locations").
*   **Direct Booking & Calendar Sync**: The ultimate concierge experience would include a "Book Now" button that syncs the event details directly to a Google or Outlook calendar.
*   **Collaborative Planning**: Allowing users to share a proposal link with teammates for voting or comments would make it a true corporate tool.

---
**Report generated for the AI Event Concierge project**
