  // end scene
var sceneEnd = new Phaser.Scene("end");
sceneEnd.init = function(){

  this.fontColor = '#e9e9e9';
  this.sky_background = [];
}
sceneEnd.preload = function() {
	
};

sceneEnd.create = function() {

  for(let i=0; i < 4; i++){
    this.sky_background[i] = this.physics.add.sprite(0, 200 * i, 'sky').setOrigin(0, 0).setFrame(i);
    this.sky_background[i].setImmovable(true);
    this.sky_background[i].body.allowGravity = false;
    this.sky_background[i].body.velocity.set(0,0);
  }

  textFinalScore = this.add.text(this.cameras.main.centerX, 34, "Your Score").setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
  textFinalScore.setOrigin(0.5, 0.5);

  textPuntos = this.add.text(this.cameras.main.centerX, 160, puntos).setFontFamily(fontFamily).setFontSize(30).setColor(this.fontColor );
  textPuntos.setOrigin(0.5, 0.5);
  
  go_to_title_text_1 = this.add.text(120, 270, "Tap,").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor);
	go_to_title_text_1.setOrigin(0.5, 0.5);
	
	go_to_title_text_2 = this.add.text(120, 280, "Click or").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor);
	go_to_title_text_2.setOrigin(0.5, 0.5);
	
	go_to_title_text_3 = this.add.text(120, 290, "Press any key").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor);
	go_to_title_text_3.setOrigin(0.5, 0.5);
	
	go_to_title_text_4 = this.add.text(120, 300, "to continue").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor);
	go_to_title_text_4.setOrigin(0.5, 0.5);
	

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