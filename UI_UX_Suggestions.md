# UI/UX Brainstorming Suggestions

## I. Overall & Navigation

1.  **Visual Theme Refresh:**
    *   **Modernized Color Palette:** Update primary/accent colors. Offer light/dark/team themes.
    *   **Typography Refinements:** Use consistent, readable web fonts.
    *   **Iconography Update:** Use latest Material Icons or consider custom icons.
2.  **Enhanced Navigational Feedback:**
    *   Improve "active" state for nested menu items.
    *   Add subtle animations for sub-menu opening/closing.
    *   Ensure mobile navigation touch targets are large.
3.  **Global Search/Filter (Advanced Feature):**
    *   Consider a global search bar (players, managers, news).
4.  **Consistent Empty States:**
    *   Standardize styling for messages like "No former champs." Add icons.

## II. Homepage (`+page.svelte`)

1.  **"Current Champ" Visuals:**
    *   Enhance display with a prominent background/card. Improve hover effects.
2.  **Power Rankings & Transactions Sections:**
    *   Consider collapsible areas or "View More" links.
3.  **Blog Post Teaser (`HomePost`):**
    *   Ensure an engaging teaser with a clear "Read More" and imagery.

## III. Data-Heavy Pages (Standings, Rosters, Matchups)

1.  **Table/List Readability & Interaction:**
    *   Use alternating row colors.
    *   Ensure clear, sticky column headers.
    *   Mobile: Horizontal scrolling with cues, or card view.
    *   Add sorting (Standings) and filtering/searching (Rosters).
2.  **`Matchup.svelte` Specifics:**
    *   Clearly differentiate player projections vs. actual scores.
    *   Consider icons for performance against projections.
    *   Slightly de-emphasize "Empty" player slots.
    *   Ensure "Close Matchup" button is accessible.

## IV. Manager Profile (`Manager.svelte`)

1.  **Page Structure & Scannability:**
    *   Visually separate sections (Bio, Awards) with cards/borders.
    *   For long profiles, consider "jump to section" navigation.
2.  **Basic Info Section:**
    *   Enhance scannability with small icons for location, contact, etc.
3.  **Awards Section (`ManagerAwards.svelte`):**
    *   Display awards more visually (badge/trophy icons, grid/card layout).
4.  **Roster & Transactions on Manager Page:**
    *   Ensure clear summaries. Provide "View Full..." links.

## V. General UI Polish

1.  **Loading States (`LinearProgress`):**
    *   Ensure consistent placement, minimize layout shifts.
2.  **Button Consistency:**
    *   Maintain consistent styling for all buttons.
3.  **Accessibility (A11y):**
    *   Prioritize color contrast, ARIA attributes, keyboard navigability.
