import Phaser from "phaser";

export default class StoryScene extends Phaser.Scene {

    constructor(){

        super("StoryScene");

    }

    create(){

        const w=this.cameras.main.width;

        const h=this.cameras.main.height;

        this.cameras.main.setBackgroundColor("#120018");

        // Corazones flotando

        for(let i=0;i<25;i++){

            let corazon=this.add.text(

                Phaser.Math.Between(0,w),

                Phaser.Math.Between(-200,h),

                "❤️",

                {

                    fontSize:Phaser.Math.Between(15,35)+"px"

                }

            );

            this.tweens.add({

                targets:corazon,

                y:h+100,

                duration:Phaser.Math.Between(4000,7000),

                repeat:-1,

                delay:i*200

            });

        }

        let titulo=this.add.text(

            w/2,

            150,

            "Nuestra Historia ❤️",

            {

                fontSize:"42px",

                color:"#ff8fc7",

                fontStyle:"bold"

            }

        )

        .setOrigin(.5);

        titulo.setAlpha(0);

        this.tweens.add({

            targets:titulo,

            alpha:1,

            duration:2000

        });

        let texto=this.add.text(

            w/2,

            350,

            "",

            {

                fontSize:"24px",

                color:"#ffffff",
                align:"center",
                wordWrap:{

                    width:330

                }

            }

        )

        .setOrigin(.5);

        let historia=

`Hola Mi Marce ❤️

Este pequeño juego fue creado
especialmente para ti.

Aquí encontrarás rosas,
recuerdos y mensajes.

Pero sobre todo...

un pedacito de mi cariño.

Gracias por estar en mi vida ❤️`;

        let posicion=0;

        this.time.addEvent({

            delay:55,

            repeat:historia.length-1,

            callback:()=>{

                texto.text += historia[posicion];

                posicion++;
            }

        });

        let boton=this.add.text(

            w/2,

            720,

            "Comenzar aventura 🌹",

            {

                fontSize:"25px",

                backgroundColor:"#ff4d8d",

                padding:{

                    x:20,

                    y:12

                }

            }

        )

        .setOrigin(.5)

        .setInteractive();

        boton.setAlpha(0);

        this.tweens.add({

            targets:boton,

            alpha:1,

            delay:5000,

            duration:2000

        });

        boton.on("pointerdown",()=>{

            this.cameras.main.fadeOut(

                800,

                0,

                0,

                0

            );

            this.time.delayedCall(

                800,

                ()=>{

                    this.scene.start("GameScene");

                }

            );

        });

    }

}
