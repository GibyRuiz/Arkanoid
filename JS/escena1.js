import Paleta from "./paleta.js"
import Bola from "./bola.js"

export default class Escena1 extends Phaser.Scene {

    constructor()
    {
        super({key:"Escena1"})
    }

    preload(){

        this.load.tilemapTiledJSON('tileArka', 'JSON/Arkanoid.json')
        this.load.image('arka', 'Arkanoid.png')
        this.load.image('paleta', 'paleta.png')
        this.load.image('bola', 'bola.png')
        this.load.image("bg", "bg.jpg")
        this.load.image("bg2", "bg2.jpg")
        this.load.spritesheet("coleccionables", "collect.png", { frameWidth: 59, frameHeight: 59 })
        this.load.spritesheet("bolas", "balls.png", { frameWidth: 17, frameHeight: 17 })
    }

    create(){

        var scene = this.scene

        this.add.image(-100,0,"bg").setOrigin(0,0).setScale(1.7)
        this.map = this.make.tilemap({ key: 'tileArka' })
        this.tileset = this.map.addTilesetImage('Arkanoid', "arka")
        this.layer = this.map.createDynamicLayer('Capa1', this.tileset, 13, 5)

        this.arrEmiterBolas = []

        this.paleta = new Paleta({scene: this, x: 360, y: 550, name: "paleta"})
        this.bola = new Bola({scene: this, x: 400, y: 530, name: "bola"})

        this.spaceKey.on('up', function () {
            
            
            scene.start("Escena2")
        
        })     

        this.arrEmitter = []
       

        // var particles = this.add.particles('bola')

        // var emisor = particles.createEmitter({
        //     x: 300,
        //     y: 300,
        //     angle: -90,
        //     speed: { min: -100, max: 500 },
        //     gravityY: 0,
        //     scale: { start: 0.4, end: 0.1 },
        //     lifespan: 800,
        //     blendMode: 'SCREEN',
        //     follow: 
        // })

        // emisor.startFollow(this.paleta)
        
    }     

}