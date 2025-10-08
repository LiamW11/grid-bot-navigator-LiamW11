const game = {
  sounds: {
    trash: new Audio("ljudeffekter/trash.mp3"),
    powerup: new Audio("ljudeffekter/powerup.mp3"),
  },

  //States för spelaren
  player: {
    x: 0,
    y: 0,
    direction: "NORTH",
  },

  score: 0,
  items: [],
  timeLeft: 30,
  gameStatus: "ready", //ready, playing, won lost
  gameInterval: null,

  //Vad roboten kan göra
  //this = might själv i objektet

  moveForward() {

    //Bestämmer var nästa steg hammnar. Detta behövs för att kolla kollidering av hinder. 
    //Ser också till att vi inte kan gå utanför rutnätet
    let nextX = this.player.x;
    let nextY = this.player.y;

    if (this.player.direction === "NORTH" && this.player.y > 0) {
      nextY--;
    } else if (this.player.direction === "EAST" && this.player.x < 9) {
      nextX++;
    } else if (this.player.direction === "SOUTH" && this.player.y < 9) {
      nextY++;
    } else if (this.player.direction === "WEST" && this.player.x > 0) {
      nextX--;
    } else {
      console.log("🚫 Kant av rutnätet!");
      return;
    }

    //Kollar ifall nästa position har ett hinder
    const isObstacle = this.items.some(
      (item) => item.x === nextX && item.y === nextY && item.type === "obstacle"
    );

    //ifall det finns ett hinder körs return istället för att flytta roboten frammåt
    if (isObstacle) {
      console.log("⚠️ Hinder i vägen! Kan inte gå!");
      return;
    }

    //Ifall inget hinder finns så flyttar vi faktiskt
    this.player.x = nextX;
    this.player.y = nextY;

    //Kolla kollision för andra föremål
    this.checkCollision();
  },

  turnRight() {
    switch (this.player.direction) {
      case "NORTH":
        this.player.direction = "EAST";
        break;
      case "EAST":
        this.player.direction = "SOUTH";
        break;
      case "SOUTH":
        this.player.direction = "WEST";
        break;
      case "WEST":
        this.player.direction = "NORTH";
        break;
    }
  },

  turnLeft() {
    switch (this.player.direction) {
      case "NORTH":
        this.player.direction = "WEST";
        break;
      case "EAST":
        this.player.direction = "NORTH";
        break;
      case "SOUTH":
        this.player.direction = "EAST";
        break;
      case "WEST":
        this.player.direction = "SOUTH";
        break;
    }
  },

  reset() {
    this.player.direction = "NORTH";
    this.player.x = 0;
    this.player.y = 0;
    //ska avbryta intervallet för gameloopen
    //ska städa upp alla föremål
    //ska ändra alla displayer till startvärden
    //ska ändra state till "ready"
  },

  getPosition() {
    return `Jag är på x:${this.player.x}, y:${this.player.y} och tittar åt ${this.player.direction}`;
  },

  checkCollision() {
    console.log("kollar efter kollision");
    //Kolla igenom alla items
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      //Är spelaren på samma position som ett item?
      //Kommer aldrig kunna samla hinder eftersom att spelarens y och x värde 
      //aldrig blir till samma som hindret
      if (this.player.x === item.x && this.player.y === item.y) {
        console.log("💥 Kollision på position:", item.x, item.y);
        //Plocka upp föremålet
        this.collectItem(i);
        return true;
      }
    }
    return false;
  },

  startGame() {
    console.log("🚀 Startar spelet...");

    //Stoppa pågående spel först
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }

    //Återställ state
    this.gameStatus = "playing";
    this.score = 0;
    this.timeLeft = 30;
    this.player.x = 0;
    this.player.y = 0;
    this.player.direction = "NORTH";

    //Spawna föremål
    this.spawnItems(5, 3, 2);
    //5 skräp, 3 hinder, 2 powerup

    //Starta game loop
    this.gameInterval = setInterval(() => {
      if (this.gameStatus !== "playing") {
        clearInterval(this.gameInterval);
        return;
      }

      //Minska tid
      this.timeLeft--;
      console.log("⏱️ Tid kvar:", this.timeLeft);

      //Kolla game over
      this.checkGameOver();
    }, 1000); //Körs varje sekund
  },

  checkGameOver() {
    //Lost ifall tiden tar slut
    if (this.timeLeft <= 0) {
      this.gameStatus = "lost";
      clearInterval(this.gameInterval);
      alert(`⏰ TIDEN ÄR UTE! Score: ${this.score}`);
      return;
    }

    //Win: allt SKRÄP är samlat (ignorera hinder och power-ups)
    const trashLeft = this.items.filter((item) => item.type === "trash").length;

    if (trashLeft === 0) {
      this.gameStatus = "won";
      clearInterval(this.gameInterval);
      alert(`🎉 DU VANN! Score: ${this.score} | Tid kvar: ${this.timeLeft}s`);
      return;
    }
  },

  playSoundEffect(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      if (soundName === "trash") {
        sound.currentTime = 0.5; //Börjar ljudet 0.5 sekunder in i filen eftersom 
        // det finns lite tystnad i ljudfilen
      } else if (soundName === "powerup") {
        sound.currentTime = 0.05; //samma princip som trash ljudet
      }
      sound.play();
    }
  },

  collectItem(index) {
    const item = this.items[index];
    console.log("📦 Interagerade med:", item.type);

    switch (item.type) {
      case "trash":
        this.score += 10;
        this.items.splice(index, 1); //Tar bort 1 objekt på det index man matar in 
        console.log("🗑️ Samlade skräp! +10p. Score:", this.score);
        this.playSoundEffect("trash");
        break;

      case "powerup":
        this.timeLeft += 5;
        this.items.splice(index, 1);
        console.log("⚡ Power-up! +5 sekunder! Tid:", this.timeLeft);
        this.playSoundEffect("powerup");
        break;

        //Tror ej denna behövs då man aldrig kan ställa sig på ett hinder och köra collectItem
        //behövs testas
      case "obstacle":
        console.log("🧱 Det här är ett hinder! Kan inte samlas.");
        break;
    }

    //Kolla game over för att kolla ifall spelaren har vunnit
    this.checkGameOver();
  },

  spawnItems(trashCount, obstacleCount, powerupCount) {
    this.items = [];

    //Kolla om position är ledig
    const isPositionFree = (x, y) => {
      if (x === this.player.x && y === this.player.y) return false;
      return !this.items.some((item) => item.x === x && item.y === y);
    };

    //Skapa skräp
    for (let i = 0; i < trashCount; i++) {
      let x, y;
      //Ger slumpmässigt x och y värde
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (!isPositionFree(x, y));

      this.items.push({ x, y, type: "trash" });
    }

    //Skapa hinder
    for (let i = 0; i < obstacleCount; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (!isPositionFree(x, y));

      this.items.push({ x, y, type: "obstacle" });
    }

    //Skapa powerups
    for (let i = 0; i < powerupCount; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (!isPositionFree(x, y));

      this.items.push({ x, y, type: "powerup" });
    }
  },
};

// Gör roboten tillgänglig för alla filer
window.game = game;
