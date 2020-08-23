var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: "#f000000",
    scene: [SceneGame, Escena2],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            },
            
        }
    },
};

new Phaser.Game(config)

var num = 0