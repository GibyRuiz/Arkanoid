// Importación de clases de la bola y la paleta 
import Paleta from "./paleta.js"
import Bola from "./bola.js"


export default class Escena2 extends Phaser.Scene {

    constructor()
    {
        super({key:"Escena2"})
    }

    create(){
        
        var scene = this.scene

        // Background
        this.add.image(-100,0,"bg2").setOrigin(0,0).setScale(1.7)

        // Carga de capa de tiles 
        this.map = this.make.tilemap({ key: 'tileArka' })
        this.tileset = this.map.addTilesetImage('Arkanoid', "arka")
        this.layer = this.map.createDynamicLayer('Capa2', this.tileset, 13, 5)

        // Array para almacenar efectos de partículas de las bolas 
        this.arrEmiterBolas = []

        // Instanciación de bola y paleta 
        this.paleta = new Paleta({scene: this, x: 360, y: 550, name: "paleta"})
        this.bola = new Bola({scene: this, x: 400, y: 530, name: "bola"})

        // Evento para cambiar de escena 
        this.spaceKey.on('up', function () {
            
            
            scene.start("Escena1")
        
        })

        // Array para almacenar efectos de partículas de los coleccionables
        this.arrEmitter = []
       

    }

}

