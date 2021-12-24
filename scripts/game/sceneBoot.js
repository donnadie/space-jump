// boot scene
var sceneBoot = new Phaser.Scene("boot");

sceneBoot.preload = function() {
	this.load.image('logo', 'assets/images/logo.png');
};

sceneBoot.create = function() {
   
   this.scene.start('preload');   
};
