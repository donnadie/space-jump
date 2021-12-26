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

  title_text = this.add.text(this.cameras.main.centerX,180,"Tap,", { fontSize: '18px', fill: '#FFF' });
	title_text.setOrigin(0.5, 0.5);
  
  title_text = this.add.text(this.cameras.main.centerX,210,"Click or", { fontSize: '18px', fill: '#FFF' });
	title_text.setOrigin(0.5, 0.5);
  
  title_text = this.add.text(this.cameras.main.centerX,240,"Press any key", { fontSize: '18px', fill: '#FFF' });
	title_text.setOrigin(0.5, 0.5);

  title_text = this.add.text(this.cameras.main.centerX,270,"to Play", { fontSize: '18px', fill: '#FFF' });
	title_text.setOrigin(0.5, 0.5);

  //add keyboard listener
  document.addEventListener('keydown', sceneTitle.handleKeyDown);
  
  this.input.on('pointerdown', sceneTitle.pointer_down, this);

  sceneTitle.title_sound = this.sound.add('title',{
    mute: false,
    volume: 0.3,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
});
sceneTitle.title_sound.play();
  
};

sceneTitle.handleKeyDown = function(evt) {
  
  sceneTitle.title_sound.stop();
  document.removeEventListener('keydown', sceneTitle.handleKeyDown);
  sceneTitle.scene.start('game');
};

sceneTitle.pointer_down = function() {
  
  sceneTitle.title_sound.stop();
  document.removeEventListener('keydown', sceneTitle.handleKeyDown);
  sceneTitle.scene.start('game');
};
