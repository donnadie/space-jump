// end scene
var sceneSettings = new Phaser.Scene("settings");

sceneSettings.init = function() {

    this.fontColor = '#e9e9e9';
    this.settingsItemSelected = 0;
  };

sceneSettings.preload = function() {
	
};

sceneSettings.create = function() {

  this.spriteSelectedItem = this.add.sprite(0,0,'selectedItem');
  this.spriteSelectedItem.setOrigin(0.5,0.5);

    this.cameras.main.setBackgroundColor('#004a55');

    textSettings = this.add.text(this.cameras.main.centerX, 50, "Settings").setFontFamily(fontFamily).setFontSize(30).setColor(this.fontColor );
    textSettings.setOrigin(0.5, 0.5);
    textSettingsItems = [];
    
    textSettingsItems[0] = this.add.text( this.cameras.main.centerX, 150, 'Sound').setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
    textSettingsItems[0].text = 'Sound ' + (soundVolume < 1 ?(soundVolume < 0.1 ? '  ': ' '): '') + (soundVolume * 100).toFixed(0) + '%';
    textSettingsItems[0].setOrigin(0.5, 0.5);

    this.spriteSelectedItem.x = textSettingsItems[0].x;
    this.spriteSelectedItem.y = textSettingsItems[0].y;
    //add keyboard listener
   document.addEventListener('keydown', this.handleKeyDown);
};

sceneSettings.backButton = function() {
    document.removeEventListener('keydown', sceneSettings.handleKeyDown);
    this.scene.start('title');
};

sceneSettings.handleKeyDown = function(evt) {
	
    
    if(evt.key === "ArrowDown" || evt.key === '8'){

        if(soundOnOff){

            soundChangeItem.play();
          }

        if(sceneSettings.settingsItemSelected === 0){
            
          sceneSettings.spriteSelectedItem.x = textSettingsItems[1].x;
          sceneSettings.spriteSelectedItem.y = textSettingsItems[1].y;  
          sceneSettings.settingsItemSelected = 1;
  
        }
    
    }else if(evt.key === "ArrowUp" || evt.key === '2'){

        if(soundOnOff){

            soundChangeItem.play();
          }

        if(sceneSettings.settingsItemSelected === 1){
            
            
          sceneSettings.spriteSelectedItem.x = textSettingsItems[0].x;
          sceneSettings.spriteSelectedItem.y = textSettingsItems[0].y;  
          sceneSettings.settingsItemSelected = 0;
  
        }
    
    }else if(evt.key === "ArrowLeft" || evt.key === '4'){

      if(soundOnOff){

          soundChangeCharacter.play();
        }

      if(sceneSettings.settingsItemSelected === 0 && soundVolume > 0){
          
          soundVolume -= 0.01;
          this.porcentaje = " ".repeat((3 - (soundVolume * 100).toFixed(0).toString().length)) + (soundVolume * 100).toFixed(0).toString();
          textSettingsItems[0].text = 'Sound ' + this.porcentaje + '%';
          soundChangeCharacter.volume = soundVolume;
          soundChangeItem.volume = soundVolume;
          soundSelectItem.volume = soundVolume;
          soundRollDice.volume = soundVolume;

          if(soundVolume <= 0){
            soundVolume = 0
            textSettingsItems[0].text = 'Sound   0%';
            soundOnOff = false;
          }else{

            soundOnOff = true;
          }
      }

    }else if(evt.key === "ArrowRight" || evt.key === '6'){

      if(soundOnOff){

          soundChangeCharacter.play();
        }

      if(sceneSettings.settingsItemSelected === 0 && soundVolume < 1){
          
        soundVolume += 0.01;
        this.porcentaje = " ".repeat((3 - (soundVolume * 100).toFixed(0).toString().length)) + (soundVolume * 100).toFixed(0).toString();
        textSettingsItems[0].text = 'Sound ' + this.porcentaje + '%';
        soundChangeCharacter.volume = soundVolume;
        soundChangeItem.volume = soundVolume;
        soundSelectItem.volume = soundVolume;
        soundRollDice.volume = soundVolume;

        if(soundVolume >=  0){

          soundOnOff = true;
          if(soundVolume >= 1){

            soundVolume = 1;
            textSettingsItems[0].text = 'Sound ' + (soundVolume < 1 ?(soundVolume < 0.1 ? '  ': ' '): '') + (soundVolume * 100).toFixed(0) + '%';
          }
          
        }else{

          soundOnOff = false;
        }
      }

    }else if (evt.key === 'Backspace' ) {

      evt.preventDefault();
      document.removeEventListener('keydown', sceneSettings.handleKeyDown);
      sceneSettings.scene.start('menu');
    }else{

      document.removeEventListener('keydown', sceneSettings.handleKeyDown);
      sceneSettings.scene.start('menu');
    }

};
