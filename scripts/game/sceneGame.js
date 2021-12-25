// game scene
var sceneGame = new Phaser.Scene("game");

// game variables
var player;
var cursors;
var platforms = [];
var collider_platforms = [];
var sky_background = [];
var empuje = 0;
var dejar_de_acelerar = true;
var plataforma_activa = 0;
var plataforma_aterior = 0;
var puede_despegar = true;
var aterrizo = true;
var cantidad_plataformas = 5
var posicion_plataforma_0 = 510;
var distancia_entre_plataformas = 100;
var proxima_plataforma_para_descender = 2;
var reposicionar_fondo = 0;
var puntos = 0;
var timer_game;
var tiempo_transcurrido_de_juego = 0;
var pointer_abajo = false;
var plataforma_rebota = 0;
var plataforma_sizes = [0.2, 0.15, 0.1, 0.05];
var plataforma_min_vel = 30;
var plataforma_max_vel = 60;
var level_up_at = 2;
var textLevelUp;
var spaceship_thrust_sound;
var spaceship_drop_sound;

sceneGame.init = function() {

    this.fontColor = '#e9e9e9';
};

sceneGame.preload = function() {
  
};

sceneGame.create = function() {
  
  platforms = [];
  collider_platforms = [];
  sky_background = [];
  empuje = 0;
  dejar_de_acelerar = true;
  plataforma_activa = 0;
  plataforma_aterior = 0;
  puede_despegar = true;
  aterrizo = true;
  cantidad_plataformas = 5
  posicion_plataforma_0 = 510;
  distancia_entre_plataformas = 100;
  proxima_plataforma_para_descender = 2;
  reposicionar_fondo = 0;
  puntos = 0;
  timer_game;
  tiempo_transcurrido_de_juego = 0;
  plataforma_min_vel = 30;
  plataforma_max_vel = 60;
  

  this.physics.world.setBounds(0, 0, 240, 600);
    
    for(let i=0; i < 4; i++){
        sky_background[i] = this.physics.add.sprite(0, 200 * i, 'sky').setOrigin(0, 0).setFrame(i);
        sky_background[i].setImmovable(true);
        sky_background[i].body.allowGravity = false;
        sky_background[i].body.velocity.set(0,0);
    }
    
    player = this.physics.add.sprite(120, 450, 'spaceship');
    player.setBounce(0);
    player.setCollideWorldBounds(true);

    player.setDepth(10);
    player.body.setSize(player.width - 12, player.height, true); 


    this.anims.create({
        key: 'thrust',
        frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 2 }),
        frameRate: 24,
        repeat: -1
    });
    
    for(let i= 0; i < cantidad_plataformas; i++) {
        
        platforms[i] = this.physics.add.image(120, posicion_plataforma_0 - distancia_entre_plataformas * i, 'ground').setScale(plataforma_sizes[Phaser.Math.Between(0, plataforma_sizes.length - 1)],0.6).refreshBody();

        platforms[i].setImmovable(true);
        platforms[i].body.allowGravity = false;
        platforms[i].body.setCollideWorldBounds(true);
        if(i === 0){
            platforms[i].body.velocity.set(0,0);
        }else{
            platforms[i].body.velocity.set(Phaser.Math.Between(plataforma_min_vel, plataforma_max_vel),0);
        }
        
        platforms[i].body.bounce.set(1);

        collider_platforms[i] = this.physics.add.collider(player, platforms[i], null, function ()
            {
                
                if(player.body.velocity.y === 5)
                {
                    plataforma_activa = i;
                }
                
            }, this);
        platforms[i].body.checkCollision.down = false;
        platforms[i].body.checkCollision.left = false;
        platforms[i].body.checkCollision.right = false;
    }
    
    cursors = this.input.keyboard.createCursorKeys();

    pointer_abajo = false;

    this.input.on('pointerdown', sceneGame.pointer_down, this);
    this.input.on('pointerup', sceneGame.pointer_up, this);

    this.cameras.main.setBounds(0, 220, 240, 540)

    timer_game = sceneGame.time.addEvent({
      delay: 1,                // ms
      callback: sceneGame.show_time,
      loop: true
    });

    textPuntos = this.add.text(230, 240, puntos).setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
    textPuntos.setOrigin(1, 0.5);
    
    //textTiempo = this.add.text(10, 240, puntos).setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
    //textTiempo.setOrigin(0, 0.5);

    textLevelUp = this.add.text(120, 400, "Level Up!").setFontFamily(fontFamily).setFontSize(30).setColor(this.fontColor );
    textLevelUp.setOrigin(0.5, 0.5);
    textLevelUp.visible = false;

    spaceship_thrust_sound = this.sound.add('spaceship_thrust');
    spaceship_drop_sound = this.sound.add('spaceship_drop',{
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    });
    spaceship_crash_sound = this.sound.add('spaceship_crash');
   //add keyboard listener
   document.addEventListener('keydown', this.handleKeyDown);
   document.addEventListener('keyup', this.handleKeyUp);
};

sceneGame.update = function() {
  
  console.log(player.y);
  if (player.y > 570) {
    
      //console.log("Cayó");
      /*
      
      platforms[plataforma_activa].alpha = 1;
      
      player.y = platforms[plataforma_activa].y - 50;
      platforms[plataforma_activa].body.checkCollision.up = true;
      */
      if(spaceship_drop_sound.isPlaying === false){
        
        spaceship_drop_sound.stop();
        spaceship_crash_sound.play();
        sceneGame.end(); 
      }
  }else{
    
    if (player.y >= platforms[plataforma_activa].y) {

      
      if(spaceship_drop_sound.isPlaying === false) {
          console.log("Esta cayendo");
          spaceship_thrust_sound.stop();
          spaceship_drop_sound.play();
          console.log(plataforma_activa);
  
      }
  
    } 
     
  }

if (cursors.up.isUp && pointer_abajo === false)
{
    dejar_de_acelerar = true;
    player.anims.stop("thrust");
    if(spaceship_thrust_sound.isPlaying === true) {

        spaceship_thrust_sound.stop();
    }
    player.setFrame(0);
}
else
{
    player.setVelocityX(0);
}

if (player.body.touching.down){
    
    //Sumo puntos si el jugador alcanzó la siguiente plataforma
    if(plataforma_activa !== plataforma_aterior) {
        puntos++;
        console.log(puntos);
        textPuntos.setText(puntos);
        if (puntos % level_up_at === 0){
            textLevelUp.visible = true;
        }
        plataforma_aterior = plataforma_activa;
        puede_despegar = true;

    }

    player.anims.stop("thrust");

    if (plataforma_activa === proxima_plataforma_para_descender && aterrizo ){

        //desplazo hacia abajo fondo
        
        for(let i=0; i < 4; i++){
            sky_background[i].body.velocity.set(0,195);
        }
       
        
        
        //desplazo hacia abajo plataformas

        for(let i= 0; i < cantidad_plataformas; i++) {
            platforms[i].body.velocity.y = 200;
        }

        player.body.velocity.set(0,200);
        
        if(platforms[plataforma_activa].y > 510){
            puede_despegar = true;
            textLevelUp.visible = false;
            //Paro de bajar el fondo y los reposiciono
            for(let i=0; i < 4; i++){
                sky_background[i].body.velocity.set(0,0);
            }
            
            reposicionar_fondo--;
            if(reposicionar_fondo < 0){
                reposicionar_fondo = 3;
                
            }

            if (reposicionar_fondo === 3){

                sky_background[3].y = sky_background[0].y - 200;
                
            }else{
                
                sky_background[reposicionar_fondo].y = sky_background[reposicionar_fondo + 1].y - 200;

            }
            
            
            //Paro de bajar las plataformas y las reposiciono
            for(let i= 0; i < cantidad_plataformas; i++) {
                platforms[i].body.velocity.y = 0;
            }
            player.body.velocity.set(0,0);
            aterrizo = false;
            puede_despegar = true;
            if(proxima_plataforma_para_descender === 0) {

                platforms[3].y = 210;
                platforms[4].y = 110;

                platforms[3].body.checkCollision.up = true;
                platforms[3].alpha = 1;

                platforms[3].setScale(plataforma_sizes[Phaser.Math.Between(0, plataforma_sizes.length - 1)],0.6)
                platforms[3].body.velocity.set(Phaser.Math.Between(plataforma_min_vel, plataforma_max_vel),0);
                
                platforms[4].body.checkCollision.up = true;
                platforms[4].alpha = 1;
                platforms[4].setScale(plataforma_sizes[Phaser.Math.Between(0, plataforma_sizes.length - 1)],0.6)
                platforms[4].body.velocity.set(Phaser.Math.Between(plataforma_min_vel, plataforma_max_vel),0);

            }else if(proxima_plataforma_para_descender === 1) {
                
                platforms[0].y = 110;
                platforms[4].y = 210;
                
                platforms[0].body.checkCollision.up = true;
                platforms[0].alpha = 1;
                platforms[0].setScale(plataforma_sizes[Phaser.Math.Between(0, plataforma_sizes.length - 1)],0.6)
                platforms[0].body.velocity.set(Phaser.Math.Between(plataforma_min_vel, plataforma_max_vel),0);

                platforms[4].body.checkCollision.up = true;
                platforms[4].alpha = 1;
                platforms[4].setScale(plataforma_sizes[Phaser.Math.Between(0, plataforma_sizes.length - 1)],0.6)
                platforms[4].body.velocity.set(Phaser.Math.Between(plataforma_min_vel, plataforma_max_vel),0);
            }else{
                
                platforms[proxima_plataforma_para_descender - 1].y = 110;
                platforms[proxima_plataforma_para_descender - 2].y = 210;

                platforms[proxima_plataforma_para_descender - 1].body.checkCollision.up = true;
                platforms[proxima_plataforma_para_descender - 1].alpha = 1;
                platforms[proxima_plataforma_para_descender - 1].setScale(plataforma_sizes[Phaser.Math.Between(0, plataforma_sizes.length - 1)],0.6)
                platforms[proxima_plataforma_para_descender - 1].body.velocity.set(Phaser.Math.Between(plataforma_min_vel, plataforma_max_vel),0);

                platforms[proxima_plataforma_para_descender - 2].body.checkCollision.up = true;
                platforms[proxima_plataforma_para_descender - 2].alpha = 1;
                platforms[proxima_plataforma_para_descender - 2].setScale(plataforma_sizes[Phaser.Math.Between(0, plataforma_sizes.length - 1)],0.6)
                platforms[proxima_plataforma_para_descender - 2].body.velocity.set(Phaser.Math.Between(plataforma_min_vel, plataforma_max_vel),0);
                
            }
            proxima_plataforma_para_descender += 2;
            if (proxima_plataforma_para_descender  > platforms.length) {

                proxima_plataforma_para_descender -= 5;
            }
            if (proxima_plataforma_para_descender === platforms.length) {

                proxima_plataforma_para_descender = 0;
            }
        }
    }else{
        
        
        if ((cursors.up.isDown || pointer_abajo) && puede_despegar){
            
            player.anims.play("thrust");
            if(spaceship_thrust_sound.isPlaying === false) {

                spaceship_thrust_sound.play();
            }
            platforms[plataforma_activa].body.checkCollision.up = false;
            platforms[plataforma_activa].alpha = 0;
            puede_despegar = false;
            
            if (plataforma_activa !== proxima_plataforma_para_descender) {
                aterrizo = true;
            }
            
            dejar_de_acelerar = false;
            empuje = -5;
            player.setVelocityY(empuje);
        }
    }
}else{

    if(!dejar_de_acelerar){

        empuje *= 1.09;
        player.setVelocityY(empuje);
        if(empuje <= -250) {
            dejar_de_acelerar = true;
        }
    }
}

};


sceneGame.end = function() {
  
  document.removeEventListener('keydown', sceneGame.handleKeyDown);
	this.scene.start('end');
	
};

sceneGame.show_time = function() {

  tiempo_transcurrido_de_juego++;
  //textTiempo.setText(tiempo_transcurrido_de_juego);
  //console.log(tiempo_transcurrido_de_juego);
}

sceneGame.handleKeyDown = function(evt) {
	
  if ((evt.key === 'Enter' || evt.key === '5')) {
    
    //console.log("Abajo");
  }
  
};

sceneGame.handleKeyUp = function(evt) {
	
  if ((evt.key === 'Enter' || evt.key === '5')) {
    
    //console.log("Arriba");
  }
  
};

sceneGame.pointer_down = function() {
      
      //console.log("abajo");
      pointer_abajo = true;
    
  };

  sceneGame.pointer_up = function() {
      
    //console.log("arriba");
    pointer_abajo = false;
};
