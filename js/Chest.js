export default class Chest {

    static abrir(scene, mensaje){

        const w = scene.cameras.main.width;
        const h = scene.cameras.main.height;

        scene.physics.pause();

        let cerrado = false;

        const cerrar = ()=>{

            if(cerrado){

                return;

            }

            cerrado = true;

            fondo.off("pointerdown", cerrar);

            fondo.destroy();

            cofre.destroy();

            texto.destroy();

            boton.destroy();

            scene.physics.resume();

        };

        let fondo = scene.add.rectangle(

            w/2,

            h/2,

            w,

            h,

            0x000000,

            0.75

        )

        .setInteractive()

        .setDepth(300);

        fondo.on("pointerdown", cerrar, scene);

        let cofre = scene.add.text(

            w/2,

            h/2 - 110,

            "🎁",

            {

                fontSize:"90px"

            }

        )

        .setOrigin(.5)

        .setDepth(301);

        scene.tweens.add({

            targets:cofre,

            scale:1.2,

            duration:600,

            yoyo:true,

            repeat:2

        });

        let texto = scene.add.text(

            w/2,

            h/2 + 80,

            mensaje,

            {

                fontSize:"25px",

                color:"#ffffff",

                align:"center",

                wordWrap:{

                    width:320

                }

            }

        )

        .setOrigin(.5)

        .setDepth(301);

        let boton = scene.add.text(

            w/2,

            h/2 + 220,

            "Continuar ❤️",

            {

                fontSize:"25px",

                backgroundColor:"#ff4d8d",

                padding:{

                    x:20,

                    y:10

                }

            }

        )

        .setOrigin(.5)

        .setInteractive()

        .setDepth(301);

        boton.on("pointerdown", cerrar, scene);

    }

}
