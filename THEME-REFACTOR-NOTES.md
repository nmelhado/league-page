# Theme Refactoring Documentation

## Phase 2 Completion Summary

### What Was Accomplished

#### 1. Theme Consolidation ✅
**Before:** 392 lines of duplicated code across 2 theme files
**After:** 1 shared base file + 2 minimal config files (83 lines each)

**Files Created/Modified:**
- **NEW:** `/src/theme/_theme-base.scss` - Shared theme infrastructure
- **UPDATED:** `/src/theme/_smui-theme.scss` - Light theme (reduced from 196 to 83 lines)
- **UPDATED:** `/src/theme/dark/_smui-theme.scss` - Dark theme (reduced from 196 to 83 lines)

**Benefits:**
- Single source of truth for theme structure
- Easy to add new themes (just configure color values)
- Reduced maintenance burden
- Clear separation of structure vs. values

#### 2. Theme Architecture Improvements ✅

**Centralized Configuration:**
```scss
// Now themes are configured with just color values:
@include base.theme-variables(
  $fff: #fff,
  $eee: #eee,
  // ... just the color mappings
);
```

**Modular Mixins:**
- `theme-variables()` - Applies all CSS custom properties
- `body-styles()` - Handles body/html base styles
- `typography-styles()` - Typography configuration

#### 3. Hard-Coded Color Audit ✅

**Found 133 hard-coded color instances:**
- 90 hard-coded text colors across 30 files
- 31 hard-coded background colors across 14 files
- 12 hard-coded border colors across 11 files

**Most Common Hard-Coded Colors:**
```
Text Colors:
- #fff (10 occurrences) → var(--fff) or var(--buttonText)
- #888 (10 occurrences) → needs var(--g888) added
- #00316b (6 occurrences) → var(--blueOne)
- #920505 (4 occurrences) → var(--buttonPrimary)
- #0082c3 (3 occurrences) → var(--blueTwo)

Background Colors:
- #00316b (4 occurrences) → var(--blueOne)
- #920505 (3 occurrences) → var(--buttonPrimary)
- #0082c3 (3 occurrences) → var(--blueTwo)
```

#### 4. Sample Color Replacements ✅

**Homepage (`/src/routes/+page.svelte`):**
- Replaced 5 hard-coded colors with CSS variables
- Added brand color variables (`--heroText`, `--buttonPrimary`, `--buttonText`)
- Now properly theme-aware

---

## Current Theme Variables

### Available CSS Variables

#### Grayscale & Base Colors
```css
--fff: /* white/black depending on theme */
--f8f8f8, --f3f3f3, --eee, --ebebeb, --ddd, --d7d7d7
--ccc, --bbb, --aaa
--g999, --g555, --g444, --g333, --g111, --g000
```

#### Brand Colors
```css
--blueOne: #00316b (light) / #0082c3 (dark)
--blueTwo: #0082c3 (light) / #003c86 (dark)
--buttonPrimary: #920505 (both)
--buttonText: #fff (both)
--heroText: #000 (light) / #fff (dark)
```

#### Functional Colors
```css
--transactHeader, --draftSwapped
--waiverAdd, --waiverDrop
--bracketMatch, --matchupSelected
--headerPrimary, --borderOverride, --rivalryBack
```

#### Chart Colors
```css
--barChartOne through --barChartSix
--compBarOne, --compBarTwo, --compBarOneText, --compBarTwoText
```

#### Position Colors (Consistent across themes)
```css
--QB: #ff2a6d, --WR: #58a7ff, --RB: #00ceb8
--TE: #ffae58, --K: #bd66ff, --DEF: varies by theme
--DL: #ff795a, --LB: #6d7df5, --DB: #ff7cb6, --BN: #b6d0eb
```

---

## Remaining Work (Future Phases)

### Phase 3: Complete Hard-Coded Color Replacement

**Systematic Replacement Needed:**

1. **High Priority Files** (most occurrences):
   - `src/lib/Transactions/Transactions.svelte` (6 colors)
   - `src/lib/Managers/ManagerFantasyInfo.svelte` (7 colors)
   - `src/lib/Matchups/Matchup.svelte` (10+ colors)
   - `src/lib/Rosters/RosterRow.svelte` (6 colors)

2. **Missing Color Variables to Add:**
   - `--g888: #888` (used 10 times)
   - `--brandRed: #920505` (for consistency)
   - `--brandRedDark: #851313` (used 3 times)

3. **Replacement Strategy:**
   ```bash
   # Example replacements needed:
   color: #fff → color: var(--fff)
   color: #888 → color: var(--g888)
   color: #00316b → color: var(--blueOne)
   background: #920505 → background: var(--buttonPrimary)
   ```

### Phase 4: Component Organization (from original plan)

**Large Components to Split:**
- `RecordsAndRankings.svelte` (813 lines)
- `Matchup.svelte` (560 lines)
- `ManagerAwards.svelte` (363 lines)
- `Manager.svelte` (356 lines)

### Phase 5: Store & State Management Cleanup

**Standardize Naming:**
```javascript
// Current (inconsistent):
export const awards = writable({});
export const rostersStore = writable({});

// Proposed (consistent):
export const awardsStore = writable({});
export const rostersStore = writable({});
```

---

## How to Use the New Theme System

### Adding a New Theme

1. Create new theme file (e.g., `/src/theme/blue/_smui-theme.scss`)
2. Import base and configure colors:
```scss
@use '../theme-base' as base;
@use '@material/theme/index' as theme with (
  $primary: #your-primary,
  $secondary: #your-secondary,
  //...
);

@include base.theme-variables(
  $fff: #your-white,
  $eee: #your-light-gray,
  // ... configure all color values
);
```

3. Update `package.json` to compile the new theme
4. Link the CSS in your app

### Adding New Color Variables

1. **Add parameter to mixin in `_theme-base.scss`:**
```scss
@mixin theme-variables(
  // ... existing params
  $newColorName
) {
```

2. **Add to :root section:**
```scss
:root {
  // ... existing variables
  --newColorName: #{$newColorName};
}
```

3. **Configure in light theme (`_smui-theme.scss`):**
```scss
@include base.theme-variables(
  // ... existing values
  $newColorName: #lightvalue
);
```

4. **Configure in dark theme (`dark/_smui-theme.scss`):**
```scss
@include base.theme-variables(
  // ... existing values
  $newColorName: #darkvalue
);
```

5. **Regenerate themes:**
```bash
npm run prepare
```

---

## Testing Theme Changes

```bash
# 1. Regenerate theme CSS
npm run prepare

# 2. Build application
npm run build

# 3. Run dev server to visually test
npm run dev
```

---

## Migration Guide for Developers

### Before (Hard-coded):
```svelte
<style>
  .button {
    background: #920505;
    color: #fff;
  }
  .text {
    color: #888;
  }
</style>
```

### After (Theme-aware):
```svelte
<style>
  .button {
    background: var(--buttonPrimary);
    color: var(--buttonText);
  }
  .text {
    color: var(--g888); /* once added */
  }
</style>
```

---

## Performance Impact

**Build Time:** No significant change
**Bundle Size:** Slightly smaller due to consolidation
**Runtime:** CSS variables are native browser feature (no performance cost)

---

## Notes

- Theme position colors (QB, WR, etc.) are intentionally the same in both themes for consistency
- DEF color is the only position that varies by theme (#eee45e light, #fff67a dark)
- Brand colors (#920505) remain consistent across themes
- All typography and SMUI component styling preserved

---

*This refactoring establishes a solid foundation for future theming work and makes it significantly easier to customize the application's appearance.*
