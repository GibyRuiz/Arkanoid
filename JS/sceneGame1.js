class SceneGame extends Phaser.Scene {

    constructor()
    {
        super({key:"SceneGame"})
    }

    preload(){

        this.load.tilemapTiledJSON('tileArka', 'JSON/Arkanoid.json')
        this.load.image('arka', 'Arkanoid.png')
        this.load.image('paleta', 'paleta.png')
        this.load.image('bola', 'bola.png')


    }

    create(){

        this.map = this.make.tilemap({ key: 'tileArka' })
        this.tileset = this.map.addTilesetImage('Arkanoid', "arka")
        this.layer = this.map.createStaticLayer('Capa2', this.tileset, 13, 5)
        this.paleta = this.add.sprite(400, 550, "paleta").setScale(.5)
        this.bola = this.add.sprite(400, 480, "bola").setScale(.3)

        
    }
}