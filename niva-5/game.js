// robot.js

const game = {
  // STATE - Vad roboten kommer ihåg
  player: {
  x: 0,
  y: 0,
  direction: 'NORTH'
  },
  
  score: 0,
  items: [],
  timeLeft: 30,
  gameStatus: "ready", //ready, playing, won lost
  gameInterval: null,


  // ACTIONS - Vad roboten kan göra

 moveForward() {
  switch (this.player.direction) {
    case 'NORTH':
      this.player.y--;  // Går uppåt (mot rad 0)
      break;
    case 'EAST':
      this.player.x++;  // Går höger
      break;
    case 'SOUTH':
      this.player.y++;  // Går nedåt (mot rad 9)
      break;
    case 'WEST':
      this.player.x--;  // Går vänster
      break;
  }
  
  this.checkCollision();
},

  turnRight() {
    switch (this.player.direction) {
  case 'NORTH':
    this.player.direction = 'EAST';
    break;
  case 'EAST':
    this.player.direction = 'SOUTH';
    break;
  case 'SOUTH':
    this.player.direction = 'WEST';
    break;
  case 'WEST':
    this.player.direction = 'NORTH';
    break;
};
  },

  turnLeft() {
    switch (this.player.direction) {
  case 'NORTH':
    this.player.direction = 'WEST';
    break;
  case 'EAST':
    this.player.direction = 'NORTH';
    break;
  case 'SOUTH':
    this.player.direction = 'EAST';
    break;
  case 'WEST':
    this.player.direction = 'SOUTH';
    break;
};
  },

  reset(){
    this.player.direction = 'NORTH';
    this.player.x = 0;
    this.player.y = 0;
  },
  /**
   * Returnerar en beskrivning av robotens position
   * @returns {string} Beskrivning av position och riktning
   */
  getPosition() {
    return `Jag är på x:${this.player.x}, y:${this.player.y} och tittar åt ${this.player.direction}`;
  },
// this = might själv i objektet
checkCollision() {
  console.log("kollar efter kollision")
  // Loopa igenom alla items
  for (let i = 0; i < this.items.length; i++) {
    const item = this.items[i];

    // Är spelaren på samma position som ett item?
    if (this.player.x === item.x && this.player.y === item.y) {
      console.log('💥 Kollision på position:', item.x, item.y);
      // Samla upp skräpet!
      this.collectTrash(i);
      return true;
    }
  }
  return false;
},

startGame() {
  console.log('🚀 Startar spelet...');

  // Stoppa eventuellt pågående spel först
  if (this.gameInterval) {
    clearInterval(this.gameInterval);
  }

  // Återställ state
  this.gameStatus = 'playing';
  this.score = 0;
  this.timeLeft = 30;
  this.player.x = 0;
  this.player.y = 0;
  this.player.direction = 'NORTH';

  // Spawna items
  this.spawnItems(5);

    // Starta game loop
  this.gameInterval = setInterval(() => {
    if (this.gameStatus !== 'playing') {
      clearInterval(this.gameInterval);
      return;
    }

    // Minska tid
    this.timeLeft--;
    console.log('⏱️ Tid kvar:', this.timeLeft);

    // Kolla game over
    this.checkGameOver();
  }, 1000); // 1000ms = 1 sekund
},
  
checkGameOver() {
  // Kolla om tiden är slut (LOSE condition)
  if (this.timeLeft <= 0) {
    this.gameStatus = 'lost';
    clearInterval(this.gameInterval);
    alert(`⏰ TIDEN ÄR UTE! Score: ${this.score} / 50`);
    return;
  }

  // Kolla om alla items är samlade (WIN condition)
  if (this.items.length === 0) {
    this.gameStatus = 'won';
    clearInterval(this.gameInterval);
    alert(`🎉 DU VANN! Score: ${this.score} | Tid kvar: ${this.timeLeft}s`);
    return;
  }
},

collectTrash(index) {
  console.log('🗑️ Samlade skräp! Index:', index);
  this.score += 10;
  this.items.splice(index, 1);
  console.log('💰 Nytt score:', this.score);

  // Kolla win condition direkt (för snabb respons)
  this.checkGameOver();
},

spawnItems(count) {
  this.items = [];

  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    // Kolla om positionen redan används av spelare
    if (x === this.player.x && y === this.player.y) {
      i--; // Försök igen
      continue;
    }

    // Kolla om positionen redan används av annat item
    const positionTaken = this.items.some(item =>
      item.x === x && item.y === y
    );

    if (positionTaken) {
      i--; // Försök igen
      continue;
    }

    this.items.push({ x, y, type: 'trash' });
  }
}

};

// Gör roboten tillgänglig globalt för testning
window.game = game;
