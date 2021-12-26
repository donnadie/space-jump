// preload scene
var scenePreload = new Phaser.Scene("preload");

var timer;
scenePreload.preload = function() {

	// add the background
	this.cameras.main.setBackgroundColor('#000000');
	var logo = this.add.sprite(0,0,'logo');
	logo.setOrigin(0,0);
	
	// Add loading screen bars
    this.graphics = this.add.graphics();
	credits_text = this.add.text(this.cameras.main.centerX,160,"Graphics by:", { fontSize: '18px', fill: '#FFF' });
	credits_text.setOrigin(0.5, 0.5);
	credits_text = this.add.text(this.cameras.main.centerX,180,"DynaDee", { fontSize: '18px', fill: '#FFF' });
	credits_text.setOrigin(0.5, 0.5);
	credits_text = this.add.text(this.cameras.main.centerX,220,"Program by:", { fontSize: '18px', fill: '#FFF' });
	credits_text.setOrigin(0.5, 0.5);
	credits_text = this.add.text(this.cameras.main.centerX,240,"Donnadie", { fontSize: '18px', fill: '#FFF' });
	credits_text.setOrigin(0.5, 0.5);
	
	loadingText = this.add.text(this.cameras.main.centerX,290,"Loading: ", { fontSize: '14px', fill: '#FFF' });
	loadingText.setOrigin(0.5, 0.5);
	//loadingText.visible = false;
	this.load.on('progress', this.updateBar, {loadingText:loadingText});
    this.load.on('complete', this.complete, {scene:this.scene});

	// Any Assets you want to load in
	this.load.image('title', 'assets/images/title.png');
	this.load.image('ground', 'assets/images/platform.png');
    this.load.spritesheet('spaceship', 'assets/images/spaceship.png', { frameWidth: 32, frameHeight: 34 });
    this.load.spritesheet('sky', 'assets/images/sky.png', { frameWidth: 240, frameHeight: 200 });
	this.load.audio('spaceship_thrust', 'assets/sounds/spaceship_thrust.mp3');
	this.load.audio('spaceship_drop', 'assets/sounds/spaceship_drop.mp3');
	this.load.audio('spaceship_crash', 'assets/sounds/spaceship_crash.mp3');
	this.load.audio('space_sound', 'assets/sounds/space_sound.mp3');
	this.load.audio('level_up', 'assets/sounds/level_up.mp3');
	this.load.audio('points', 'assets/sounds/points.mp3');
	this.load.audio('title', 'assets/sounds/title.mp3');
	this.load.audio('background_scene_game', 'assets/sounds/background_scene_game.mp3');
};

scenePreload.updateBar = function(percentage) {
	percentage = percentage * 100;
	loadingText.setText("Loading: " + Number(percentage).toFixed(2) + "%");
};


scenePreload.complete = function() {
	console.log("COMPLETE!");
	
	//this.scene.start("title");
};


scenePreload.create = function() {

	timer = scenePreload.time.addEvent({
		delay: 1000,                // ms
		callback: scenePreload.go_to_title,
		loop: true,
		paused: false
	});
	//add keyboard listener
	document.addEventListener('keydown', scenePreload.handleKeyDown);

	this.input.on('pointerdown', scenePreload.pointer_down, this);
};

scenePreload.go_to_title = function() {

	loadingText.setText("Press any key to continue");
}

scenePreload.handleKeyDown = function(evt) {

	document.removeEventListener('keydown', scenePreload.handleKeyDown);
	scenePreload.scene.start('title');
};
  
scenePreload.pointer_down = function() {
	
	document.removeEventListener('keydown', scenePreload.handleKeyDown);
	scenePreload.scene.start('title');
};
