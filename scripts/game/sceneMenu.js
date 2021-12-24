// end scene
var sceneMenu = new Phaser.Scene("menu");

sceneMenu.init = function() {

    this.fontColor = '#e9e9e9';
    this.menuItemSelection = 0;
    this.menuItemsScene = ['playMode', 'instructions', 'settings', 'credits'];
    this.textMenu;
    this.spriteSelectedItem;
    this.textMenuItems = [];
  };

sceneMenu.preload = function() {
	
};

sceneMenu.create = function() {

    this.spriteSelectedItem = this.add.sprite(0,0,'selectedItem');
    this.spriteSelectedItem.setOrigin(0.5,0.5);

    this.cameras.main.setBackgroundColor('#004a55');
    
    this.textMenu = this.add.text(this.cameras.main.centerX, 50, "BobStones").setFontFamily('font1').setFontSize(30).setColor(this.fontColor );
    this.textMenu.setOrigin(0.5, 0.5)
    this.textMenuItems[0] = this.add.text(this.cameras.main.centerX, 135, "Play").setFontFamily('font1').setFontSize(15).setColor(this.fontColor );
    this.textMenuItems[1] = this.add.text(this.cameras.main.centerX, 165, " Instructions ").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
    this.textMenuItems[2] = this.add.text(this.cameras.main.centerX, 195, "Settings").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
    this.textMenuItems[3] = this.add.text(this.cameras.main.centerX, 225, "  Credits   ").setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );

    this.textMenuItems.forEach(element => {
      element.setOrigin(0.5, 0.5);
    });
    
    this.spriteSelectedItem.x = this.textMenuItems[0].x;
    this.spriteSelectedItem.y = this.textMenuItems[0].y;
    //add keyboard listener
   document.addEventListener('keydown', this.handleKeyDown);
};

sceneMenu.handleKeyDown = function(evt) {
	
    
    if (evt.key === "Enter" || evt.key === '5') {

      if(soundOnOff){

        soundSelectItem.play();
      }

      document.removeEventListener('keydown', sceneMenu.handleKeyDown);
      sceneMenu.scene.start(sceneMenu.menuItemsScene[sceneMenu.menuItemSelection]);

    }else if(evt.key === "ArrowDown" || evt.key === '8'){
      if(soundOnOff){

        soundChangeItem.play();
      }
      if(sceneMenu.menuItemSelection < sceneMenu.textMenuItems.length - 1){

        sceneMenu.menuItemSelection ++;
        sceneMenu.spriteSelectedItem.x = sceneMenu.textMenuItems[sceneMenu.menuItemSelection].x;
        sceneMenu.spriteSelectedItem.y = sceneMenu.textMenuItems[sceneMenu.menuItemSelection].y;  
      }
    }

    else if(evt.key === "ArrowUp" || evt.key === '2'){

      if(soundOnOff){

        soundChangeItem.play();
      }

      if(sceneMenu.menuItemSelection > 0){
          
        sceneMenu.menuItemSelection --;
        sceneMenu.spriteSelectedItem.x = sceneMenu.textMenuItems[sceneMenu.menuItemSelection].x;
        sceneMenu.spriteSelectedItem.y = sceneMenu.textMenuItems[sceneMenu.menuItemSelection].y;          
    }
 }

};

