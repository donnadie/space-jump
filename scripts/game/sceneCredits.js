// boot scene
var sceneCredits = new Phaser.Scene("credits");

sceneCredits.init = function() {

  this.fontColor = '#e9e9e9';
};

sceneCredits.preload = function() {
	
};

sceneCredits.create = function() {
   
  this.cameras.main.setBackgroundColor('#004a55');
  
  textCredits = this.add.text(50, 40, "Credits").setFontFamily(fontFamily).setFontSize(30).setColor(this.fontColor );
  textCredits.x = this.cameras.main.centerX -  textCredits.width /2;    

  textCredits = this.add.text(50, 80, "Music").setFontFamily(fontFamily).setFontSize(14).setColor(this.fontColor );
  textCredits.x = this.cameras.main.centerX -  textCredits.width /2;    

  textCredits = this.add.text(5, 100, '').setFontFamily(fontFamily).setFontSize(9).setColor(this.fontColor );
  textCredits.text = 'Sneaky Snitch by Kevin MacLeod\nLink: https://incompetech.filmmusic.io/\n      song/4384-sneaky-snitch\nLicense: http://creativecommons.org/\n         licenses/by/4.0/'
  textCredits.x = this.cameras.main.centerX -  textCredits.width /2;    

  textCredits = this.add.text(50, 170, "Sounds FX").setFontFamily(fontFamily).setFontSize(14).setColor(this.fontColor );
  textCredits.x = this.cameras.main.centerX -  textCredits.width /2;    

  textCredits = this.add.text(50, 200, "Kenney\nLink: www.kenney.nl                    ").setFontFamily(fontFamily).setFontSize(9).setColor(this.fontColor );
  textCredits.x = this.cameras.main.centerX -  textCredits.width /2;

  textCredits = this.add.text(50, 230, "Mike Koenig\nLink: http://soundbible.com/           \n182-Shake-And-Roll-Dice.html").setFontFamily(fontFamily).setFontSize(9).setColor(this.fontColor );
  textCredits.x = this.cameras.main.centerX -  textCredits.width /2;
  //add keyboard listener
  document.addEventListener('keydown', this.handleKeyDown);  
};

sceneCredits.handleKeyDown = function(evt) {
  
  if(soundOnOff){

    soundSelectItem.play();
  }
  
  document.removeEventListener('keydown', sceneCredits.handleKeyDown);
  sceneCredits.scene.start('menu');

};