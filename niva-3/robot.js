// robot.js

const robot = {
  // STATE - Vad roboten kommer ihåg
  x: 0,
  y: 0,
  direction: 'NORTH',

  // ACTIONS - Vad roboten kan göra

  /**
   * Flyttar roboten ett steg framåt i den riktning den tittar
   */
  moveForward() {
    switch (this.direction) {
  case 'NORTH':
    this.y++;  // Går uppåt
    break;
  case 'EAST':
    this.x++;  // Går nedåt
    break;
  case 'SOUTH':
    this.y--;  // Går höger
    break;
  case 'WEST':
    this.x--;  // Går vänster
    break;
};
  },

  /**
   * Svänger roboten 90 grader åt höger (medurs)
   */
  turnRight() {
    switch (this.direction) {
  case 'NORTH':
    this.direction = 'EAST';
    break;
  case 'EAST':
    this.direction = 'SOUTH';
    break;
  case 'SOUTH':
    this.direction = 'WEST';
    break;
  case 'WEST':
    this.direction = 'NORTH';
    break;
};
  },

  /**
   * Svänger roboten 90 grader åt vänster (moturs)
   */
  turnLeft() {
    switch (this.direction) {
  case 'NORTH':
    this.direction = 'WEST';
    break;
  case 'EAST':
    this.direction = 'NORTH';
    break;
  case 'SOUTH':
    this.direction = 'EAST';
    break;
  case 'WEST':
    this.direction = 'SOUTH';
    break;
};
  },

  reset(){
    this.direction = 'NORTH';
    this.x = 0;
    this.y = 0;
  },
  /**
   * Returnerar en beskrivning av robotens position
   * @returns {string} Beskrivning av position och riktning
   */
  getPosition() {
    return `Jag är på x:${this.x}, y:${this.y} och tittar åt ${this.direction}`;
  }
};

// Gör roboten tillgänglig globalt för testning
window.robot = robot;
