import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {

    constructor(){

        super("MenuScene");

    }


    create(){

        const w = this.cameras.main.width;
        const h = this.cameras.main.height;


        // Fondo

        this.cameras.main.setBackgroundColor("#ffb6d9");


        // Círculos de luz de fondo

        for(let i=0;i<20;i++){

            let luz=this.add.circle(

                Phaser.Math.Between(0,w),

                Phaser.Math.Between(0,h),

                Phaser.Math.Between(20,80),

                0xffffff,

                0.08

            );


            this.tweens.add({

                targets:luz,

                y:luz.y+100,

                duration:Phaser.Math.Between(3000,6000),

                repeat:-1,

                yoyo:true

            });


        }



        // Pétalos flotando

        for(let i=0;i<25;i++){

            let petalo=this.add.text(

                Phaser.Math.Between(0,w),

                Phaser.Math.Between(0,h),

                "🌸",

                {

                    fontSize:"25px"

                }

            );


            this.tweens.add({

                targets:petalo,

                y:petalo.y-80,

                x:petalo.x+Phaser.Math.Between(-60,60),

                alpha:0.2,

                duration:Phaser.Math.Between(2500,5000),

                repeat:-1,

                yoyo:true

            });


        }





        // Corazón principal

        let corazon=this.add.text(

            w/2,

            150,

            "❤️",

            {

                fontSize:"110px"

            }

        )

        .setOrigin(.5);


        this.tweens.add({

            targets:corazon,

            scale:1.15,

            duration:700,

            repeat:-1,

            yoyo:true

        });






        // Título

        let titulo=this.add.text(

            w/2,

            300,

            "Nuestra Historia",

            {

                fontSize:"42px",

                fontStyle:"bold",

                color:"#ffffff",

                shadow:{

                    offsetX:3,

                    offsetY:3,

                    color:"#b03a6f",

                    blur:5

                }

            }

        )

        .setOrigin(.5);


        titulo.setAlpha(0);


        this.tweens.add({

            targets:titulo,

            alpha:1,

            y:280,

            duration:2000

        });







        // Para quien es

        this.add.text(

            w/2,

            360,

            "Una aventura creada para\nMi Marce ❤️",

            {

                fontSize:"25px",

                color:"#fff",

                align:"center"

            }

        )

        .setOrigin(.5);







        // Botón

        let boton=this.add.rectangle(

            w/2,

            560,

            260,

            75,

            0xff4d8d

        )

        .setInteractive();


        this.add.text(

            w/2,

            560,

            "COMENZAR 🌹",

            {

                fontSize:"28px",

                fontStyle:"bold",

                color:"#ffffff"

            }

        )

        .setOrigin(.5);




        this.tweens.add({

            targets:boton,

            scale:1.08,

            duration:900,

            repeat:-1,

            yoyo:true

        });






        boton.on("pointerdown",()=>{


            this.cameras.main.fadeOut(

                700,

                0,

                0,

                0

            );


            this.time.delayedCall(700,()=>{

                this.scene.start("StoryScene");

            });


        });



    }


}
