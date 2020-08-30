class Paleta extends Phaser.Physics.Arcade.Sprite {

    constructor(config) {

        super(config.scene, config.x, config.y, config.name)
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.setScale(.5)
        this.setCollideWorldBounds(true)
        this.setOrigin(0,0)

        config.scene.cursors = config.scene.input.keyboard.createCursorKeys()
        config.scene.spaceKey = config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        config.scene.update = () => {

            if (config.scene.cursors.left.isDown)

            {
                this.setVelocity(-600, 0)
            }

            
            else if (config.scene.cursors.right.isDown)

            {
                this.setVelocity(+600, 0)
            }

            else 
            
            {
                this.setVelocity(0, 0)
            }

            if(config.scene.bola.y > 583){
            
                config.scene.bola.destroy()
            }
        }
    } 
}

    
class Bola extends Phaser.Physics.Arcade.Sprite {

    constructor(config) {

        super(config.scene, config.x, config.y, config.name)
        this.escena = config.scene
        this.escena.add.existing(this)
        this.escena.physics.add.existing(this)
        this.setScale(.3)
        this.setCollideWorldBounds(true)
        this.setBounce(1.1)
        this.setVelocity(100, -300)
        this.paleta = this.escena.paleta
        this.escena.map.setCollision([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ])

        this.escena.physics.add.collider(this, this.escena.layer, (bola, tile) => {

            this.escena.map.removeTile(tile)
        })

        this.escena.add.text(20, 580, 'Presiona "espacio" para cambiar de capa')

        this.escena.physics.add.overlap(this.paleta, this, () => {
            
            if((this.x - this.paleta.x) > 87){

                this.setVelocity(100,-300)
            }

            else if((this.x - this.paleta.x) < 27){

                this.setVelocity(-100,-300)
            }

            else if((this.x - this.paleta.x) > 27 && (this.x - this.paleta.x) < 50){

                this.setVelocity(-60,-300)
            }

            else if((this.x - this.paleta.x) > 70 && (this.x - this.paleta.x) < 87){

                this.setVelocity(60,-300)
            }

            else if((this.x - this.paleta.x) < 70 && (this.x - this.paleta.x) > 60){

                this.setVelocity(40,-300)
            }

            else if((this.x - this.paleta.x) < 60 && (this.x - this.paleta.x) > 50){

                this.setVelocity(-40,-300)
            }
        
        })
    }
}