import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {

    constructor() {

        super("BootScene");

    }

    preload() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // AUDIO DEL JUEGO

        this.load.audio(

            "musica",

            "assets/audio/musica.mp3"

        );

        this.load.audio(

            "rosa",

            "assets/audio/rosa.mp3"

        );

        this.load.audio(

            "ganar",

            "assets/audio/ganar.mp3"

        );

        this.add.text(width / 2, height / 2 - 60,

            "Nuestra Historia ❤️",

            {

                fontSize: "32px",

                color: "#ffffff",

                fontStyle: "bold"

            }

        ).setOrigin(.5);

        const box = this.add.rectangle(width / 2, height / 2, 250, 24, 0x444444);

        const bar = this.add.rectangle(width / 2 - 120, height / 2, 0, 18, 0xff5fa2);

        bar.setOrigin(0, .5);

        this.load.on("progress", (value) => {

            bar.width = 240 * value;

        });

        this.load.on("complete", () => {

            this.time.delayedCall(500, () => {

                this.scene.start("MenuScene");

            });

        });

    }

}
