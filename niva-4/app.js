// app.js
// Din uppgift: Koppla ihop robot-logiken med gränssnittet!

// === STEG 1: Hämta referenser till DOM-element ===

const grid = document.getElementById('grid');
const forwardBtn = document.getElementById('forward-btn');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');
const resetBtn = document.getElementById('reset-btn');

const xDisplay = document.getElementById('x-display');
const yDisplay = document.getElementById('y-display');
const directionDisplay = document.getElementById('direction-display');

// TODO: Skapa en variabel för robot-elementet (du behöver skapa detta element!)
let robotElement;
let itemElements = [];


// === STEG 2: Skapa rutnätets celler ===

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell bg-gray-800 border border-gray-600';
    grid.appendChild(cell);
  }
};

// === STEG 3: Skapa robot-elementet ===

function createRobot() {
  // TODO: Skapa ett div-element för roboten
  // Tips: Det ska vara positionerat absolut eller använda CSS Grid
  
  robotElement = document.createElement('div');
  robotElement.className = 'robot';
  robotElement.textContent = '🤖';
  robotElement.style.position = 'absolute justify-center'; // Eller använd CSS Grid positioning
  
  // TODO: Lägg till robotElement i DOM:en
   grid.appendChild(robotElement); // eller motsvarande
}


// === STEG 4: Huvudfunktionen - updateUI() ===

/**
 * Denna funktion läser av robot.x, robot.y och robot.direction
 * och uppdaterar gränssnittet så det matchar
 */
function updateUI() {
  console.log('🔄 Uppdaterar UI...', game.getPosition());
  
  // TODO: Uppdatera robotens position i rutnätet
  // Tips för CSS Grid:
robotElement.style.gridColumnStart = game.player.x + 1;
robotElement.style.gridRowStart = game.player.y + 1;
  
  // TODO: Uppdatera robotens rotation baserat på direction
  // Tips: Använd ett objekt som "lookup table"
  const rotations = {
    'NORTH': 0,
    'EAST': 90,
    'SOUTH': 180,
    'WEST': 270
  };
  
   const rotation = rotations[game.player.direction];
   robotElement.style.transform = `rotate(${rotation}deg)`;
   console.log(`Just nu är den roterad ${rotation}`);
  
  // TODO: Uppdatera status-displayen
   xDisplay.textContent = game.player.x;
   yDisplay.textContent = game.player.y;
   directionDisplay.textContent = game.player.direction;

    const scoreDisplay = document.getElementById("score-display");
  const itemsDisplay = document.getElementById("items-display");

  if (scoreDisplay) scoreDisplay.textContent = game.score;
  if (itemsDisplay) itemsDisplay.textContent = game.items.length;

  // Rita om items
  renderItems();

}

function renderItems() {
  itemElements.forEach((el) => el.remove());
  itemElements = [];

  game.items.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "item";
    itemEl.textContent = "🗑️";
    
    // Ta bort inversionen av y
    itemEl.style.gridColumn = item.x + 1;
    itemEl.style.gridRow = item.y + 1;
    
    grid.appendChild(itemEl);
    itemElements.push(itemEl);
  });
}

// === STEG 5: Koppla knappar till robot-metoder ===

// TODO: Lägg till event listeners på knapparna
// Varje knapp ska:
// 1. Anropa motsvarande robot-metod
// 2. Anropa updateUI() för att visa förändringen

// Exempel:
forwardBtn.addEventListener('click', () => {
  // Kolla gränser baserat på riktning
  if (game.player.y === 0 && game.player.direction === 'NORTH') {
    alert('Kan inte gå utanför rutnätet');
  } else if (game.player.x === 0 && game.player.direction === 'WEST') {
    alert('Kan inte gå utanför rutnätet');
  } else if (game.player.x === 9 && game.player.direction === 'EAST') {
    alert('Kan inte gå utanför rutnätet');
  } else if (game.player.y === 9 && game.player.direction === 'SOUTH') {
    alert('Kan inte gå utanför rutnätet');
  } else {
    game.moveForward();
    updateUI();
  }
});
 rightBtn.addEventListener('click', () => {
   game.turnRight();
   updateUI();
 });

 leftBtn.addEventListener('click', () => {
   game.turnLeft();
   updateUI();
 });
// TODO: Lägg till för rightBtn och leftBtn också

// TODO: Reset-knappen ska återställa roboten och uppdatera UI
 resetBtn.addEventListener('click', () => {
   game.reset();
   updateUI();
 });


// === STEG 6: Initialisering ===

// Denna funktion körs när sidan laddas
function init() {
  console.log('🚀 Initialiserar Grid-Bot Navigator...');
  
  createGrid();
  createRobot();
  updateUI(); // Se till att UI matchar initial state
  
  console.log('✅ Redo att navigera!');
}

// Kör init när DOM:en är laddad
init();
