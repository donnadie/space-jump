// end scene
var sceneGamePaused = new Phaser.Scene("gamePaused");

sceneGamePaused.init = function() {

    this.fontColor = '#e9e9e9';
    this.menuItemSelection = 0;
    this.menuItemsScene = ['game', 'menu'];
  };

sceneGamePaused.preload = function() {
	
};

sceneGamePaused.create = function() {

    
  this.spriteSelectedItem = this.add.sprite(0,0,'selectedItem');
  this.spriteSelectedItem.setOrigin(0.5,0.5);
    

    this.cameras.main.setBackgroundColor('#004a55');
    
    textMenu = this.add.text(this.cameras.main.centerX, 50, "Game Paused").setFontFamily('font1').setFontSize(30).setColor(this.fontColor );
    textMenu.setOrigin(0.5, 0.5)

    textMenuItems = [];
    textMenuItems[0] = this.add.text(this.cameras.main.centerX, 135, "Resume").setFontFamily('font1').setFontSize(15).setColor(this.fontColor );
    textMenuItems[0].setOrigin(0.5, 0.5);

    textMenuItems[1] = this.add.text(this.cameras.main.centerX, 165, "Exit").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
    textMenuItems[1].setOrigin(0.5, 0.5);
    
    this.spriteSelectedItem.x = textMenuItems[0].x;
    this.spriteSelectedItem.y = textMenuItems[0].y;

    //add keyboard listener
   
   document.addEventListener('keydown', this.handleKeyDown);
};

sceneGamePaused.handleKeyDown = function(evt) {
	
    
    if (evt.key === "Enter" || evt.key === '5') {

      
      document.removeEventListener('keydown', sceneGamePaused.handleKeyDown);
      sceneGamePaused.scene.stop();
      if(soundOnOff){

        soundSelectItem.play();
      }

      if (sceneGamePaused.menuItemSelection === 0) {

        document.addEventListener('keydown', sceneGame.handleKeyDown);
        sceneGamePaused.scene.resume('game');

      }else if (sceneGamePaused.menuItemSelection === 1) {

        sceneGamePaused.scene.stop('game');
        sceneGamePaused.scene.start(sceneGamePaused.menuItemsScene[sceneGamePaused.menuItemSelection]);
      }

    }else if(evt.key === "ArrowDown" || evt.key === '8'){
      if(soundOnOff){

        soundChangeItem.play();
      }
      if(sceneGamePaused.menuItemSelection < textMenuItems.length - 1){
          
          
          
          sceneGamePaused.menuItemSelection ++;
          
          sceneGamePaused.spriteSelectedItem.x = textMenuItems[sceneGamePaused.menuItemSelection].x;
          sceneGamePaused.spriteSelectedItem.y = textMenuItems[sceneGamePaused.menuItemSelection].y;  
          
      }
    }

    else if(evt.key === "ArrowUp" || evt.key === '2'){

      if(soundOnOff){

        soundChangeItem.play();
      }

      if(sceneGamePaused.menuItemSelection > 0){
          
        sceneGamePaused.menuItemSelection --;
        
        sceneGamePaused.spriteSelectedItem.x = textMenuItems[sceneGamePaused.menuItemSelection].x;
        sceneGamePaused.spriteSelectedItem.y = textMenuItems[sceneGamePaused.menuItemSelection].y;  
        
    }
    }

};
