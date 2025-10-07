// robot.js

const game = {
  sounds: {
    trash: new Audio('ljudeffekter/trash.mp3'),
    powerup: new Audio('ljudeffekter/powerup.mp3')
  },


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
  let nextX = this.player.x;
  let nextY = this.player.y;

  if (this.player.direction === 'NORTH' && this.player.y > 0) {
    nextY--;
  } else if (this.player.direction === 'EAST' && this.player.x < 9) {
    nextX++;
  } else if (this.player.direction === 'SOUTH' && this.player.y < 9) {
    nextY++;
  } else if (this.player.direction === 'WEST' && this.player.x > 0) {
    nextX--;
  } else {
    alert('🚫 Kant av rutnätet!');
    return; // Utanför rutnätet
  }

   // 2. NYTT: Kolla om nästa position har ett hinder
  const isObstacle = this.items.some(item =>
    item.x === nextX && item.y === nextY && item.type === 'obstacle'
  );

  if (isObstacle) {
    console.log('⚠️ Hinder i vägen! Kan inte gå!');
    return; // STOPPA - gå inte
  }

  // 3. Om allt OK: NU flyttar vi faktiskt
  this.player.x = nextX;
  this.player.y = nextY;

  // 4. Kolla kollision (för trash och powerups)
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
      this.collectItem(i);
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
  this.spawnItems(5, 3, 2);
  //5 skräp, 3 hinder, 2 powerup 

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
  // Lose: tiden slut
  if (this.timeLeft <= 0) {
    this.gameStatus = 'lost';
    clearInterval(this.gameInterval);
    alert(`⏰ TIDEN ÄR UTE! Score: ${this.score}`);
    return;
  }

  // Win: allt SKRÄP är samlat (ignorera hinder och power-ups!)
  const trashLeft = this.items.filter(item => item.type === 'trash').length;

  if (trashLeft === 0) {
    this.gameStatus = 'won';
    clearInterval(this.gameInterval);
    alert(`🎉 DU VANN! Score: ${this.score} | Tid kvar: ${this.timeLeft}s`);
    return;
  }
},

playSoundEffect(soundName) {
  const sound = this.sounds[soundName];
  if (sound) {
    if (soundName === 'trash') {
      sound.currentTime = 0.5;
    } else if (soundName === 'powerup') {
      sound.currentTime = 0.05;
    }
    sound.play();
  }
},


collectItem(index) {
  const item = this.items[index];
  console.log('📦 Interagerade med:', item.type);

  switch(item.type) {
    case 'trash':
      this.score += 10;
      this.items.splice(index, 1);
      console.log('🗑️ Samlade skräp! +10p. Score:', this.score);
      this.playSoundEffect('trash');
      break;

    case 'powerup':
      this.timeLeft += 5;
      this.items.splice(index, 1);
      console.log('⚡ Power-up! +5 sekunder! Tid:', this.timeLeft);
      this.playSoundEffect('powerup');
      break;

    case 'obstacle':
      // Hinder kan inte samlas - gör inget!
      console.log('🧱 Det här är ett hinder! Kan inte samlas.');
      break;
  }

  // Kolla game over (för att kolla win condition)
  this.checkGameOver();
},

spawnItems(trashCount, obstacleCount, powerupCount) {
  this.items = [];

  // Hjälpfunktion för att kolla om position är ledig
  const isPositionFree = (x, y) => {
    if (x === this.player.x && y === this.player.y) return false;
    return !this.items.some(item => item.x === x && item.y === y);
  };

  // Skapa skräp
  for (let i = 0; i < trashCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isPositionFree(x, y));

    this.items.push({ x, y, type: 'trash' });
  }

  // Skapa hinder
  for (let i = 0; i < obstacleCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isPositionFree(x, y));

    this.items.push({ x, y, type: 'obstacle' });
  }

  // Skapa power-ups
  for (let i = 0; i < powerupCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isPositionFree(x, y));

    this.items.push({ x, y, type: 'powerup' });
  }
}

};

// Gör roboten tillgänglig globalt för testning
window.game = game;
