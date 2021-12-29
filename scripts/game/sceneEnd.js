// end scene
var sceneEnd = new Phaser.Scene("end");
sceneEnd.init = function(){

  this.fontColor = '#e9e9e9';
  this.fontColor_hs = '#FFFF00';
  this.sky_background = [];
}
sceneEnd.preload = function() {
	
};

sceneEnd.create = function() {

  for(let i=0; i < 4; i++){
    this.sky_background[i] = this.physics.add.sprite(0, 200 * i, 'sky').setOrigin(0, 0).setFrame(i);
    this.sky_background[i].setImmovable(true);
    this.sky_background[i].body.allowGravity = false;
    this.sky_background[i].body.velocity.set(0,0);
  }

  this.total_points = puntos + space_cow_cant;

  textPuntos = this.add.text(this.cameras.main.centerX, 80, "Platform Points").setFontFamily(fontFamily).setFontSize(12).setColor(this.fontColor );
  textPuntos.setOrigin(0.5, 0.5);
  
  textPuntos = this.add.text(this.cameras.main.centerX, 110, puntos).setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
  textPuntos.setOrigin(0.5, 0.5);

  if(puntos > hs_platforms){

    textPuntos = this.add.text(this.cameras.main.centerX, 130, "New HS").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor_hs);
    textPuntos.setOrigin(0.5, 0.5);
    localStorage.setItem('hs_platforms', puntos);
  }
  
    
  textPuntos = this.add.text(this.cameras.main.centerX, 150, "Cow Points").setFontFamily(fontFamily).setFontSize(12).setColor(this.fontColor );
  textPuntos.setOrigin(0.5, 0.5);
  
  textPuntos = this.add.text(this.cameras.main.centerX, 180, space_cow_cant).setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
  textPuntos.setOrigin(0.5, 0.5);

  if(space_cow_cant > hs_space_cows){

    textPuntos = this.add.text(this.cameras.main.centerX, 200, "New HS").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor_hs);
    textPuntos.setOrigin(0.5, 0.5);
    localStorage.setItem('hs_space_cows', space_cow_cant);
  }

  textPuntos = this.add.text(this.cameras.main.centerX, 220, "Total Points").setFontFamily(fontFamily).setFontSize(12).setColor(this.fontColor );
  textPuntos.setOrigin(0.5, 0.5);

  textPuntos = this.add.text(this.cameras.main.centerX, 250, this.total_points).setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
  textPuntos.setOrigin(0.5, 0.5);

  if(this.total_points > hs_points){

    textPuntos = this.add.text(this.cameras.main.centerX, 270, "New HS").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor_hs);
    textPuntos.setOrigin(0.5, 0.5);
    localStorage.setItem('hs_points', this.total_points);
  }

  text_hs = this.add.text(this.cameras.main.centerX, 20, "High Score").setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor );
  text_hs.setOrigin(0.5, 0.5);

  text_hs = this.add.text(this.cameras.main.centerX, 40, "P:" + localStorage.getItem('hs_platforms') + "   C:" +  localStorage.getItem('hs_space_cows') + "   TP:" +  localStorage.getItem('hs_points') ).setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor );
  text_hs.setOrigin(0.5, 0.5);

  go_to_title_text_3 = this.add.text(120, 290, "Tap, Click or Press any key").setFontFamily(fontFamily).setFontSize(8).setColor(this.fontColor);
	go_to_title_text_3.setOrigin(0.5, 0.5);
	
	go_to_title_text_4 = this.add.text(120, 300, "to continue").setFontFamily(fontFamily).setFontSize(8).setColor(this.fontColor);
	go_to_title_text_4.setOrigin(0.5, 0.5);
	
  this.space_sound = this.sound.add('space_sound',{
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
});
//this.space_sound.play();
  
  //add keyboard listener
  document.addEventListener('keydown', sceneEnd.handleKeyDown);

  this.input.on('pointerdown', sceneEnd.pointer_down, this);
};

sceneEnd.update = function() {
  
};

sceneEnd.handleKeyDown = function(evt) {

  //this.space_sound.stop();
  document.removeEventListener('keydown', sceneEnd.handleKeyDown);
  sceneEnd.scene.start('title');
};

sceneEnd.pointer_down = function() {

  this.space_sound.stop();  
  document.removeEventListener('keydown', sceneEnd.handleKeyDown);
  sceneEnd.scene.start('title');
};