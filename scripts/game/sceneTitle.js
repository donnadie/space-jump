// title scene
var sceneTitle = new Phaser.Scene("title");

sceneTitle.init = function() {

};

sceneTitle.preload = function() {
	
};

sceneTitle.create = function() {

  //document.body.style.backgroundColor = "#004a55";

  var title = this.add.sprite(0,0,'title');
  title.setOrigin(0,0);

  //add keyboard listener
  document.addEventListener('keydown', this.handleKeyDown);
  
  this.input.on('pointerdown', sceneTitle.pointer_down, this);
  
};

sceneTitle.handleKeyDown = function(evt) {
  
  document.removeEventListener('keydown', sceneTitle.handleKeyDown);
  sceneTitle.scene.start('game');
};

sceneTitle.pointer_down = function() {
  
  document.removeEventListener('keydown', sceneTitle.handleKeyDown);
  sceneTitle.scene.start('game');
};
