class Paleta extends Phaser.Physics.Arcade.Sprite {

    constructor(config) {

        super(config.scene, config.x, config.y, config.name)
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.setScale(.5)
        this.setCollideWorldBounds(true)
        this.setOrigin(0,0)
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