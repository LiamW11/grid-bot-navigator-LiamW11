const grid = document.getElementById("grid");
const startBtn = document.getElementById("start-btn");
const forwardBtn = document.getElementById("forward-btn");
const rightBtn = document.getElementById("right-btn");
const leftBtn = document.getElementById("left-btn");
const resetBtn = document.getElementById("reset-btn");

const timerDisplay = document.getElementById("timer-display");
const scoreDisplay = document.getElementById("score-display");
const itemsDisplay = document.getElementById("items-display");
const xDisplay = document.getElementById("x-display");
const yDisplay = document.getElementById("y-display");
const directionDisplay = document.getElementById("direction-display");

let robotElement;
let itemElements = [];

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div"); //varenda ruta
    cell.className = "grid-cell bg-gray-800 border border-gray-600";
    grid.appendChild(cell);
  }
}

function createRobot() {
  robotElement = document.createElement("div");
  robotElement.className = "robot";
  robotElement.textContent = "🤖";
  grid.appendChild(robotElement); //lägger roboten i själva rutnätet
}

function updateUI() {
  console.log("🔄 Uppdaterar UI...", game.getPosition());

  // Uppdatera robotens position med procent där varje 10% är en ruta
  robotElement.style.left = `${game.player.x * 10}%`;
  robotElement.style.top = `${game.player.y * 10}%`;

  // Uppdatera robotens rotation
  const rotations = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270,
  };

  //roterar robotbilden
  const rotation = rotations[game.player.direction];
  robotElement.style.transform = `rotate(${rotation}deg)`;

  //Skrivet ut x,y och rikting på sidan
  xDisplay.textContent = game.player.x;
  yDisplay.textContent = game.player.y;
  directionDisplay.textContent = game.player.direction;

  //Skrivet ut poäng, föremål och tid kvar på sidan
  const scoreDisplay = document.getElementById("score-display");
  const itemsDisplay = document.getElementById("items-display");
  if (scoreDisplay) scoreDisplay.textContent = game.score;
  if (itemsDisplay) itemsDisplay.textContent = game.items.length;

  //Ändrar timer färgen till röd ifall det är <= 10 sekunder kvar
  if (timerDisplay) {
    timerDisplay.textContent = game.timeLeft;
    if (game.timeLeft <= 10) {
      timerDisplay.classList.add("text-red-500");
      timerDisplay.classList.remove("text-yellow-400");
    } else {
      timerDisplay.classList.add("text-yellow-400");
      timerDisplay.classList.remove("text-red-500");
    }
  }

  //Kollar hur många av vardera föremål som är kvar och skriver ut dem på sidan
  const trash = game.items.filter((i) => i.type === "trash").length;
  const obstacles = game.items.filter((i) => i.type === "obstacle").length;
  const powerups = game.items.filter((i) => i.type === "powerup").length;
  document.getElementById("trash-left").textContent = trash;
  document.getElementById("obstacles").textContent = obstacles;
  document.getElementById("powerups").textContent = powerups;

  renderItems();
}

function renderItems() {
  //tar borta de gamla föremålen
  itemElements.forEach((element) => element.remove());
  itemElements = [];

  game.items.forEach((item) => {
    //Lägger varje föremål i en div som heter "item"
    const itemEl = document.createElement("div");
    itemEl.className = "item";

    if (item.type === "trash") {
      itemEl.textContent = "🗑️";
    } else if (item.type === "obstacle") {
      itemEl.textContent = "🧱";
      itemEl.classList.add("obstacle");
    } else if (item.type === "powerup") {
      itemEl.textContent = "⚡";
      itemEl.classList.add("powerup");
    }

    //skriver ut föremålen på sidan med liknande process som robotbilden
    itemEl.style.left = `${item.x * 10}%`;
    itemEl.style.top = `${item.y * 10}%`;

    //lägger föremålen i rutnätet och i itemElements arrayen
    grid.appendChild(itemEl);
    itemElements.push(itemEl);
  });
}

startBtn.addEventListener("click", () => {
  console.log("🎮 Start-knapp tryckt!");
  game.startGame();
  updateUI();

  const uiInterval = setInterval(() => {
    if (game.gameStatus !== "playing") {
      clearInterval(uiInterval);
      return;
    }
    updateUI();
  }, 100); //kollar ifall vi fortfarande spelar och uppdaterar UIn varenda 100 millisekunder
});

forwardBtn.addEventListener("click", () => {
  game.moveForward();
  updateUI();
});

rightBtn.addEventListener("click", () => {
  game.turnRight();
  updateUI();
});

leftBtn.addEventListener("click", () => {
  game.turnLeft();
  updateUI();
});

resetBtn.addEventListener("click", () => {
  game.reset();
  updateUI();
});

function init() {
  console.log("🚀 Initialiserar Grid-Bot Navigator...");

  createGrid();
  createRobot();
  updateUI();

  console.log("✅ Redo att navigera!");
}

init();
