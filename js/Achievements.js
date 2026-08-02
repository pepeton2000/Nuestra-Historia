export default class Achievements {

    static desbloquear(scene, titulo, descripcion){

        const w = scene.cameras.main.width;

        let cerrado = false;

        const cerrar = ()=>{

            if(cerrado){

                return;

            }

            cerrado = true;

            fondo.off("pointerdown", cerrar);

            fondo.destroy();

            texto.destroy();

            detalle.destroy();

        };

        let fondo = scene.add.rectangle(

            w/2,

            90,

            330,

            90,

            0x000000,

            0.8

        )

        .setInteractive();

        fondo.on("pointerdown", cerrar, scene);

        let texto = scene.add.text(

            w/2,

            70,

            "🏆 "+titulo,

            {

                fontSize:"24px",

                color:"#ffd700",

                fontStyle:"bold"

            }

        )

        .setOrigin(.5);

        let detalle = scene.add.text(

            w/2,

            105,

            descripcion,

            {

                fontSize:"18px",

                color:"#ffffff"

            }

        )

        .setOrigin(.5);

        fondo.setDepth(100);

        texto.setDepth(101);

        detalle.setDepth(101);

        scene.tweens.add({

            targets:[fondo,texto,detalle],

            y:"+=20",

            duration:700,

            yoyo:true,

            hold:1800,

            onComplete:()=>{

                fondo.destroy();

                texto.destroy();

                detalle.destroy();

            }

        });

    }

}
