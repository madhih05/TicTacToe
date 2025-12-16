# Tic Tac Toe

A clean, modern Tic Tac Toe game built with vanilla JavaScript, HTML, and CSS.

![Game Preview](https://img.shields.io/badge/Status-Complete-brightgreen)

## Features

- 🎮 **Two-player gameplay** — X and O take turns
- ✨ **Animated symbols** — SVG-based X and O with smooth draw animations
- 📱 **Responsive design** — Works on desktop and mobile devices
- 🏆 **Winner detection** — Automatically detects wins and draws
- 🔄 **Auto-reset** — Game resets automatically after a win or draw
- 🎨 **Clean UI** — Minimalist design with hover effects and status indicators

## How to Play

1. Open `index.html` in your browser
2. Player X goes first — click any cell to place your mark
3. Players alternate turns
4. First to get 3 in a row (horizontal, vertical, or diagonal) wins!
5. Game auto-resets after 2.5 seconds

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
- **CSS3** — Flexbox, Grid, animations, transitions
- **JavaScript (ES6+)** — Classes, arrow functions, DOM manipulation
- **SVG** — Scalable vector graphics for X and O symbols

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
