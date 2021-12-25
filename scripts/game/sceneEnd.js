// end scene
var sceneEnd = new Phaser.Scene("end");
sceneEnd.init = function(){

  this.fontColor = '#e9e9e9';
}
sceneEnd.preload = function() {
	
};

sceneEnd.create = function() {

  //this.spriteSelectedItem = this.add.sprite(0,0,'selectedItem');
  //this.spriteSelectedItem.setOrigin(0.5,0.5);

  //this.cameras.main.setBackgroundColor('#004a55');
  
  textFinalScore = this.add.text(this.cameras.main.centerX, 34, "Final Score").setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
  textFinalScore.setOrigin(0.5, 0.5);

  textPuntos = this.add.text(this.cameras.main.centerX, 120, puntos).setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
  textPuntos.setOrigin(0.5, 0.5);
  
  textPlayAgain = this.add.text(this.cameras.main.centerX, 230, "Press any key to\nPlay Again").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  textPlayAgain.setOrigin(0.5, 0.5);

  //this.spriteSelectedItem.x = textPlayAgain.x;
  //this.spriteSelectedItem.y = textPlayAgain.y;  
  
  
  //add keyboard listener
  document.addEventListener('keydown', sceneEnd.handleKeyDown);

  this.input.on('pointerdown', sceneEnd.pointer_down, this);
};

sceneEnd.update = function() {
  
};

sceneEnd.handleKeyDown = function(evt) {

  document.removeEventListener('keydown', sceneEnd.handleKeyDown);
  sceneEnd.scene.start('title');
};

sceneEnd.pointer_down = function() {
  
  document.removeEventListener('keydown', sceneEnd.handleKeyDown);
  sceneEnd.scene.start('title');
};