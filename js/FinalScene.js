import Phaser from "phaser";

export default class FinalScene extends Phaser.Scene {

    constructor(){

        super("FinalScene");

    }

    create(){

        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        // Fondo oscuro elegante

        this.cameras.main.setBackgroundColor("#120018");

        // Corazones cayendo

        for(let i=0;i<40;i++){

            let heart=this.add.text(

                Phaser.Math.Between(0,w),

                Phaser.Math.Between(-500,0),

                "❤️",

                {

                    fontSize: Phaser.Math.Between(15,35)+"px"

                }

            );

            this.tweens.add({

                targets:heart,

                y:h+100,

                x:heart.x+Phaser.Math.Between(-80,80),

                duration:Phaser.Math.Between(4000,7000),

                repeat:-1,

                delay:i*100

            });

        }

        // Luz central

        let luz=this.add.circle(

            w/2,

            h/2,

            100,

            0xff5fa2,

            .25

        );

        this.tweens.add({

            targets:luz,

            scale:2,

            alpha:.05,

            duration:2000,

            repeat:-1,

            yoyo:true

        });

        // Corazón principal

        let corazon=this.add.text(

            w/2,

            150,

            "❤️",

            {

                fontSize:"100px"

            }

        ).setOrigin(.5);

        this.tweens.add({

            targets:corazon,

            scale:1.2,

            duration:800,

            yoyo:true,

            repeat:-1

        });

        // Texto inicial

        let titulo=this.add.text(

            w/2,

            280,

            "Mi Marce",

            {

                fontSize:"48px",

                color:"#ffffff",

                fontStyle:"bold"

            }

        ).setOrigin(.5);

        titulo.setAlpha(0);

        this.tweens.add({

            targets:titulo,

            alpha:1,

            duration:2000

        });

        // Mensaje

        let mensaje=this.add.text(

            w/2,

            430,

`Llegaste hasta el final...

Este pequeño juego lo hice
pensando en ti.

Gracias por estar en mi vida.

❤️`,

            {

                fontSize:"25px",

                color:"#ffd6ea",

                align:"center",

                wordWrap:{

                    width:320

                }

            }

        ).setOrigin(.5);

        mensaje.setAlpha(0);

        this.tweens.add({

            targets:mensaje,

            alpha:1,

            delay:1500,

            duration:2500

        });

        // Declaración final

        let amor=this.add.text(

            w/2,

            680,

            "❤️ TE AMO MI ESPOSA ❤️",

            {

                fontSize:"32px",

                color:"#ff75ad",

                fontStyle:"bold",

                align:"center"

            }

        ).setOrigin(.5);

        amor.setAlpha(0);

        this.tweens.add({

            targets:amor,

            alpha:1,

            delay:4500,

            duration:3000

        });

        // Botón volver

        let boton=this.add.text(

            w/2,

            780,

            "🌹 Volver a jugar",

            {

                fontSize:"24px",

                backgroundColor:"#ff4d8d",

                padding:{

                    x:20,

                    y:12

                }

            }

        )

        .setOrigin(.5)

        .setInteractive();

        boton.on("pointerdown",()=>{

            this.scene.start("MenuScene");

        });

    }

}
