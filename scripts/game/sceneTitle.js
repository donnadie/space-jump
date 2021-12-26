// title scene
var sceneTitle = new Phaser.Scene("title");

sceneTitle.init = function() {
  this.fontColor = '#e9e9e9';
};

sceneTitle.preload = function() {
	
};

sceneTitle.create = function() {

  //document.body.style.backgroundColor = "#004a55";

  var title = this.add.sprite(0,0,'title');
  title.setOrigin(0,0);

  title_text_1 = this.add.text(120, 180, "Tap,").setFontFamily(fontFamily).setFontSize(14).setColor(this.fontColor);
	title_text_1.setOrigin(0.5, 0.5);
	
	title_text_2 = this.add.text(120, 210, "Click or").setFontFamily(fontFamily).setFontSize(14).setColor(this.fontColor);
	title_text_2.setOrigin(0.5, 0.5);
	
	title_text_3 = this.add.text(120, 240, "Press any key").setFontFamily(fontFamily).setFontSize(14).setColor(this.fontColor);
	title_text_3.setOrigin(0.5, 0.5);
	
	title_text_4 = this.add.text(120, 270, "to PLAY").setFontFamily(fontFamily).setFontSize(14).setColor(this.fontColor);
	title_text_4.setOrigin(0.5, 0.5);
	

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
