// robot.js

const game = {
  // STATE - Vad roboten kommer ihåg
  player: {
  x: 0,
  y: 0,
  direction: 'NORTH'
  },
  
  score: 0,
  items: [
    {x:3, y:3, type:"trash"},
    {x:2, y:4, type:"trash"}
  ],
  timeLeft: 30,
  gameStatus: "ready", //ready, playing, won lost
  gameInterval: null,


  // ACTIONS - Vad roboten kan göra

  moveForward() {
    switch (this.player.direction) {
  case 'NORTH':
    this.player.y++;  // Går uppåt
    break;
  case 'EAST':
    this.player.x++;  // Går nedåt
    break;
  case 'SOUTH':
    this.player.y--;  // Går höger
    break;
  case 'WEST':
    this.player.x--;  // Går vänster
    break;
};

//kolla kollision
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

  startGame(){
    console.log("Game started");

    this.gameStatus = "playing";
    this.score = 0;
    this.timeLeft = 3;
    //starta en timer
    this.gameInterval = setInterval(() => {
      console.log(`Tid går ner, tid kvar: ${this.timeLeft}`);
      this.timeLeft--;
      //kolla ifall spelet är över
      this.checkGameOver();
    }, 1000);
  },
  
  collectTrash(index) {
  console.log('🗑️ Samlade skräp! Index:', index);

  // Öka poäng
  this.score += 10;

  // Ta bort itemet från världen
  this.items.splice(index, 1);

  console.log('💰 Nytt score:', this.score);
  console.log('📊 Items kvar:', this.items.length);

  // Kolla om spelaren vunnit
  if (this.items.length === 0) {
    alert('🎉 GRATTIS! Du samlade allt skräp! Score: ' + this.score);
  }
},

  checkGameOver(){
    //förlust om tiden tar slut
    if(this.timeLeft <= 0){
      this.gameStatus = "lost";
      clearInterval(this.gameInterval);
      alert("Tiden är slut " + this.score);
      return;
    }

    //vinst om alla items är samlade
    if(this.items.length === 0){
      this.gameStatus = "won";
      clearInterval(this.gameInterval);
      alert("Du vann! Poäng: " + this.score);
      return;
    }
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

    // NYTT: Kolla om positionen redan används av annat item
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
