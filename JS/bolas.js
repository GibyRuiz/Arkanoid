export default class Bola2 extends Phaser.Physics.Arcade.Sprite {

    constructor(config) {

        super(config.scene, config.x, config.y, config.name)
        this.escena = config.scene
        this.escena.add.existing(this)
        this.escena.physics.add.existing(this)
        this.setScale(.3)
        this.setCollideWorldBounds(true)
        this.setBounce(1.1)
        this.setVelocity(Math.floor(Math.random() * 200) , -400)
        this.paleta = this.escena.paleta
        this.body.onWorldBounds = true

        this.escena.physics.world.on('worldbounds', () => {
            
            if(this.y >= 550){
                this.destroy()
            }
        });

        this.escena.physics.add.collider(this, this.escena.layer, (bola, tile) => {


            if(tile.index % 2 == 0){

                this.collect = this.escena.physics.add.sprite(this.x, this.y, "coleccionables", Math.floor(Math.random() * 8)).setScale(.3)
                this.escena.grupocollect.add(this.collect) 
                this.collect.setVelocity(0, 230)

                this.escena.map.removeTile(tile)

                this.escena.particles = this.escena.add.particles('bola')

                this.escena.arrEmitter.push( this.escena.particles)

                this.escena.particles.createEmitter({
                    
                        angle: -90,
                        speed: { min: -100, max: 500 },
                        gravityY: 0,
                        scale: { start: 0.4, end: 0.1 },
                        lifespan: 800,
                        blendMode: 'SCREEN',
                        follow: this.collect,
                        alpha: .3,
                        
                        
                    })

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
            
            this.particles = this.escena.add.particles("bolas")

            var frame

            
            switch (tile.index) {

                        case 2:
                                frame = 1
                                break

                        case 4:
                            frame = 3
                                break

                        case 6:
                            frame = 2
                                break

                        case 8:
                            frame = 0
                                break

                        case 10:
                            frame = 5
                                break

                        case 12:
                            frame = 4
                            break
        
                        case 14:
                            frame = 5
                                break
        
                        case 16:
                            frame = 3
                                break
            
                        default:
                                break
            }

           

            
        
            this.emisor = this.particles.createEmitter({
            x: this.x,
            y: this.y - 20,
            scale: { start: .9, end: 0.1 },
            quantity: 8,
            accelerationY: 2500,
            frequency: 500,
            speed: 500,
            frame: frame
            })
        
            setTimeout(() => {

              this.particles.destroy()

            }, 500)

        })
    


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