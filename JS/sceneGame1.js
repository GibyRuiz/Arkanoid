class SceneGame extends Phaser.Scene {

    constructor()
    {
        super({key:"SceneGame"})
    }

    preload(){

        this.load.tilemapTiledJSON('tileArka', 'JSON/Arkanoid.json');
        this.load.image('arka', 'Arkanoid.png');
    }

    create(){

        this.map = this.make.tilemap({ key: 'tileArka' })
        this.tileset = this.map.addTilesetImage('Arkanoid', "arka")
        this.layer = this.map.createStaticLayer('Capa2', this.tileset, 13, 5)

    }
}