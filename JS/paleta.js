// Importación de clase de la bola secundaria 
import Bola2 from "./bolas.js"

export default class Paleta extends Phaser.Physics.Arcade.Sprite {

    constructor(config) {

        super(config.scene, config.x, config.y, config.name)
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.setScale(.5)
        this.setCollideWorldBounds(true)
        this.setOrigin(0,0)
        this.cortaUpdate = true
        
        // Creación de cursores 
        config.scene.cursors = config.scene.input.keyboard.createCursorKeys()

        // Funcionalidad a la barra espaciadora 
        config.scene.spaceKey = config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // Creación de sprite para el efecto de relámpago cuando se junta un coleccionable
        var bolaAlfa = config.scene.add.image(this.x, this.y, "bola").setScale(.2)
        bolaAlfa.alpha = 0

        // Declaración de método Update al objeto de la escena 
        config.scene.update = () => {

            if(config.scene.grupocollect && this.cortaUpdate){

                var incrementoTamañoBola = 0

                // Colisión entre la barra y el coleccionable 
                config.scene.physics.add.overlap(this, config.scene.grupocollect, (paleta, collect) => {
                    
                    collect.destroy()

                    // Se destruye el efecto de rastro de humo a los coleccionables 
                    if(config.scene.arrEmitter[0]){

                        for (let index = 0; index < config.scene.arrEmitter.length; index++) {
                            
                            config.scene.tweens.add({
                                targets: config.scene.arrEmitter[index],
                                duration:160,
                                ease: 'power2',
                                y: -600
                            })
                            
                        }

                        setTimeout(() =>{
                            for (let index = 0; index < config.scene.arrEmitter.length; index++) {
                            
                                config.scene.arrEmitter[index].destroy()
                                
                            }
                        }, 200)

                       
                        
                    }

                    // Se destruye el efecto de luz alrededor de los coleccionables 
                    config.scene.physics.add.overlap(this, config.scene.grupoCollectLight, (paleta, collectLight) => {collectLight.destroy()})

                //    Se instancia una bola cuando se recolecta un coleccionable 
                    var bola = new Bola2({scene: config.scene, x: this.x + 50, y: this.y - 25, name: "bola"})
                    if((collect.x - paleta.x) < 60) {
                        bola.setVelocityX(Math.floor(Math.random() * -400))
                    }

                    // Se tintea el efecto relámpago 
                    switch (collect.frame.name) {

                        case 0: bolaAlfa.setTintFill("0x0000ff")
                                bola.clearTint()
                        break;

                        case 1: bolaAlfa.setTintFill("0x00ff00")
                                bola.setTintFill("0x00ff00")
                        break;

                        case 2:  bolaAlfa.setTintFill("0xFF00E0")
                        bola.setTintFill("0xFF00E0")
                        break;

                        case 3:  bolaAlfa.setTintFill("0xff0000")
                        bola.setTintFill("0xff0000")
                        break;

                        case 4:  bolaAlfa.setTintFill("0xFFAA00")
                        bola.setTintFill("0xFFAA00")
                        break;

                        case 5:  bolaAlfa.setTintFill("0x00ffff")
                        bola.setTintFill("0x00ffff")
                        break;

                        case 6:  bolaAlfa.setTintFill("0xFFC900")
                        bola.setTintFill("0xFFC900")
                        break;

                        case 7:  bolaAlfa.setTintFill("0x239B56")
                        bola.setTintFill("0x239B56")
                        break;

                        default:
                            break
                            
                    }
                   

                    // Configuración del efecto relámpago 
                    bolaAlfa.x = this.x + 60
                    bolaAlfa.y = this.y
                    bolaAlfa.alpha = .6

                    var intervalo = setInterval(() => {
                        
                        incrementoTamañoBola += .65
                        bolaAlfa.setScale(incrementoTamañoBola)
        
                        if(incrementoTamañoBola >= 4){
        
                            bolaAlfa.alpha = .5
                        }

                        if(incrementoTamañoBola >= 9){
        
                            bolaAlfa.alpha = .4
                        }

                        if(incrementoTamañoBola >= 13){
        
                            bolaAlfa.alpha = .3
                        }

                        if(incrementoTamañoBola >= 16){
        
                            bolaAlfa.alpha = .2
                        }
        
                        if(incrementoTamañoBola >= 20){
                            bolaAlfa.alpha = 0
                            incrementoTamañoBola = 0
                            bolaAlfa.setScale(incrementoTamañoBola)
                            clearInterval(intervalo)
            
                        }
                    
        
                    }, 1)

                

                })

                // Se deja de ejecutar el update 
                this.cortaUpdate = false
            }

            // Se hace rotar a los coleccionables 
            Phaser.Actions.Rotate(config.scene.grupocollect.getChildren(), .4)

            // Movimiento de la paleta 
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

            // Se destruye la bola y su efecto de partículas cuando se sale del escenario 
            if(config.scene.bola.y > 583){
            
                config.scene.bola.efectoParticulasBolas.destroy()
                config.scene.bola.destroy()
            }

            // Se destruyen los coleccionables cuando se salen del escenario 
            if( config.scene.grupoCollectLight){

                config.scene.grupoCollectLight.children.iterate(function (child) {


                    if(child && child.y > 600){

                        child.destroy()
                    }
        
                })
            }

             // Se destruye el efecto de luz alrededor de los coleccionables cuando se salen del escenario 
            if(config.scene.grupocollect){

                for (let index = 0; index < config.scene.grupocollect.getChildren().length; index++) {
                    if(config.scene.grupocollect.getChildren()[index].y >3000){

                        config.scene.grupocollect.getChildren()[index].destroy()
                    }
                    
                    
                }

            
            }

            
        }
    } 
}