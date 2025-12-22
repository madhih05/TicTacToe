# Tic Tac Toe

A modern, multiplayer Tic Tac Toe game with real-time networking. Built with vanilla JavaScript, Express, and Socket.io, featuring a sleek dark blue theme and animated gameplay.

![Game Preview](https://img.shields.io/badge/Status-Active-brightgreen)

## Features

- 🎮 **Real-time multiplayer** — Play against another player over the network using WebSockets
- ✨ **Animated symbols** — CSS-based X and O with smooth draw animations
- 📱 **Responsive design** — Works on desktop and mobile devices
- 🏆 **Winner detection** — Automatically detects wins and draws
- 🔄 **Game restart** — Restart button to play again
- 🎨 **Dark blue theme** — Modern dark UI with blue accent colors and smooth hover effects
- 🎯 **Visual feedback** — Cell hover states and animated marker appearance
- 🔗 **Room-based matching** — Players join the same game room to play together

## Getting Started

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

4. Share the link with another player to join the same game room

### How to Play

1. Two players connect to the server
2. Player X goes first — click any cell to place your mark
3. Players alternate turns in real-time
4. First to get 3 in a row (horizontal, vertical, or diagonal) wins!
5. Click "Restart Game" to quit game and start a new game

## Project Structure

```
TicTacToe/
├── package.json        # Project metadata and dependencies
├── server.js           # Express server and Socket.io game logic
├── public/
│   ├── index.html      # Game markup
│   ├── script.js       # Client-side game logic and Socket.io handlers
│   └── styles.css      # Styling and animations
└── README.md           # This file
```

## Tech Stack

- **Node.js & Express** — Server framework for static file serving
- **Socket.io** — Real-time bidirectional communication
- **HTML5** — Semantic markup
- **CSS3** — Grid layout, CSS animations, custom properties, pseudo-elements for X and O markers
- **JavaScript (ES6+)** — Classes, arrow functions, async/await, DOM manipulation, WebSocket handling

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

Win detection uses sum checking: if any row/column/diagonal has the same marking that and also not empty

## License

MIT License — feel free to use and modify!
