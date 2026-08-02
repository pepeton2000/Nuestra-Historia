export default class MemoryBook {

    static abrir(scene){

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

            titulo.destroy();

            contenido.destroy();

            cerrarBtn.destroy();

        };

        let fondo = scene.add.rectangle(

            w/2,

            h/2,

            w,

            h,

            0x120018,

            0.95

        )

        .setInteractive()

        .setDepth(200);

        fondo.on("pointerdown", cerrar, scene);

        let titulo = scene.add.text(

            w/2,

            h/2 - 220,

            "📖 Nuestro Diario",

            {

                fontSize:"36px",

                color:"#ff9ccc",

                fontStyle:"bold"

            }

        )

        .setOrigin(.5)

        .setDepth(201);

        let contenido = scene.add.text(

            w/2,

            h/2 + 20,

`

🌹 Rosas encontradas

💌 Cartas descubiertas

🏆 Logros desbloqueados

"Cada recuerdo contigo
vale más que cualquier tesoro ❤️"

`,

            {

                fontSize:"24px",

                color:"#ffffff",
                align:"center"

            }

        )

        .setOrigin(.5)

        .setDepth(201);

        let cerrarBtn = scene.add.text(

            w/2,

            h/2 + 220,

            "Cerrar diario ✨",

            {

                fontSize:"26px",

                backgroundColor:"#ff4d8d",

                padding:{

                    x:20,

                    y:10

                }

            }

        )

        .setOrigin(.5)

        .setInteractive()

        .setDepth(201);

        cerrarBtn.on("pointerdown", cerrar, scene);

    }

}
