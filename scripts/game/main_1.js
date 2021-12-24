var config = {
    type: Phaser.AUTO,
    width: 240,
    height: 320,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var platforms = [];
var collider_platforms = [];
var sky_background = [];
var empuje = 0;
var dejar_de_acelerar = true;
var game = new Phaser.Game(config);

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

function preload ()
{
    
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('spaceship', 'assets/spaceship.png', { frameWidth: 32, frameHeight: 34 });
    this.load.spritesheet('sky', 'assets/sky.png', { frameWidth: 240, frameHeight: 200 });
}

function create ()
{

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
    player.body.setSize(player.width - 24, player.height, true); 


    this.anims.create({
        key: 'thrust',
        frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 2 }),
        frameRate: 24,
        repeat: -1
    });
    
    for(let i= 0; i < cantidad_plataformas; i++) {
        
        platforms[i] = this.physics.add.image(120, posicion_plataforma_0 - distancia_entre_plataformas * i, 'ground').setScale(0.05 * (i + 1),0.6).refreshBody();

        platforms[i].setImmovable(true);
        platforms[i].body.allowGravity = false;
        platforms[i].body.setCollideWorldBounds(true);
        platforms[i].body.velocity.set(0,0);
        platforms[i].body.bounce.set(1);

        collider_platforms[i] = this.physics.add.collider(player, platforms[i], null, function ()
            {
                
                if(player.body.velocity.y === 5)
                {
                    plataforma_activa = i;
                }
                
            }, this);
        platforms[i].body.checkCollision.down = false;
    }
    
    cursors = this.input.keyboard.createCursorKeys();

    
    this.cameras.main.setBounds(0, 220, 240, 540)

}

function update ()
{
    
    if (player.y > 580) {

        console.log("Cayó");

        
        platforms[plataforma_activa].alpha = 1;
        
        player.y = platforms[plataforma_activa].y - 50;
        platforms[plataforma_activa].body.checkCollision.up = true;

    }

    if (cursors.up.isUp)
    {
        dejar_de_acelerar = true;
        player.anims.stop("thrust");
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
            plataforma_aterior = plataforma_activa;
        }

        player.anims.stop("thrust");
        if (plataforma_activa === proxima_plataforma_para_descender && aterrizo ){

            //desplazo hacia abajo fondo
           
            for(let i=0; i < 4; i++){
                sky_background[i].body.velocity.set(0,195);
            }
           
            
            
            //desplazo hacia abajo plataformas

            for(let i= 0; i < cantidad_plataformas; i++) {
                platforms[i].body.velocity.set(0,200);
            }

            player.body.velocity.set(0,200);
            
            if(platforms[plataforma_activa].y > 510){

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
                    platforms[i].body.velocity.set(0,0);
                }
                player.body.velocity.set(0,0);
                aterrizo = false;
                puede_despegar = true;
                if(proxima_plataforma_para_descender === 0) {

                    platforms[3].y = 210;
                    platforms[4].y = 110;

                    platforms[3].body.checkCollision.up = true;
                    platforms[3].alpha = 1;

                    platforms[4].body.checkCollision.up = true;
                    platforms[4].alpha = 1;
                }else if(proxima_plataforma_para_descender === 1) {
                    platforms[0].y = 110;
                    platforms[4].y = 210;
                    
                    platforms[0].body.checkCollision.up = true;
                    platforms[0].alpha = 1;

                    platforms[4].body.checkCollision.up = true;
                    platforms[4].alpha = 1;
                }else{
                    
                    platforms[proxima_plataforma_para_descender - 1].y = 110;
                    platforms[proxima_plataforma_para_descender - 2].y = 210;

                    platforms[proxima_plataforma_para_descender - 1].body.checkCollision.up = true;
                    platforms[proxima_plataforma_para_descender - 1].alpha = 1;

                    platforms[proxima_plataforma_para_descender - 2].body.checkCollision.up = true;
                    platforms[proxima_plataforma_para_descender - 2].alpha = 1;
                    
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
            puede_despegar = true;
            if (cursors.up.isDown && puede_despegar){
                
                player.anims.play("thrust");
                platforms[plataforma_activa].body.checkCollision.up = false;
                platforms[plataforma_activa].alpha = 0.2;
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

}

