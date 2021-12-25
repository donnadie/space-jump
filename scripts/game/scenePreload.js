// preload scene
var scenePreload = new Phaser.Scene("preload");

var timer;
scenePreload.preload = function() {

	// add the background
	this.cameras.main.setBackgroundColor('#004a55');
	var logo = this.add.sprite(0,0,'logo');
	logo.setOrigin(0,0);
	
	// Add loading screen bars
    this.graphics = this.add.graphics();
	this.newGraphics = this.add.graphics();
	
	loadingText = this.add.text(this.cameras.main.centerX,300,"Loading: ", { fontSize: '18px', fill: '#FFF' });
	loadingText.setOrigin(0.5, 0.5);
	//loadingText.visible = false;
	this.load.on('progress', this.updateBar, {loadingText:loadingText});
    this.load.on('complete', this.complete, {scene:this.scene});

	// Any Assets you want to load in
	this.load.image('title', 'assets/images/title.png');
	this.load.image('ground', 'assets/images/platform.png');
    this.load.spritesheet('spaceship', 'assets/images/spaceship.png', { frameWidth: 32, frameHeight: 34 });
    this.load.spritesheet('sky', 'assets/images/sky.png', { frameWidth: 240, frameHeight: 200 });
	//this.load.audio('spaceship_thrust', 'assets/sounds/spaceship_thrust.wav');
	this.load.audio('spaceship_thrust', 'assets/sounds/spaceship_thrust.mp3');
	this.load.audio('spaceship_drop', 'assets/sounds/spaceship_drop.wav');
	this.load.audio('spaceship_crash', 'assets/sounds/spaceship_crash.wav');
	this.load.audio('space_sound', 'assets/sounds/space_sound.mp3');
	this.load.audio('level_up', 'assets/sounds/level_up.mp3');
};

scenePreload.updateBar = function(percentage) {
	percentage = percentage * 100;
	loadingText.setText("Loading: " + percentage + "%");
};


scenePreload.complete = function() {
	console.log("COMPLETE!");
	
	//this.scene.start("title");
};


scenePreload.create = function() {

	timer = scenePreload.time.addEvent({
		delay: 2000,                // ms
		callback: scenePreload.go_to_title,
		loop: true,
		paused: false
	});
};

scenePreload.go_to_title = function() {

	scenePreload.scene.start("title");
}

