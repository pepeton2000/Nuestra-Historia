import Phaser from "phaser";
import Cinematic from "./Cinematic.js";
import Achievements from "./Achievements.js";
import MemoryBook from "./MemoryBook.js";
import Chest from "./Chest.js";
import SaveSystem from "./SaveSystem.js";

export default class GameScene extends Phaser.Scene {

    constructor(){
        super("GameScene");
    }


    create(){

        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        this.partida = SaveSystem.cargar();

        this.rosasEncontradas = this.partida.rosas;

        this.cartasEncontradas = this.partida.cartas;

        // Música de fondo

        this.music=null;

        if(this.cache.audio.exists("musica")){

            try{

                this.music=this.sound.add(

                    "musica",

                    {

                        volume:0.4,

                        loop:true

                    }

                );

                this.music.play();

            }catch(e){}

        }

        // Fondo romántico
        this.cameras.main.setBackgroundColor("#ffc1dc");

        // Luna suave

        this.add.circle(

            330,

            100,

            45,

            0xffffdd,

            0.8

        );

        // Nubes

        for(let i=0;i<5;i++){

            let nube=this.add.text(

                Phaser.Math.Between(0,390),

                Phaser.Math.Between(50,300),

                "☁️",

                {

                    fontSize:"50px"

                }

            );

            this.tweens.add({

                targets:nube,

                x:nube.x+80,

                duration:6000,

                repeat:-1,

                yoyo:true

            });

        }

        // Cielo con luces
        for(let i=0;i<80;i++){

            let star=this.add.circle(
                Phaser.Math.Between(0,w),
                Phaser.Math.Between(0,h),
                Phaser.Math.Between(1,3),
                0xffffff,
                0.7
            );


            this.tweens.add({

                targets:star,

                alpha:0.2,

                duration:Phaser.Math.Between(800,2000),

                yoyo:true,

                repeat:-1

            });

        }



        // Jardín

        this.add.rectangle(

            w/2,
            h/2,
            w,
            h,

            0x7ed957

        );


        // Flores decorativas

        for(let i=0;i<40;i++){

            this.add.text(

                Phaser.Math.Between(0,w),
                Phaser.Math.Between(0,h),

                "🌸",

                {

                    fontSize:"22px"

                }

            );

        }



        // Pétalos cayendo

        this.petalos=[];


        for(let i=0;i<20;i++){

            let p=this.add.text(

                Phaser.Math.Between(0,w),

                Phaser.Math.Between(-300,0),

                "🌹",

                {

                    fontSize:"20px"

                }

            );


            this.petalos.push(p);


            this.tweens.add({

                targets:p,

                y:h+50,

                x:p.x+Phaser.Math.Between(-100,100),

                duration:Phaser.Math.Between(4000,7000),

                repeat:-1,

                delay:i*200

            });


        }




        // Obstáculos decorativos

        this.obstacles=this.physics.add.staticGroup();


        let posiciones=[

            [60,100],

            [330,120],

            [80,300],

            [300,400],

            [100,600]

        ];


        posiciones.forEach(pos=>{


            let arbol=this.add.text(

                pos[0],

                pos[1],

                "🌳",

                {

                    fontSize:"60px"

                }

            );


            this.physics.add.existing(arbol,true);


            this.obstacles.add(arbol);


        });


        // Corazón jugador

        this.player=this.add.text(

            70,

            150,

            "❤️",

            {

                fontSize:"45px"

            }

        );


        this.physics.add.existing(this.player);


        this.player.body.setCollideWorldBounds(true);


        // Efecto latido

        this.tweens.add({

            targets:this.player,

            scale:1.15,

            duration:600,

            yoyo:true,

            repeat:-1

        });

        // ===============================
        // EFECTO MÁGICO DEL CORAZÓN
        // ===============================

        this.cameras.main.startFollow(

            this.player,

            true,

            0.08,

            0.08

        );

        // Luz alrededor del corazón

        this.luz=this.add.circle(

            this.player.x,

            this.player.y,

            40,

            0xff7eb3,

            0.25

        );

        this.luz.setDepth(-1);

        // Partículas de amor

        this.particulas=[];

        for(let i=0;i<15;i++){

            let p=this.add.text(

                this.player.x,

                this.player.y,

                "✨",

                {

                    fontSize:"18px"

                }

            );

            this.particulas.push(p);

        }


        // =============================
        // SISTEMA DE ROSAS
        // =============================

        this.totalRosas = 7;
        this.rosasEncontradas = 0;

        // Contador

        this.contador = this.add.text(

            20,
            20,

            "🌹 Rosas: 0/7",

            {

                fontSize:"24px",

                color:"#ffffff",

                backgroundColor:"#ff4d8d",

                padding:{
                    x:12,
                    y:8
                }

            }

        );

        // Posiciones de las rosas

        const posicionesRosas=[

            [300,120],

            [80,250],

            [300,350],

            [150,480],

            [330,550],

            [80,650],

            [300,720]

        ];

        // Grupo

        this.rosas=this.physics.add.staticGroup();

        // Crear rosas

        posicionesRosas.forEach(pos=>{

            let rosa=this.add.text(

                pos[0],

                pos[1],

                "🌹",

                {

                    fontSize:"45px"

                }

            );

            this.physics.add.existing(rosa,true);

            this.rosas.add(rosa);

            if(pos[0]===300 && pos[1]===720){

                rosa.setText("🌹✨");

                rosa.especial=true;

            }

            // brillo

            this.tweens.add({

                targets:rosa,

                scale:1.2,

                duration:800,

                yoyo:true,

                repeat:-1

            });

        });

        // Colisión rosas

        this.physics.add.overlap(

            this.player,

            this.rosas,

            this.recogerRosa,

            null,

            this

        );


        this.physics.add.collider(

            this.player,

            this.obstacles

        );

        // ===============================
        // COFRES DE RECUERDOS
        // ===============================

        this.cofres=this.physics.add.staticGroup();

        let posicionesCofres=[

            [200,180],

            [300,450],

            [150,600]

        ];

        posicionesCofres.forEach(pos=>{

            let cofre=this.add.text(

                pos[0],

                pos[1],

                "🎁",

                {

                    fontSize:"40px"

                }

            );

            this.physics.add.existing(

                cofre,

                true

            );

            this.cofres.add(cofre);

        });

        this.physics.add.overlap(

            this.player,

            this.cofres,

            this.abrirCofre,

            null,

            this

        );

        // ===============================
        // CARTAS SECRETAS
        // ===============================

        this.totalCartas = 5;

        this.cartasEncontradas = 0;

        this.contadorCartas = this.add.text(

            20,

            70,

            "💌 Cartas: 0/5",

            {

                fontSize:"22px",

                color:"#ffffff",

                backgroundColor:"#9b59b6",

                padding:{

                    x:10,

                    y:8

                }

            }

        );

        const posicionesCartas=[

            [120,180],

            [250,250],

            [100,420],

            [280,520],

            [170,680]

        ];

        this.cartas=this.physics.add.staticGroup();

        posicionesCartas.forEach(pos=>{

            let carta=this.add.text(

                pos[0],

                pos[1],

                "💌",

                {

                    fontSize:"35px"

                }

            );

            this.physics.add.existing(

                carta,

                true

            );

            this.cartas.add(carta);

            this.tweens.add({

                targets:carta,

                y:carta.y-10,

                duration:800,

                yoyo:true,

                repeat:-1

            });

        });

        this.physics.add.overlap(

            this.player,

            this.cartas,

            this.leerCarta,

            null,

            this

        );

        this.keys=this.input.keyboard.createCursorKeys();

        this.audioActivo=true;

        let botonAudio=this.add.text(

            350,

            30,

            "🔊",

            {

                fontSize:"30px"

            }

        )

        .setInteractive();

        botonAudio.on(

            "pointerdown",

            ()=>{

                this.audioActivo=!this.audioActivo;

                if(this.audioActivo){

                    this.sound.setMute(false);

                    botonAudio.setText("🔊");

                }else{

                    this.sound.setMute(true);

                    botonAudio.setText("🔇");

                }

            }

        );

        // Botón diario

        let diario=this.add.text(

            330,

            80,

            "📖",

            {

                fontSize:"35px"

            }

        )

        .setInteractive();

        diario.on(

            "pointerdown",

            ()=>{

                MemoryBook.abrir(this);

            }

        );

        this.createButtons();


    }

    reproducirSonido(key, config={}){

        if(!this.sound || !this.cache.audio.exists(key)){

            return;

        }

        try{

            this.sound.play(key, config);

        }catch(e){}

    }

    recogerRosa(jugador,rosa){

        rosa.destroy();

        if(navigator.vibrate){

            navigator.vibrate(100);

        }

        if(rosa.especial){

            Cinematic.mostrar(

                this,

                "🌹 Una rosa especial",

                "Mi Marce...\n\nEsta rosa representa todos los momentos bonitos que aún nos quedan por vivir ❤️"

            );

        }

        this.reproducirSonido(

            "rosa",

            {

                volume:0.8

            }

        );

        this.rosasEncontradas++;

        SaveSystem.guardar({

            rosas:this.rosasEncontradas,

            cartas:this.cartasEncontradas,

            logros:this.partida.logros,

            completado:false

        });

        if(this.rosasEncontradas===1){

            Achievements.desbloquear(

                this,

                "Primera rosa",

                "Comenzaste nuestra aventura ❤️"

            );

        }

        this.contador.setText(

            "🌹 Rosas: " +

            this.rosasEncontradas +

            "/7"

        );

        const frases=[

            "Eres mi persona favorita ❤️",

            "Gracias por hacerme feliz 🌸",

            "Cada momento contigo vale oro ✨",

            "Eres mi alegría ❤️",

            "Siempre pienso en ti 🌹",

            "Mi lugar favorito es contigo 💕",

            "Llegaste a mi vida para quedarte ❤️"

        ];

        let mensaje=this.add.text(

            195,

            420,

            frases[this.rosasEncontradas-1],

            {

                fontSize:"22px",

                color:"#ffffff",

                backgroundColor:"#ff4d8d",

                padding:{
                    x:15,
                    y:10
                },

                align:"center"

            }

        )

        .setOrigin(.5);

        this.tweens.add({

            targets:mensaje,

            alpha:0,

            y:350,

            duration:2000,

            onComplete:()=>{

                mensaje.destroy();

            }

        });

        if(

            this.rosasEncontradas===this.totalRosas &&

            this.cartasEncontradas===this.totalCartas

        ){

            this.completo();

        }

    }

    abrirCofre(jugador,cofre){

        cofre.destroy();

        const recuerdos=[

            "Mi Marce ❤️\n\nGracias por cada momento bonito.",

            "Un pequeño juego...\npero con mucho cariño 🌹",

            "Espero crear muchos recuerdos más contigo ✨"

        ];

        let mensaje=

        recuerdos[

            Phaser.Math.Between(

                0,

                recuerdos.length-1

            )

        ];

        Chest.abrir(

            this,

            mensaje

        );

    }

    leerCarta(jugador,carta){

        carta.destroy();

        this.cartasEncontradas++;

        SaveSystem.guardar({

            rosas:this.rosasEncontradas,

            cartas:this.cartasEncontradas,

            logros:this.partida.logros,

            completado:false

        });

        if(this.cartasEncontradas===1){

            Achievements.desbloquear(

                this,

                "Primera carta",

                "Encontraste un mensaje especial 💌"

            );

        }

        this.contadorCartas.setText(

            "💌 Cartas: "

            +

            this.cartasEncontradas

            +

            "/5"

        );

        const mensajes=[

            "Mi Marce ❤️\nGracias por aparecer en mi vida.",

            "Eres una persona increíble 🌹\nNunca olvides lo especial que eres.",

            "Cada sonrisa tuya hace mi mundo mejor ✨",

            "Contigo quiero seguir creando recuerdos ❤️",

            "Llegaste a mi vida y espero que te quedes siempre 💕"

        ];

        let cartaGrande=this.add.rectangle(

            195,

            420,

            330,

            250,

            0xffffff

        );

        let texto=this.add.text(

            195,

            420,

            mensajes[this.cartasEncontradas-1],

            {

                fontSize:"23px",

                color:"#9b59b6",

                align:"center",

                wordWrap:{

                    width:280

                }

            }

        )

        .setOrigin(.5);

        this.time.delayedCall(

            3000,

            ()=>{

                cartaGrande.destroy();

                texto.destroy();

            }

        );

    }

    completo(){

        this.physics.pause();

        Achievements.desbloquear(

            this,

            "Historia completada",

            "Encontraste todo mi amor ❤️"

        );

        this.reproducirSonido(

            "ganar",

            {

                volume:1

            }

        );

        this.add.text(

            195,

            420,

            "🏆\n\n¡Encontraste todas las rosas!\n\nPreparando sorpresa ❤️",

            {

                fontSize:"28px",

                color:"#ffffff",

                align:"center"

            }

        )

        .setOrigin(.5);

        SaveSystem.guardar({

            rosas:this.rosasEncontradas,

            cartas:this.cartasEncontradas,

            logros:this.partida.logros,

            completado:true

        });

        this.time.delayedCall(3000,()=>{

            this.scene.start("FinalScene");

        });

    }

    createButtons(){

        const h = this.cameras.main.height;

        // Fondo de botones

        const estilo = {

            fontSize:"45px",

            color:"#ffffff",
            backgroundColor:"#ffffff33",
            padding:{
                x:15,
                y:10
            }

        };

        this.btnLeft=this.add.text(

            60,

            h-90,

            "◀",

            estilo

        )
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);

        this.btnRight=this.add.text(

            200,

            h-90,

            "▶",

            estilo

        )
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);

        this.btnUp=this.add.text(

            130,

            h-150,

            "▲",

            estilo

        )
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);

        this.btnDown=this.add.text(

            130,

            h-30,

            "▼",

            estilo

        )
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);

        this.mobile={

            left:false,
            right:false,
            up:false,
            down:false

        };

        this.activarBoton(

            this.btnLeft,

            "left"

        );

        this.activarBoton(

            this.btnRight,

            "right"

        );

        this.activarBoton(

            this.btnUp,

            "up"

        );

        this.activarBoton(

            this.btnDown,

            "down"

        );

    }

    activarBoton(boton,direccion){

        const soltar = ()=>{

            this.mobile[direccion]=false;

            boton.setScale(1);

        };

        boton.on(

            "pointerdown",

            ()=>{

                this.mobile[direccion]=true;

                boton.setScale(0.9);

            }

        );

        boton.on(

            "pointerup",

            soltar

        );

        boton.on(

            "pointerout",

            soltar

        );

        boton.on(

            "pointercancel",

            soltar

        );

        boton.on(

            "pointerleave",

            soltar

        );

        boton.on(

            "touchstart",
            ()=>{

                this.mobile[direccion]=true;

                boton.setScale(0.9);

            },

            this

        );

        boton.on(

            "touchend",
            soltar,

            this

        );

        boton.on(

            "touchcancel",
            soltar,

            this

        );

    }


    update(){

        const speed=200;

        let vx=0;

        let vy=0;

        if(this.keys.left.isDown || this.mobile.left){

            vx=-speed;

        }

        if(this.keys.right.isDown || this.mobile.right){

            vx=speed;

        }

        if(this.keys.up.isDown || this.mobile.up){

            vy=-speed;

        }

        if(this.keys.down.isDown || this.mobile.down){

            vy=speed;

        }

        this.player.body.setVelocity(

            vx,

            vy

        );

        // Animación de movimiento

        if(vx!==0 || vy!==0){

            this.player.rotation +=0.03;

        }

        // Actualizar efectos

        this.luz.x=this.player.x;

        this.luz.y=this.player.y;

        this.particulas.forEach((p,index)=>{

            p.x=this.player.x + 
            Math.sin(Date.now()/300+index)*35;

            p.y=this.player.y -
            (index*5);

            p.alpha=

            Math.abs(
                Math.sin(Date.now()/500+index)
            );

        });

    }


}
