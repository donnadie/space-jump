// title scene
var sceneTitle = new Phaser.Scene("title");

sceneTitle.init = function() {

  this.title_sound;

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

  this.title_sound = this.sound.add('title',{
    mute: false,
    volume: 0.3,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
});
this.title_sound.play();
  
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
