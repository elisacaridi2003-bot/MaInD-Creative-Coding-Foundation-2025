let board;
let player;
let exitPoint;
let score = 0;
let playerX = 0;
let playerY = 0;
const size = 7;
let grid = [];
let avatarImage = 'https://images.dog.ceo/breeds/husky/n02110185_12902.jpg'; 


const moveSound = new Audio("asset/audio/move.wav");
const winSound = new Audio("asset/audio/win.wav");
moveSound.preload = "auto";
winSound.preload = "auto";

function playMoveSound() {
    moveSound.currentTime = 0;

    moveSound.play().catch(e => console.log("Audio play failed for moveSound:", e)); 
}

function playWinSound() {
    winSound.currentTime = 0;
    winSound.play().catch(e => console.log("Audio play failed for winSound:", e));
}


function showSection(sectionName) {

    let sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));

    let buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(sectionName).classList.add('active');

    document.querySelector(`[onclick="showSection('${sectionName}')"]`).classList.add('active');
    
    if (sectionName === 'settings') {
        document.getElementById('currentScore').textContent = score;
    }
}

async function loadRandomAvatar() {
    let message = document.getElementById('apiMessage');
    message.textContent = '⏳ Loading from Dog API...';

    const API_URL = 'https://dog.ceo/api/breeds/image/random';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'success') {
            avatarImage = data.message; 
            
            let img = new Image();
            img.onload = function() {
                message.textContent = '✅ Dog loaded! Start the game to see it! 🐕';
                
                if (player) {
                    player.style.backgroundImage = 'url(' + avatarImage + ')';
                }
            };
            img.onerror = function() {
                message.textContent = '❌ Error loading image. Try again!';
            };
            img.src = avatarImage;
            
        } else {
            message.textContent = '❌ API Error: Could not find a dog.';
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        message.textContent = '❌ Connection error. Check your network.';
    }
}

// RESET SCORE
function resetScore() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('currentScore').textContent = score;
    alert('Score reset to 0!');
}


// --- GAME FUNCTIONS ---

function startGame() {
    board = document.getElementById("board");
    board.innerHTML = "";
    
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    document.getElementById("score").textContent = score;
    generateGrid();
    placePlayer();
    placeExit();
}

function generateGrid() {
    grid = [];
    for (let y = 0; y < size; y++) {
        let row = [];
        for (let x = 0; x < size; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            let isWall = Math.random() < 0.25; 

            if ((x === 0 && y === 0) || (x === size - 1 && y === size - 1)) {
                isWall = false;
            }

            if (isWall) {
                cell.classList.add("wall");
                row.push(1);
            } else {
                row.push(0);
            }
            board.appendChild(cell);
        }
        grid.push(row);
    }
}

function placePlayer() {
    player = document.createElement("div");
    player.id = "player";
    
    player.style.backgroundImage = 'url(' + avatarImage + ')';

    board.appendChild(player);
    playerX = 0;
    playerY = 0;
    updatePlayerPosition();
}

function updatePlayerPosition() {
    const cellSize = board.clientWidth / size;
    const pad = cellSize * 0.05;
    player.style.width = cellSize * 0.9 + "px";
    player.style.height = cellSize * 0.9 + "px";
    player.style.left = playerX * cellSize + pad + "px";
    player.style.top = playerY * cellSize + pad + "px";
}

function placeExit() {
    exitPoint = document.createElement("div");
    exitPoint.id = "exit";
    board.appendChild(exitPoint);
    updateExitPosition();
}

function updateExitPosition() {
    const cellSize = board.clientWidth / size;
    const pad = cellSize * 0.1;
    exitPoint.style.width = cellSize * 0.8 + "px";
    exitPoint.style.height = cellSize * 0.8 + "px";
    exitPoint.style.left = (size - 1) * cellSize + pad + "px";
    exitPoint.style.top = (size - 1) * cellSize + pad + "px";
}


document.addEventListener("keydown", function (e) {
    if (!board || !grid.length || !document.getElementById('game').classList.contains('active')) return; 
    
    let newX = playerX;
    let newY = playerY;

    if (e.key === "ArrowUp") newY--;
    if (e.key === "ArrowDown") newY++;
    if (e.key === "ArrowLeft") newX--;
    if (e.key === "ArrowRight") newX++;

    if (newX < 0 || newX >= size || newY < 0 || newY >= size) return;
    if (grid[newY][newX] === 1) return;

    playerX = newX;
    playerY = newY;
    updatePlayerPosition();
    playMoveSound(); 
    checkWin();
});


function checkWin() {
    if (playerX === size - 1 && playerY === size - 1) {
        playWinSound(); 
        score++;
        document.getElementById("score").textContent = score;

        alert('YOU WIN! 🎉 Score: ' + score); 
        
        setTimeout(() => {
            startGame();
        }, 500); 
    }
}


loadRandomAvatar();