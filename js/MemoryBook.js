export default class MemoryBook {

    static abrir(scene){

        const w = scene.cameras.main.width;
        const h = scene.cameras.main.height;

        let fondo = scene.add.rectangle(

            w/2,

            h/2,

            w,

            h,

            0x120018,

            0.95

        );

        fondo.setDepth(200);

        let titulo = scene.add.text(

            w/2,

            100,

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

            300,

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

        let cerrar = scene.add.text(

            w/2,

            700,

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

        cerrar.on(

            "pointerdown",

            ()=>{

                fondo.destroy();

                titulo.destroy();

                contenido.destroy();

                cerrar.destroy();

            }

        );

    }

}
