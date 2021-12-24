// title scene
var scenePlay = new Phaser.Scene("play");

scenePlay.init = function() {

  if(playMode === 1){

    players[1].name = "BOT";
  }

  this.playersNames = [players[0].name.split(""), players[1].name.split("")];
  this.currentPlayer = 0;
  this.currentPosition = 0;
  this.fontColor = '#e9e9e9';
  this.allCharacters = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.- ";
  this.itemSelected = 'character';
  viewAd = false;
};

scenePlay.preload = function() {
	
};

scenePlay.create = function() {

  this.spriteSelectedCharacter = this.add.sprite(0,0,'selectedCharacter');
  this.spriteSelectedCharacter.setOrigin(0.5,0.5);

  this.spriteSelectedItem = this.add.sprite(0,0,'selectedItem');
  this.spriteSelectedItem.setOrigin(0.5,0.5);
  this.spriteSelectedItem.visible = false;

  this.cameras.main.setBackgroundColor('#004a55');

  textPlay = this.add.text(this.cameras.main.centerX, 70, "Choose\nyour name").setFontFamily(fontFamily).setFontSize(30).setColor(this.fontColor).setAlign('center');
  
  if(playMode === 2){

    textPlay.text = 'Choose\nyour names';
  }

  //textPlay.x = this.cameras.main.centerX -  textPlay.width /2;    
  textPlay.setOrigin(0.5, 0.5);

  textPlayer1 = this.add.text(this.cameras.main.centerX, 130, "Player1").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  textPlayer1.setOrigin(0.5, 0.5);

  textPlayersName = [[],[]];
  textPlayersName[0][0] = this.add.text(105, 152, this.playersNames[0][0]).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  textPlayersName[0][1] = this.add.text(120, 152, this.playersNames[0][1]).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  textPlayersName[0][2] = this.add.text(135, 152, this.playersNames[0][2]).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  
  textPlayer2 = this.add.text(this.cameras.main.centerX, 190, "Player2").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  textPlayer2.setOrigin(0.5, 0.5);

  textPlayersName[1][0] = this.add.text(105, 212, this.playersNames[1][0]).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  textPlayersName[1][1] = this.add.text(120, 212, this.playersNames[1][1]).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  textPlayersName[1][2] = this.add.text(135, 212, this.playersNames[1][2]).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  
  textPlayersName[0][0].setOrigin(0.5, 0.5);
  textPlayersName[0][1].setOrigin(0.5, 0.5);
  textPlayersName[0][2].setOrigin(0.5, 0.5);
  textPlayersName[1][0].setOrigin(0.5, 0.5);
  textPlayersName[1][1].setOrigin(0.5, 0.5);
  textPlayersName[1][2].setOrigin(0.5, 0.5);

  this.spriteSelectedCharacter.x = textPlayersName[0][0].x;
  this.spriteSelectedCharacter.y = textPlayersName[0][0].y;
  
  textStartGame = this.add.text(this.cameras.main.centerX, 270, "Start Game").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
  textStartGame.setOrigin(0.5, 0.5);

  //add keyboard listener
  document.addEventListener('keydown', this.handleKeyDown);
      
};

scenePlay.handleKeyDown = function(evt) {
	
    if (evt.key === "ArrowRight" || evt.key === '6') {
      
      if(soundOnOff){

        soundChangeItem.play();
      }

      if(scenePlay.currentPosition < 2){

        
        scenePlay.currentPosition ++;
        scenePlay.spriteSelectedCharacter.x = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].x;
        scenePlay.spriteSelectedCharacter.y = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].y;

        scenePlay.itemSelected = "character";

      }
      
    }else if (evt.key === "ArrowLeft" || evt.key === '4') {
      
      if(soundOnOff){

        soundChangeItem.play();
      }

      if(scenePlay.currentPosition > 0){

        scenePlay.currentPosition --;
        scenePlay.spriteSelectedCharacter.x = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].x;
        scenePlay.spriteSelectedCharacter.y = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].y;

        scenePlay.itemSelected = "character";

      }
    }else if(evt.key === "ArrowDown" || evt.key === '8'){
      
      if(soundOnOff){

        soundChangeItem.play();
      }

      if(playMode === 1) {

        scenePlay.spriteSelectedCharacter.visible = false;
        scenePlay.spriteSelectedItem.visible = true;
        
        scenePlay.spriteSelectedItem.x = textStartGame.x;
        scenePlay.spriteSelectedItem.y = textStartGame.y;

        scenePlay.itemSelected = "game";

      }else if(scenePlay.currentPlayer < 1){

        scenePlay.currentPlayer ++;
        scenePlay.currentPosition = 0;

        scenePlay.spriteSelectedCharacter.x = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].x;
        scenePlay.spriteSelectedCharacter.y = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].y;
        scenePlay.itemSelected = "character";

      }else if (scenePlay.currentPlayer === 1){
        
        scenePlay.spriteSelectedCharacter.visible = false;
        scenePlay.spriteSelectedItem.visible = true;
        
        scenePlay.spriteSelectedItem.x = textStartGame.x;
        scenePlay.spriteSelectedItem.y = textStartGame.y;
        
        scenePlay.itemSelected = "game";

      }
      

    }else if(evt.key === "ArrowUp" || evt.key === '2'){

      if(soundOnOff){

        soundChangeItem.play();
      }

      if(playMode === 1) {

        scenePlay.currentPlayer =0;
        scenePlay.currentPosition = 0;
        
        scenePlay.spriteSelectedItem.visible = false;
        scenePlay.spriteSelectedCharacter.visible = true;
        
        scenePlay.spriteSelectedCharacter.x = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].x;
        scenePlay.spriteSelectedCharacter.y = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].y;
        
        scenePlay.itemSelected = "character";
        
      }else if(scenePlay.currentPlayer > 0){

        if(scenePlay.currentPlayer === 1) {
          
          
          scenePlay.currentPlayer --;
          scenePlay.currentPosition = 0;
          
          scenePlay.spriteSelectedItem.visible = false;
          scenePlay.spriteSelectedCharacter.visible = true;
          
          scenePlay.spriteSelectedCharacter.x = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].x;
          scenePlay.spriteSelectedCharacter.y = textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].y;
          
          scenePlay.itemSelected = "character";
        }

      }
      
    }else if (evt.key === "Enter" || evt.key === '5') {

        if(scenePlay.itemSelected === 'character'){

          if(soundOnOff){

            soundChangeCharacter.play();
          }

          this.nextCharacter = scenePlay.allCharacters.substr(scenePlay.allCharacters.indexOf(textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].text) + 1, 1);
          textPlayersName[scenePlay.currentPlayer][scenePlay.currentPosition].text = this.nextCharacter;
          scenePlay.playersNames[scenePlay.currentPlayer][scenePlay.currentPosition] = this.nextCharacter;

        }else if(scenePlay.itemSelected === 'game'){
          
          if(soundOnOff){

            soundSelectItem.play();
          }

          players[0].name = scenePlay.playersNames[0].join('');
          players[1].name = scenePlay.playersNames[1].join('');
          
          document.removeEventListener('keydown', scenePlay.handleKeyDown);
          scenePlay.scene.start('game');
        }
    }else if (evt.key === 'Backspace' ) {

      evt.preventDefault();
      document.removeEventListener('keydown', scenePlay.handleKeyDown);
      scenePlay.scene.start('playMode');
    }else{

      document.removeEventListener('keydown', scenePlay.handleKeyDown);
      scenePlay.scene.start('playMode');
    }

};