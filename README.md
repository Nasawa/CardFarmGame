# CardFarmGame

A browser-based farming RPG built with the [Crafty.js](http://craftyjs.com/) game engine. Players explore an isometric tiled world, manage a character with customizable appearance, maintain an inventory of items and apparel, and chat with other players in real time.

## What It Is

This was an early attempt at a multiplayer farming game — think Stardew Valley crossed with a card game, running entirely in the browser. The core game loop involves wandering around a tiled map, collecting items, and equipping your character with different clothing options.

The multiplayer chat works over WebSockets — players can send messages to each other while in the same game world.

## Architecture

| File | Purpose |
|------|---------|
| `game.js` | Main game logic — inventory loading, character movement, chat over WebSocket |
| `character.js` | Character creation and sprite animation (walk cycles, clothing layers) |
| `charcreate.js` | Character creation flow |
| `tiledlevel.js` | Tiled map parsing and rendering (loads `.json` map format) |
| `tilemapbuilder.js` | Map construction utilities |
| `iso.js` | Isometric rendering helpers |
| `moveto.js` | Pathfinding / movement logic |
| `multichar.js` | Handling multiple characters on screen |
| `apparel.js` / `apparel.json` | Clothing/item definitions |
| `attr.js` | Character attributes |
| `mouseface.js` | Mouse interaction helpers |
| `crafty.js` | The Crafty.js game engine (bundled) |

## How to Run

This is a plain browser game — no build step required. Drop it on a web server (or open `test.html` locally) and it should run. The multiplayer features expect a backend server handling WebSocket connections and inventory persistence via PHP endpoints (`inventory.php`).

The character appearance system loads gear from `apparel.json` and applies it as layered sprites on the Crafty entity.

## Notes

Built around 2015. Uses jQuery, Crafty.js, and a tile-based map format compatible with [Tiled](https://www.mapeditor.org/). The card game element referenced in the repo description was likely planned but the core RPG movement and customization system is what made it into the repo.
