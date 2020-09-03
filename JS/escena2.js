class Escena2 extends Phaser.Scene {

    constructor()
    {
        super({key:"Escena2"})
    }

    create(){
        
        var scene = this.scene

        this.map = this.make.tilemap({ key: 'tileArka' })
        this.tileset = this.map.addTilesetImage('Arkanoid', "arka")
        this.layer = this.map.createDynamicLayer('Capa2', this.tileset, 13, 5)

        this.paleta = new Paleta({scene: this, x: 360, y: 550, name: "paleta"})
    
        this.bola = new Bola({scene: this, x: 400, y: 530, name: "bola"})

        this.spaceKey.on('up', function () {
            
            
            scene.start("Escena1")
        
        })

    }

}

