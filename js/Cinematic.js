export default class Cinematic {

    static mostrar(scene, titulo, mensaje){

        const w = scene.cameras.main.width;
        const h = scene.cameras.main.height;

        let fondo = scene.add.rectangle(

            w/2,

            h/2,

            w,

            h,

            0x000000,

            0.85

        );

        fondo.setDepth(50);

        let textoTitulo = scene.add.text(

            w/2,

            250,

            titulo,

            {

                fontSize:"35px",

                color:"#ff8fc7",

                fontStyle:"bold"

            }

        )

        .setOrigin(.5)

        .setDepth(51);

        let texto = scene.add.text(

            w/2,

            400,

            mensaje,

            {

                fontSize:"24px",

                color:"#ffffff",

                align:"center",

                wordWrap:{

                    width:320

                }

            }

        )

        .setOrigin(.5)

        .setDepth(51);

        scene.tweens.add({

            targets:[textoTitulo,texto],

            alpha:{

                from:0,

                to:1

            },

            duration:1500

        });

        scene.time.delayedCall(

            4000,

            ()=>{

                fondo.destroy();

                textoTitulo.destroy();

                texto.destroy();

            }

        );

    }

}
