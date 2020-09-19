// Clase de las bolas que se van a crear cada vez que se junte un coleccionable
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

        // Efecto de partículas de las bolas 
        this.efectoParticulasBolas = this.escena.add.particles('bolas')
        this.escena.arrEmiterBolas.push( this.efectoParticulasBolas)

        this.efectoParticulasBolas.createEmitter({
            frame: 2,
            speed: 2,
            quantity: 2,
            gravity: { x: 0, y: 100 },
            scale: { start: 1.6, end: 0.4 },
            follow: this,
            alpha: { start: .05, end: 0 },
            lifespan: 300,
        })

        // Evento en el que se destruyen las bolas y el efecto de rastro de las bolas cuando se choca con el borde inferior del juego 
        this.escena.physics.world.on('worldbounds', () => {
            
            if(this.y >= 550){

                this.efectoParticulasBolas.destroy()
                this.destroy()
                
            }
        })

        // Colisión de la bola con los tiles 
        this.escena.physics.add.collider(this, this.escena.layer, (bola, tile) => {


            if(tile.index % 2 == 0){

                // Carga de sprite para crear el efecto de luz alrededor de los coleccionables 
                this.collectLight = this.escena.physics.add.sprite(this.x, this.y, "bolas", 0).setAlpha(.7).setScale(1.5)

                // Carga de coleccionable cuando se rompe un ladrillo 
                this.collect = this.escena.physics.add.sprite(this.x, this.y, "coleccionables", Math.floor(Math.random() * 8)).setScale(.3)

                 // Coordinación de posición de coleccionable con su efecto 
                this.escena.grupocollect.add(this.collect) 
                this.escena.grupoCollectLight.add(this.collectLight)
                this.collectLight.setVelocity(0, 230)
                this.collect.setVelocity(0, 230)

                 // Se destruye el tile del bloque 
                this.escena.map.removeTile(tile)

                // Efecto de escalamiento de ida y vuelta de la luz que rodea al coleccionable 
                this.escena.tweens.add({
                    targets: this.collectLight,
                    duration:200,
                    ease: 'linear',
                    scale: 2,
                    yoyo: true,
                    repeat: -1
                })

                  // Creación de efecto de partículas de rastro de humo de los coleccionables 
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

             // Cambio de tile de ladrillo sano a roto
            else{
                
                this.escena.map.putTileAt(tile.index + 1, tile.x, tile.y)
            }

             // Se destruye el efecto de partículas de cuando se choca con un ladrillo 
            if(this.particles){

                var particulas = this.particles
                setTimeout(() => {
                    particulas.destroy()
                }, 200)
               
            
            }

              // Se crea el efecto de partículas de cuando se chocha con un ladrillo 
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
        
             // Se destruye el efecto de partículas de cuando se choca con un ladrillo 
            setTimeout(() => {

              this.particles.destroy()

            }, 500)

        })
    
    
        // Colisión de la bola con la paleta. Direccionamiento por resta de abscisas.  
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