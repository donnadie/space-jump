// game scene
var sceneGame = new Phaser.Scene("game");

sceneGame.init = function() {

    this.fontColor = '#e9e9e9';
    this.timer_game;
    this.reposicionar_fondo = 0;
    this.player;
    this.cursors;
    this.platforms = [];
    this.collider_platforms = [];
    this.sky_background = [];
    this.empuje = 0;
    this.maximo_empuje = 250;
    this.dejar_de_acelerar = true;
    this.plataforma_activa = 0;
    this.plataforma_anterior = 0;
    this.puede_despegar = true;
    this.aterrizo = true;
    this.cantidad_plataformas = 5
    this.posicion_plataforma_0 = 510;
    this.distancia_entre_plataformas = 100;
    this.proxima_plataforma_para_descender = 2;
    this.pointer_abajo = false;
    this.plataforma_sizes = [0.2, 0.15, 0.1, 0.05];
    this.plataforma_min_vel = 20;
    this.plataforma_max_vel = 40;
    this.level_up_at = 2;
    this.plataformas_restantes = 2;
    this.level_nro = 0;
    this.level_multiplicador = 1;
    this.change_level = 0;
    this.textLevelUp;
    this.spaceship_thrust_sound;
    this.spaceship_drop_sound;
    this.spaceship_crash_sound;
    this.space_sound;
    this.level_up_sound;
    this.points_sound;
    this.background_scene_game_sound;
    puntos = 0;
    space_cow_cant = 0;
    this.plataforma_nro = 0;
    tiempo_transcurrido_de_juego = 0;
    this.delay_warp = 0;
    this.space_cow_velocity_x = -100;
};

sceneGame.preload = function() {
  
};

sceneGame.create = function() {
    
    this.physics.world.setBounds(0, 0, 240, 600);
    
    for(let i=0; i < 4; i++){
        this.sky_background[i] = this.physics.add.sprite(0, 200 * i, 'sky').setOrigin(0, 0).setFrame(i);
        this.sky_background[i].setImmovable(true);
        this.sky_background[i].body.allowGravity = false;
        this.sky_background[i].body.velocity.set(0,0);
    }
    
    this.twin_star = this.add.sprite(200, 460, 'twin_star');

    this.space_cow = this.physics.add.sprite(240, 320, 'space_cow');
    this.space_cow.body.allowGravity = false;
    this.space_cow.body.velocity.set(this.space_cow_velocity_x, 0);
    
    this.space_cow.body.setSize(this.space_cow.width - 15, this.space_cow.height - 6, true); 
    //this.space_cow.body.checkCollision.up = false;
    //this.space_cow.body.checkCollision.left = false;
    //this.space_cow.body.checkCollision.right = false;
    this.space_cow.setDepth(10);

    this.player = this.physics.add.sprite(120, 460, 'spaceship');
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);

    this.player.setDepth(10);
    this.player.body.setSize(this.player.width - 12, this.player.height, true); 

    this.anims.create({
        key: 'space_cow',
        frames: this.anims.generateFrameNumbers('space_cow', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'thrust',
        frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 2 }),
        frameRate: 24,
        repeat: 0
    });
    
    this.anims.create({
        key: 'twin_star',
        frames: this.anims.generateFrameNumbers('twin_star', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: 0
    });

    this.twin_star.anims.play("twin_star");
    this.space_cow.anims.play("space_cow");

    this.collider_space_cow = this.physics.add.collider(this.player, this.space_cow, null, function (){this.player_collides_space_cow = true;}, this);

    for(let i= 0; i < this.cantidad_plataformas; i++) {
        
        this.platforms[i] = this.physics.add.image(120, this.posicion_plataforma_0 - this.distancia_entre_plataformas * i, 'platform_' + Phaser.Math.Between(0, 1)).refreshBody();

        this.platforms[i].setImmovable(true);
        this.platforms[i].body.allowGravity = false;
        this.platforms[i].body.setCollideWorldBounds(true);
        if(i < 3){
            this.platforms[i].body.velocity.set(0,0);
        }else{
            this.platforms[i].body.velocity.set(Phaser.Math.Between(this.plataforma_min_vel, this.plataforma_max_vel),0);
        }
        
        this.platforms[i].body.bounce.set(1);

        this.collider_platforms[i] = this.physics.add.collider(this.player, this.platforms[i], null, function ()
            {
                
                if(this.player.body.velocity.y === 5)
                {
                    this.plataforma_activa = i;
                }
                
            }, this);
        this.platforms[i].body.checkCollision.down = false;
        this.platforms[i].body.checkCollision.left = false;
        this.platforms[i].body.checkCollision.right = false;
    }
    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.pointer_abajo = false;

    this.input.on('pointerdown', sceneGame.pointer_down, this);
    this.input.on('pointerup', sceneGame.pointer_up, this);

    this.cameras.main.setBounds(0, 220, 240, 540)

    this.timer_game = sceneGame.time.addEvent({
      delay: 1,                // ms
      callback: sceneGame.show_time,
      loop: true
    });

    textPuntos = this.add.text(230, 240, "S:" + puntos).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
    textPuntos.setOrigin(1, 0.5);
    
    this.text_space_cow_count = this.add.text(230, 260, "C:" + space_cow_cant).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
    this.text_space_cow_count.setOrigin(1, 0.5);

    this.text_level_nro = this.add.text(5, 240, "L:" + this.level_nro).setFontFamily(fontFamily).setFontSize(15).setColor(this.fontColor );
    this.text_level_nro.setOrigin(0, 0.5);

    this.text_plataformas_restantes = this.add.text(6, 260, this.plataformas_restantes + "/" + this.level_up_at).setFontFamily(fontFamily).setFontSize(10).setColor(this.fontColor );
    this.text_plataformas_restantes.setOrigin(0, 0.5);
    //textTiempo = this.add.text(10, 240, puntos).setFontFamily(fontFamily).setFontSize(20).setColor(this.fontColor );
    //textTiempo.setOrigin(0, 0.5);

    this.textLevelUp = this.add.text(120, 385, "Level Up!").setFontFamily(fontFamily).setFontSize(24).setColor(this.fontColor);
    this.textLevelUp.setOrigin(0.5, 0.5);
    this.textLevelUp.visible = false;
    
    this.text_level__multiplicador = this.add.text(120, 415, this.level_multiplicador).setFontFamily(fontFamily).setFontSize(24).setColor(this.fontColor);
    this.text_level__multiplicador.setOrigin(0.5, 0.5);
    this.text_level__multiplicador.visible = false;

    this.spaceship_thrust_sound = this.sound.add('spaceship_thrust');
    this.spaceship_drop_sound = this.sound.add('spaceship_drop',{
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    });

    this.level_up_sound = this.sound.add('level_up');
    this.points_sound = this.sound.add('points');
    this.space_cow_sound = this.sound.add('space_cow');
    this.spaceship_crash_sound = this.sound.add('spaceship_crash');
    this.spaceship_crash_sound.setVolume(0.2);

    this.space_sound = this.sound.add('space_sound',{
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    });
    this.space_sound.play();
    
    this.background_scene_game_sound = this.sound.add('background_scene_game',{
        mute: false,
        volume: 0.15,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    });
    this.background_scene_game_sound.play();
    //add keyboard listener
   document.addEventListener('keydown', this.handleKeyDown);
   document.addEventListener('keyup', this.handleKeyUp);
};

sceneGame.update = function() {
  
  if(this.player_collides_space_cow === true){
      console.log("Chocó");
      space_cow_cant += this.level_multiplicador;
      this.text_space_cow_count.setText("C:" + space_cow_cant);
      this.space_cow.body.velocity.y = -100;
      this.player_collides_space_cow = false;
      this.space_cow_sound.play();
  }
  if(this.space_cow.y < 120 || this.space_cow.y > 600) {

    this.player_collides_space_cow = false;
    this.space_cow.body.velocity.set(0, 0);
  }

  if(this.space_cow.body.velocity.x < 0) {
    this.physics.world.wrap(this.space_cow, this.delay_warp);      
  }
  

  if(this.twin_star.anims.isPlaying === false) {

    this.twin_star.x = Phaser.Math.Between(10,240);
    this.twin_star.y = Phaser.Math.Between(240,500);
    this.twin_star.anims.play("twin_star");
  }

  if (this.player.y > 570) {
    
      
      /*
      
      this.platforms[this.plataforma_activa].alpha = 1;
      
      this.player.y = this.platforms[this.plataforma_activa].y - 50;
      this.platforms[this.plataforma_activa].body.checkCollision.up = true;
      */
      if(this.spaceship_drop_sound.isPlaying === false){
        
        this.spaceship_drop_sound.stop();
        this.spaceship_crash_sound.play();
        this.space_sound.stop();
        this.background_scene_game_sound.stop();
        sceneGame.end(); 
      }
  }else{
    
    if (this.player.y >= this.platforms[this.plataforma_activa].y) {

      
      if(this.spaceship_drop_sound.isPlaying === false) {
          
          this.spaceship_thrust_sound.stop();
          this.spaceship_drop_sound.play();
      }
  
    } 
     
  }

if (this.cursors.up.isUp && this.pointer_abajo === false)
{
    this.dejar_de_acelerar = true;
    this.player.anims.stop("thrust");
    if(this.spaceship_thrust_sound.isPlaying === true) {

        this.spaceship_thrust_sound.stop();
    }
    this.player.setFrame(0);
}
else
{
    this.player.setVelocityX(0);
}

if (this.player.body.touching.down){
    
    //cambio direccion de la vaca si está a la altura del player
    if(this.player.y > 300 && this.player.y < 400 && this.player.x < this.space_cow.x) {
        
        this.space_cow.flipX = true;
        this.space_cow.body.velocity.x = (-1) * this.space_cow_velocity_x;
    }

    
    //Sumo puntos si el jugador alcanzó la siguiente plataforma
    if(this.plataforma_activa !== this.plataforma_anterior) {

        this.plataforma_nro++;
        puntos += this.level_multiplicador;
        textPuntos.setText("S:" + puntos);
        this.points_sound.play();
        
        this.text_plataformas_restantes.setText((this.level_up_at - (this.plataforma_nro % this.level_up_at)) +  "/" +  this.level_up_at);

        if (this.plataforma_nro % this.level_up_at === 0){
            this.level_nro++;
            this.level_multiplicador++;

            this.textLevelUp.visible = true;
            this.text_level__multiplicador.setText("x" + this.level_multiplicador);
            this.text_level__multiplicador.visible = true;
            this.text_level_nro.setText("L:" + this.level_nro);
            this.level_up_sound.play();
            
            if(this.plataforma_max_vel < 300){
                this.plataforma_max_vel+=20;
            }
            
            
            this.change_level++; 
            
            if(this.change_level % 2 === 0) {
            
                this.change_level = 0;
                this.level_up_at += 2;
                this.text_plataformas_restantes.setText((this.level_up_at - (this.plataforma_nro % this.level_up_at)) +  "/" +  this.level_up_at);
            }
            
        }

        this.plataforma_anterior = this.plataforma_activa;
        this.puede_despegar = true;

    }

    this.player.anims.stop("thrust");

    if (this.plataforma_activa === this.proxima_plataforma_para_descender && this.aterrizo ){

        //desplazo hacia abajo fondo
        
        for(let i=0; i < 4; i++){
            this.sky_background[i].body.velocity.set(0,195);
        }
       
        
        
        //desplazo hacia abajo plataformas

        for(let i= 0; i < this.cantidad_plataformas; i++) {
            this.platforms[i].body.velocity.y = 200;
        }

        this.player.body.velocity.set(0,200);
        
        if(this.platforms[this.plataforma_activa].y > 510){

            //coloco la vaca
            this.space_cow.x = 240;
            this.space_cow.y = 320;
            this.space_cow.flipX = false;
            this.delay_warp = Phaser.Math.Between(0, 0)
            this.space_cow_velocity_x = Phaser.Math.Between(-80, -60);
            this.space_cow.body.velocity.set(this.space_cow_velocity_x, 0);

            this.puede_despegar = true;
            this.textLevelUp.visible = false;
            this.text_level__multiplicador.visible = false;
            //Paro de bajar el fondo y los reposiciono
            for(let i=0; i < 4; i++){
                this.sky_background[i].body.velocity.set(0,0);
            }
            
            this.reposicionar_fondo--;
            if(this.reposicionar_fondo < 0){
                this.reposicionar_fondo = 3;
                
            }

            if (this.reposicionar_fondo === 3){

                this.sky_background[3].y = this.sky_background[0].y - 200;
                
            }else{
                
                this.sky_background[this.reposicionar_fondo].y = this.sky_background[this.reposicionar_fondo + 1].y - 200;

            }
            
            
            //Paro de bajar las plataformas y las reposiciono
            for(let i= 0; i < this.cantidad_plataformas; i++) {
                this.platforms[i].body.velocity.y = 0;
            }
            this.player.body.velocity.set(0,0);
            this.aterrizo = false;
            this.puede_despegar = true;
            if(this.proxima_plataforma_para_descender === 0) {

                this.platforms[3].y = 210;
                this.platforms[4].y = 110;

                this.platforms[3].body.checkCollision.up = true;
                this.platforms[3].alpha = 1;

                this.platforms[3].image = "platform_" + Phaser.Math.Between(0, 1);
                this.platforms[3].body.velocity.set(Phaser.Math.Between(this.plataforma_min_vel, this.plataforma_max_vel),0);
                
                this.platforms[4].body.checkCollision.up = true;
                this.platforms[4].alpha = 1;
                this.platforms[4].image = "platform_" + Phaser.Math.Between(0, 1);
                this.platforms[4].body.velocity.set(Phaser.Math.Between(this.plataforma_min_vel, this.plataforma_max_vel),0);

            }else if(this.proxima_plataforma_para_descender === 1) {
                
                this.platforms[0].y = 110;
                this.platforms[4].y = 210;
                
                this.platforms[0].body.checkCollision.up = true;
                this.platforms[0].alpha = 1;
                this.platforms[0].image = "platform_" + Phaser.Math.Between(0, 1);
                this.platforms[0].body.velocity.set(Phaser.Math.Between(this.plataforma_min_vel, this.plataforma_max_vel),0);

                this.platforms[4].body.checkCollision.up = true;
                this.platforms[4].alpha = 1;
                this.platforms[4].image = "platform_" + Phaser.Math.Between(0, 1);
                this.platforms[4].body.velocity.set(Phaser.Math.Between(this.plataforma_min_vel, this.plataforma_max_vel),0);
            }else{
                
                this.platforms[this.proxima_plataforma_para_descender - 1].y = 110;
                this.platforms[this.proxima_plataforma_para_descender - 2].y = 210;

                this.platforms[this.proxima_plataforma_para_descender - 1].body.checkCollision.up = true;
                this.platforms[this.proxima_plataforma_para_descender - 1].alpha = 1;
                this.platforms[this.proxima_plataforma_para_descender - 1].image = "platform_" + Phaser.Math.Between(0, 1);
                this.platforms[this.proxima_plataforma_para_descender - 1].body.velocity.set(Phaser.Math.Between(this.plataforma_min_vel, this.plataforma_max_vel),0);

                this.platforms[this.proxima_plataforma_para_descender - 2].body.checkCollision.up = true;
                this.platforms[this.proxima_plataforma_para_descender - 2].alpha = 1;
                this.platforms[this.proxima_plataforma_para_descender - 1].image = "platform_" + Phaser.Math.Between(0, 1);
                this.platforms[this.proxima_plataforma_para_descender - 2].body.velocity.set(Phaser.Math.Between(this.plataforma_min_vel, this.plataforma_max_vel),0);
                
            }
            this.proxima_plataforma_para_descender += 2;
            if (this.proxima_plataforma_para_descender  > this.platforms.length) {

                this.proxima_plataforma_para_descender -= 5;
            }
            if (this.proxima_plataforma_para_descender === this.platforms.length) {

                this.proxima_plataforma_para_descender = 0;
            }
        }
    }else{
        
        
        if ((this.cursors.up.isDown || this.pointer_abajo) && this.puede_despegar){
            
            if(this.player.anims.isPlaying === false){

                this.player.anims.play("thrust");
            }

            if(this.spaceship_thrust_sound.isPlaying === false) {

                this.spaceship_thrust_sound.play();
            }
            this.platforms[this.plataforma_activa].body.checkCollision.up = false;
            this.platforms[this.plataforma_activa].alpha = 0;
            this.puede_despegar = false;
            
            if (this.plataforma_activa !== this.proxima_plataforma_para_descender) {
                this.aterrizo = true;
            }
            
            this.dejar_de_acelerar = false;
            this.empuje = -5;
            this.player.setVelocityY(this.empuje);
        }
    }
}else{

    if(!this.dejar_de_acelerar){

        this.empuje *= 1.09;
        this.player.setVelocityY(this.empuje);
        if(this.empuje <= (-1) * this.maximo_empuje) {
            this.dejar_de_acelerar = true;
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
      this.pointer_abajo = true;
    
  };

  sceneGame.pointer_up = function() {
      
    //console.log("arriba");
    this.pointer_abajo = false;
};
