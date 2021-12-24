// end scene
var scenePlayMode = new Phaser.Scene("playMode");

scenePlayMode.init = function() {

    this.fontColor = '#e9e9e9';
    playMode = 1;
  };

scenePlayMode.preload = function() {
	
};

scenePlayMode.create = function() {

  this.cameras.main.setBackgroundColor('#004a55');

  this.spriteSelectedItem = this.add.sprite(0,0,'selectedItem');
  this.spriteSelectedItem.setOrigin(0.5,0.5);

  this.textPlay = this.add.text(this.cameras.main.centerX, 50, "Play").setFontFamily(fontFamily).setFontSize(30).setColor(this.fontColor );
  this.textPlay.setOrigin(0.5, 0.5);
  this.textPlay = this.add.text(this.cameras.main.centerX, 85, "Choose play mode").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor );
  this.textPlay.setOrigin(0.5, 0.5);
  this.text1Player = this.add.text(this.cameras.main.centerX, 140, "vs a Bot").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  this.text1Player.setOrigin(0.5, 0.5);
  this.text2Player = this.add.text(this.cameras.main.centerX, 170, "vs a Friend").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  this.text2Player.setOrigin(0.5, 0.5);
    
  this.spriteSelectedItem.x = scenePlayMode.text1Player.x;
  this.spriteSelectedItem.y = scenePlayMode.text1Player.y;  
  //add keyboard listener
  document.addEventListener('keydown', this.handleKeyDown);
};

scenePlayMode.backButton = function() {
  
  document.removeEventListener('keydown', scenePlayMode.handleKeyDown);
    this.scene.start('title');
};

scenePlayMode.handleKeyDown = function(evt) {
	
    
    if (evt.key === "Enter" || evt.key === '5') {
        
        if(soundOnOff){

            soundSelectItem.play();
          }

        document.removeEventListener('keydown', scenePlayMode.handleKeyDown);
        scenePlayMode.scene.start('play');

    }else if(evt.key === "ArrowDown" || evt.key === '8'){

        if(soundOnOff){

            soundChangeItem.play();
          }

        if(playMode === 1){
            
          scenePlayMode.spriteSelectedItem.x = scenePlayMode.text2Player.x;
          scenePlayMode.spriteSelectedItem.y = scenePlayMode.text2Player.y;  
          playMode = 2;
  
        }
    }

    else if(evt.key === "ArrowUp" || evt.key === '2'){

        if(soundOnOff){

            soundChangeItem.play();
          }

        if(playMode === 2){
            
          scenePlayMode.spriteSelectedItem.x = scenePlayMode.text1Player.x;
          scenePlayMode.spriteSelectedItem.y = scenePlayMode.text1Player.y;  
            
          playMode = 1;
  
        }
    }else if (evt.key === 'Backspace' ) {

        evt.preventDefault();
        document.removeEventListener('keydown', scenePlayMode.handleKeyDown);
        scenePlayMode.scene.start('menu');
    
    }else{

      document.removeEventListener('keydown', scenePlayMode.handleKeyDown);
      scenePlayMode.scene.start('menu');
    }

};
