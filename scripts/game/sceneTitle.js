// title scene
var sceneTitle = new Phaser.Scene("title");

sceneTitle.init = function() {
  this.fontColor = '#e9e9e9';
};

sceneTitle.preload = function() {
	
};

sceneTitle.create = function() {

  var title = this.add.sprite(0,0,'title');
  title.setOrigin(0,0);

  text_instructions = this.add.text(20, 160, "Try to herd").setFontFamily(fontFamily).setFontSize(12).setColor(this.fontColor);
  text_instructions.setOrigin(0, 0.5);

  text_instructions = this.add.text(40, 180, "the space cows  ").setFontFamily(fontFamily).setFontSize(12).setColor(this.fontColor);
  text_instructions.setOrigin(0, 0.5);

  text_instructions = this.add.text(50, 240, "by hitting them  ").setFontFamily(fontFamily).setFontSize(12).setColor(this.fontColor);
  text_instructions.setOrigin(0, 0.5);

  text_instructions = this.add.text(100, 260, "from below.  ").setFontFamily(fontFamily).setFontSize(12).setColor(this.fontColor);
  text_instructions.setOrigin(0, 0.5);

	title_text_3 = this.add.text(120, 290, "Tap, Clikc or Press any key").setFontFamily(fontFamily).setFontSize(8).setColor(this.fontColor);
	title_text_3.setOrigin(0.5, 0.5);
	
	title_text_4 = this.add.text(120, 300, "to continue").setFontFamily(fontFamily).setFontSize(8).setColor(this.fontColor);
	title_text_4.setOrigin(0.5, 0.5);
	
  this.space_cow = this.add.sprite(160, 210, 'space_cow');
  this.anims.create({
    key: 'space_cow',
    frames: this.anims.generateFrameNumbers('space_cow', { start: 0, end: 5 }),
    frameRate: 15,
    repeat: -1
});
this.space_cow.anims.play('space_cow');

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
