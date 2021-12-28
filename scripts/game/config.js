var config = {
	type: Phaser.AUTO,
	width: 240,
	height: 320,
	backgroundColor: '#000000',
	scene: [ sceneBoot, scenePreload, sceneTitle, sceneGame, sceneEnd ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};

// game variables
var soundOnOff = true;
var soundVolume = 1;
var fontFamily = 'font1';
var puntos = 0;
var space_cow_cant = 0;
var tiempo_transcurrido_de_juego = 0;

var game = new Phaser.Game(config);
