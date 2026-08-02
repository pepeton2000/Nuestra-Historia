import Phaser from "phaser";

import BootScene from "./BootScene";
import MenuScene from "./MenuScene";
import StoryScene from "./StoryScene";
import GameScene from "./GameScene";
import FinalScene from "./FinalScene";

const config = {

    type: Phaser.AUTO,

    parent: "game",

    width: 390,

    height: 844,

    resolution: window.devicePixelRatio || 1,

    backgroundColor: "#0b1020",

    physics: {

        default: "arcade",

        arcade: {

            debug: false

        }

    },

    scale: {

        mode: Phaser.Scale.FIT,

        autoCenter: Phaser.Scale.CENTER_BOTH,

        width:390,

        height:844

    },

    scene: [

        BootScene,
        MenuScene,
        StoryScene,
        GameScene,
        FinalScene

    ]

};

if(screen.orientation){

    screen.orientation.lock("portrait")

    .catch(()=>{});

}

new Phaser.Game(config);
