# Weekly Scheduler

A weekly shift scheduling interface built with React and Vite.

---

## Requirements

- Node.js 18+
- pnpm

If you don't have pnpm installed:
```bash
npm install -g pnpm
```

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start local dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview the production build |

---

## Project Structure

```
src/
├── components/
│   ├── AddShiftForm.jsx   # Inline form for adding a shift to a day
│   ├── DayColumn.jsx      # Single day column — header, shifts, add button
│   ├── ShiftCard.jsx      # Individual shift pill with time and duration
│   ├── Toast.jsx          # Notification stack (bottom-right)
│   └── WeekNav.jsx        # Prev / Next week navigation bar
│
├── constants/
│   └── index.js           # Static values: day names, month names, DAYS_IN_WEEK
│
├── hooks/
│   ├── useScheduler.js    # All scheduler state and actions (shifts, week offset)
│   └── useToast.js        # Toast notification queue with auto-dismiss
│
├── styles/
│   ├── global.css         # Global reset, CSS classes, hover states, responsive grid
│   └── tokens.js          # Shared JS style objects used in inline styles
│
├── utils/
│   ├── dateUtils.js       # Pure date functions: week calculation, formatting, keys
│   └── shiftUtils.js      # Pure shift functions: validation, overlap, sort, format
│
├── App.jsx                # Root component — wires hooks to components
└── main.jsx               # React entry point — mounts app, imports global CSS
```

---

## Features

- View a 7-day week (Monday – Sunday)
- Navigate between weeks with Prev / Next
- Add multiple shifts per day with start and end time
- Shifts display in chronological order
- Overlap detection — cannot add conflicting shifts
- Today's date is highlighted
- Fully responsive — 7 cols → 4 → 2 → 1 on smaller screens
- Toast notifications for validation errors

---

## Why tokens.js exists

Components use inline `style={{}}` objects which are plain JavaScript and cannot read CSS variables like `var(--color-background)`. `tokens.js` exports shared style objects so colors and spacing stay consistent across components without repeating raw values. If the project migrates to CSS classNames, `tokens.js` can be deleted and replaced with CSS variables in `global.css`.