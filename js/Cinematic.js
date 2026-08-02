export default class Cinematic {

    static mostrar(scene, titulo, mensaje){

        const w = scene.cameras.main.width;
        const h = scene.cameras.main.height;

        let cerrado = false;

        const cerrar = ()=>{

            if(cerrado){

                return;

            }

            cerrado = true;

            fondo.off("pointerdown", cerrar);

            fondo.destroy();

            textoTitulo.destroy();

            texto.destroy();

            if(timer){

                scene.time.removeEvent(timer);

            }

        };

        let fondo = scene.add.rectangle(

            w/2,

            h/2,

            w,

            h,

            0x000000,

            0.85

        )

        .setInteractive()

        .setDepth(50);

        fondo.on("pointerdown", cerrar, scene);

        let textoTitulo = scene.add.text(

            w/2,

            h/2 - 80,

            titulo,

            {

                fontSize:"35px",

                color:"#ff8fc7",

                fontStyle:"bold",

                align:"center"

            }

        )

        .setOrigin(.5)

        .setDepth(51);

        let texto = scene.add.text(

            w/2,

            h/2 + 20,

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

        let timer = scene.time.delayedCall(4000, cerrar);

    }

}
