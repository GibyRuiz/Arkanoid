export default class Bola extends Phaser.Physics.Arcade.Sprite {

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
        this.escena.map.setCollision([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ])

        this.escena.physics.add.collider(this, this.escena.layer, (bola, tile) => {

            
            

            if(tile.index % 2 == 0){

                this.escena.map.removeTile(tile)
            }

            else{
                
                this.escena.map.putTileAt(tile.index + 1, tile.x, tile.y)
            }

            if(this.particles){

                var particulas = this.particles
            setTimeout(() => {
                particulas.destroy()
            }, 200)
               
            
            }

            this.particles = this.escena.add.particles("bola")
        
            this.emisor = this.particles.createEmitter({
            x: this.x,
            y: this.y,
            scale: { start: 0.2, end: 0.02 },
            quantity: 8,
            accelerationY: 1500,
            frequency: 300,
            speed: 300            
            })
        
            setTimeout(() => {

              this.particles.destroy()

            }, 300)
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