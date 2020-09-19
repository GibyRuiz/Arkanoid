// Importación de clases de la bola y la paleta 
import Paleta from "./paleta.js"
import Bola from "./bola.js"

export default class Escena1 extends Phaser.Scene {

    constructor()
    {
        super({key:"Escena1"})
    }

    preload(){

        // Precarga del json 
        this.load.tilemapTiledJSON('tileArka', 'JSON/Arkanoid.json')

        this.load.image('arka', 'Arkanoid.png')
        this.load.image('paleta', 'paleta.png')
        this.load.image('bola', 'bola.png')
        this.load.image("bg", "bg.jpg")
        this.load.image("bg2", "bg2.jpg")

        // Precarga de spritesheets 
        this.load.spritesheet("coleccionables", "collect.png", { frameWidth: 59, frameHeight: 59 })
        this.load.spritesheet("bolas", "balls.png", { frameWidth: 17, frameHeight: 17 })

        // Precarga de música
        this.load.audio("break", "breakout.mp3" )
    }

    create(){

        var scene = this.scene

        // Ejecucución de la música
        this.music = this.sound.add("break", {loop: true})

        if(booleanMusic){

            this.music.play() 
            booleanMusic = false

        }

        // Background
        this.add.image(-100,0,"bg").setOrigin(0,0).setScale(1.7)

        // Carga de capa de tiles 
        this.map = this.make.tilemap({ key: 'tileArka' })
        this.tileset = this.map.addTilesetImage('Arkanoid', "arka")
        this.layer = this.map.createDynamicLayer('Capa1', this.tileset, 13, 5)

        // Array para almacenar efectos de partículas de las bolas 
        this.arrEmiterBolas = []

        // Instanciación de bola y paleta 
        this.paleta = new Paleta({scene: this, x: 360, y: 550, name: "paleta"})
        this.bola = new Bola({scene: this, x: 400, y: 530, name: "bola"})

        // Evento para cambiar de escena 
        this.spaceKey.on('up', function () {
            
            
            scene.start("Escena2")
        
        })     

        // Array para almacenar efectos de partículas de los coleccionables
        this.arrEmitter = []
    
    }     

}