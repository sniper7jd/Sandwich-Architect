# 🥪 Sandwich Architect

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

**Sandwich Architect** is an interactive, front-end web application that allows users to craft their perfect sandwich through a step-by-step visual interface.
It features dynamic state management, constraint validation, and a responsive UI built with Tailwind CSS.

---

## 📖 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Application Logic & Rules](#-application-logic--rules)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Code Highlights](#-code-highlights)

---

## ✨ Features

* **Step-by-Step Wizard:** Guides the user through selecting bread, patties, vegetables, and sauces.
* **Enhanced Visuals:** Replaced placeholders with high-quality PNG assets for all ingredients.
* **Dynamic State Management:** A centralized state object updates the UI instantly upon user interaction.
* **Live Summary Panel:** A sticky sidebar that tracks choices in real-time.
* **Visual Validation:**
    * Prevents users from exceeding maximum ingredient limits.
    * Disables options visually when limits are reached.
    * Warning modal for invalid build attempts.
* **Responsive Design:** Fully fluid layout using Tailwind CSS, optimized for both desktop and mobile.
* **Smooth Animations:** Custom CSS transitions for hover effects and view switching.

---

## 🛠 Tech Stack

* **HTML5:** Semantic markup structure.
* **CSS3:** Custom styling for animations + **Tailwind CSS** (via CDN) for utility classes.
* **JavaScript (ES6+):** Vanilla JS for DOM manipulation, logic, and state management.
* **Assets:** PNG images stored in the `vectors/` directory.
* **Fonts:** `Inter` font family via Google Fonts.

---

## 📏 Application Logic & Rules

The application enforces specific business logic to ensure a valid sandwich order:

| Category | Constraint | Behavior |
| :--- | :--- | :--- |
| **Patties** | Max 1 | User must select exactly one patty to finish. |
| **Vegetables** | Max 4 | User must select at least one vegetable to finish. |
| **Sauces** | Max 3 | Optional. Selection is capped at 3. |

* **Validation:** If a user tries to add a 5th vegetable, the system prevents the action and visually disables remaining vegetable cards.
* **Submission:** Clicking "Build My Sandwich" triggers a final check. If requirements (1 patty, 1+ veg) aren't met, a modal alerts the user.

---

## 🚀 Getting Started

Since this project uses a CDN for Tailwind CSS, no build step (npm/yarn) is required.

1.  **Clone or Download** the repository.
2.  **Open** `index.html` in your preferred web browser.
3.  **Note:** Ensure you have an active internet connection so the Tailwind script and fonts can load.

### Recommended Development Setup
For the best experience, use the **Live Server** extension in VS Code:
1.  Open the project folder in VS Code.
2.  Right-click `index.html`.
3.  Select "Open with Live Server".

---

## 📂 Project Structure

```text
/
├── vectors/        # PNG image assets for ingredients
├── index.html      # Main markup and Tailwind CDN import
├── sandwich.css    # Custom animations and override styles
├── sandwich.js     # Data, Logic, DOM manipulation, and State
└── README.md       # Project documentation

💡 Code Highlights

State Management

The app uses a reactive-style update pattern. Instead of manipulating the DOM in scattered functions, the state is updated centrally, and a render() function refreshes the view.
JavaScript

// From sandwich.js
let state = { selectedBread: null, selectedToppings: [], view: 'bread' };

const update = (newState) => {
    Object.assign(state, newState);
    render(); // Re-draws the UI based on the new state
};

Dynamic Asset Rendering

Ingredient cards are not hardcoded in HTML. They are generated from JavaScript data arrays, allowing for the dynamic injection of image sources from the vectors/ folder.
JavaScript

const toppings = {
    patties: [ ... ],
    vegetables: [ ... ],
    sauces: [ ... ]
};
// These are mapped to createItemCardHTML() dynamically
// referencing images like './vectors/chicken.png'
