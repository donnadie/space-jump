var config = {
	type: Phaser.AUTO,
	width: 240,
	height: 316,
	backgroundColor: '#000000',
	scene: [ sceneBoot, scenePreload, sceneTitle, sceneMenu, sceneInstructions, sceneCredits, sceneSettings, scenePlayMode, scenePlay, sceneGame, sceneGamePaused, sceneEnd ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};

// Create the game with our config values
// this will also inject our canvas element into the HTML source 
// for us
var viewAd = false;
var soundOnOff = true;
var soundVolume = 1;
var gameState = 'new';
var fontFamily = 'font1';


var game = new Phaser.Game(config);
