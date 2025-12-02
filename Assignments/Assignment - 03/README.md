
# Github repository
Assignments - 03
# Labyrinth - Escape
Assignments - 03
## Brief:
Upgrade the Assignment 02 by adding the use of data coming from an external web API. For example, fetch contents (audio, images, video, text, metadata) from online archives, AI generated contents (chatGPT API), data (weather, realtime traffic data, environmental data).
The application must have those requirements:
- The webpage is responsive
- Use a web API (you choose which one best fists for your project) to load the data and display them in the webpage
- At least one multimedia file (for user feedback interactions, or content itself)
- Develop a navigation system that allows the user to navigate different sections with related content and functionalities
## Project Description
The Maze Escape is a 7×7 grid-based mini-game where the player must reach the exit while avoiding randomly generated walls. The player’s avatar is loaded through the Dog API, making each run unique. Movement uses the arrow keys with sound feedback. Reaching the exit triggers a victory sound, increases the score, and instantly generates a new, unpredictable maze.
## Screenshot
<img src="asset/screenshots/Home.png" width="540">
<img src="asset/screenshots/Info.png" width="540">
<img src="asset/screenshots/Api load.png" width="540">
<img src="asset/screenshots/Game.png" width="540">
<img src="asset/screenshots/You win.png" width="540">

## Flow Chart:
```mermaid
flowchart TB
    start["Page Load"] --> loadAPI["loadRandomAvatar()"]
    loadAPI --> waitStart["Wait for user"]
    waitStart --> nav{"User clicks<br>navigation?"}
    nav -- Game --> gameSection@{ label: "showSection('game')" }
    nav -- Info --> infoSection@{ label: "showSection('info')" }
    nav -- Settings --> settingsSection@{ label: "showSection('settings')" }
    settingsSection --> settingsOpt{"User action<br>in settings?"}
    settingsOpt -- Load New Dog --> loadAPI
    settingsOpt -- Reset Score --> resetScore["resetScore()<br>score = 0"]
    resetScore --> waitStart
    settingsOpt -- Back to nav --> nav
    infoSection --> nav
    gameSection --> waitGameStart["Wait for Start button"]
    waitGameStart --> startBtn{"Start button<br>clicked?"}
    startBtn -- no --> waitGameStart
    startBtn -- yes --> n2["startGame()"]
    n2 --> n3["generateGrid()<br>Create 7x7 grid<br>Random walls (25%)"]
    n3 --> n4["placePlayer()<br>at (0,0)<br>with dog avatar"]
    n4 --> n5["placeExit()<br>at (6,6)<br>golden circle"]
    n5 --> n6["Wait for keydown event"]
    n6 --> gameActive{"Game section<br>active?"}
    gameActive -- no --> n6
    gameActive -- yes --> n7{"Arrow key<br>pressed?"}
    n7 -- no --> n6
    n7 -- yes --> n8["Calculate newX, newY<br>based on arrow key"]
    n8 --> n9{"Out of<br>bounds?<br>(x,y &lt; 0 or ≥ 7)"}
    n9 -- yes --> n6
    n9 -- no --> n10{"Is grid[newY][newX]<br>a wall?"}
    n10 -- yes --> n6
    n10 -- no --> n11["playerX = newX<br>playerY = newY"]
    n11 --> n12["updatePlayerPosition()<br>Move player visually"]
    n12 --> n13{"Reached exit?<br>(x=6 &amp;&amp; y=6)"}
    n13 -- no --> n6
    n13 -- yes --> n14["score++<br>Update display<br>Show alert "]
    n14 --> n15["Wait 500ms"]
    n15 --> n2
```
## Function list:
### function showSection(sectionName)
Updates the UI by showing the selected section (Game, Info, or Settings) and highlighting the corresponding navigation button. When switching to the Settings section, it also updates the score display.

### function loadRandomAvatar() (async)
Fetches a random dog image from the Dog API.
If successful, it sets the image as the player's avatar and updates the settings message. If the player is already created, its background updates in real time.

### function resetScore()
Resets the score to zero and updates both score displays (in the game and in the settings section). Shows a confirmation alert.

### function startGame()
Initializes or restarts the game board: clears the board, sets the grid layout, displays the current score, generates a new random maze, places the player and the exit. 

### function generateGrid()
Creates the 7×7 maze grid. Each cell has a 25% chance to become a wall, except for the start (0,0) and the exit (6,6). Walls are stored in a logical grid array (1 = wall, 0 = free) and also visually rendered.

### function placePlayer()
Creates the player element, assigns the current avatar image, places the player at position (0,0), and updates its visual position with updatePlayerPosition().

### function updatePlayerPosition()
Updates the player’s size and coordinates inside the board based on the current window size. This ensures the avatar scales correctly and moves smoothly to the correct cell.

### function placeExit()
Creates the exit element and positions it on the board, then calls updateExitPosition() to align it visually.

### function updateExitPosition()
Aligns the exit element inside the final cell (bottom-right of the board), scaling it based on the board size.

### function Movement Event Listener (document.addEventListener("keydown", ...))
The keyboard event (e).
Handles player movement using arrow keys. It calculates the next position and checks: boundary limits, wall collision. If the move is valid, the position updates and checkWin() is called.

### function checkWin()
Checks if the player has reached the exit cell (6,6).
If yes: increases the score, updates the score display, shows a victory alert, restarts the game after a short delay.

### function  loadRandomAvatar(); (initial call)
Runs automatically when the page loads to assign a first random avatar.

## Api documentation: Pick random image for the avatar
https://dog.ceo/dog-api/documentation/random




















