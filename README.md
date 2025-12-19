# Tic Tac Toe

A modern, animated Tic Tac Toe game built with vanilla JavaScript, HTML, and CSS featuring a sleek dark blue theme.

![Game Preview](https://img.shields.io/badge/Status-Complete-brightgreen)

## Features

- 🎮 **Two-player gameplay** — X and O take turns
- ✨ **Animated symbols** — CSS-based X and O with smooth draw animations
- 📱 **Responsive design** — Works on desktop and mobile devices
- 🏆 **Winner detection** — Automatically detects wins and draws
- 🔄 **Manual restart** — Restart button in the top right corner
- 🎨 **Dark blue theme** — Modern dark UI with blue accent colors and smooth hover effects
- 🎯 **Visual feedback** — Cell hover states and animated marker appearance

## How to Play

1. Open `index.html` in your browser
2. Player X goes first — click any cell to place your mark
3. Players alternate turns
4. First to get 3 in a row (horizontal, vertical, or diagonal) wins!
5. Click "Restart Game" to play again, or wait for auto-reset after 2 seconds

## Project Structure

```
TicTacToe/
├── index.html    # Game markup
├── styles.css    # Styling and animations
├── script.js     # Game logic and UI wiring
└── README.md     # This file
```

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Grid layout, CSS animations, custom properties, pseudo-elements for X and O markers
- **JavaScript (ES6+)** — Classes, arrow functions, async/await, DOM manipulation
- **Google Fonts** — Roboto font family

## Design

- **Color Palette**: Dark blue theme with cyan and light blue accents
  - Background: `#0b1220`
  - Cells: `#0e1a2f`
  - X markers: `#60a5fa` (light blue)
  - O markers: `#22d3ee` (cyan)
  - Hover state: `#173453` with blue border
- **Animations**: CSS keyframe animations for drawing X and O symbols
- **Typography**: Roboto font from Google Fonts

## Game Logic

The board is represented as a flat array of 9 cells:

```
 0 | 1 | 2
-----------
 3 | 4 | 5
-----------
 6 | 7 | 8
```

- `1` represents X
- `-1` represents O  
- `0` represents an empty cell

Win detection uses sum checking: if any row/column/diagonal sums to `3`, X wins; if `-3`, O wins.

## Running Locally

Simply open the `index.html` file in any modern browser:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Or with Node.js
npx serve .
```

Then visit `http://localhost:8000`

## License

MIT License — feel free to use and modify!
