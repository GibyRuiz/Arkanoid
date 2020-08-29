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

        this.cursors = this.input.keyboard.createCursorKeys()

        this.text = this.add.text(20, 580, 'Presiona "espacio" para cambiar de capa')

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.spaceKey.on('up', function () {
            
            
            scene.start("SceneGame")
        
        })

        this.map.setCollision([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ])

        this.physics.add.collider(this.bola, this.layer, (bola, tile) => {

            this.map.removeTile(tile)

        })

    }

    update(){

        if (this.cursors.left.isDown)

            {
                this.paleta.setVelocity(-600, 0)
            }

            
        else if (this.cursors.right.isDown)

            {
                this.paleta.setVelocity(+600, 0)
            }

        else 
            
            {
                this.paleta.setVelocity(0, 0)
            }

        if(this.bola.y > 583){

            this.bola.destroy()
        }

    }
}

