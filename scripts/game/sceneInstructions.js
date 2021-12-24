// boot scene
var sceneInstructions = new Phaser.Scene("instructions");

sceneInstructions.init = function() {

  this.fontColor = '#e9e9e9';
};

sceneInstructions.preload = function() {
	
};

sceneInstructions.create = function() {
   
  this.cameras.main.setBackgroundColor('#004a55');
  
  textInstructions0 = this.add.text(this.cameras.main.centerX, 40, "Instructions").setFontFamily(fontFamily).setFontSize(30).setColor(this.fontColor );
  textInstructions0.setOrigin(0.5, 0.5);

  textInstructions = this.add.text(15, 80, '').setFontFamily(fontFamily).setFontSize(12).setColor(this.fontColor );
  textInstructions.text = 'The object of BOBSTONES is to\nguess three things about the \nroll of a pair of dice.\n\n1. if the sum of the dice is\n   Odd or Even...... 1 point\n2. The sum \n   of the dice...... 2 points\n3. The value\n   of each dice..... 3 points\n\nThe winner is the first player\nto score 12 points. If a tie\nresults, the winner is the\nfirst player to break the tie.\n'

  //add keyboard listener
  document.addEventListener('keydown', this.handleKeyDown);  
};

sceneInstructions.handleKeyDown = function(evt) {
  
  if(soundOnOff){

    soundSelectItem.play();
  }
  
  document.removeEventListener('keydown', sceneInstructions.handleKeyDown);
  sceneInstructions.scene.start('menu');

};