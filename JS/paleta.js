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

        config.scene.cursors = config.scene.input.keyboard.createCursorKeys()
        config.scene.spaceKey = config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        var bolaAlfa = config.scene.add.image(this.x, this.y, "bola").setScale(.2)
        bolaAlfa.alpha = 0

        config.scene.update = () => {

            if(config.scene.grupocollect && this.cortaUpdate){

                var incrementoTamañoBola = 0

                config.scene.physics.add.overlap(this, config.scene.grupocollect, (paleta, collect) => {
                    
                    collect.destroy()
                    var bola = new Bola2({scene: config.scene, x: this.x + 50, y: this.y - 30, name: "bola"})
                    if((collect.x - paleta.x) < 60) {
                        bola.setVelocityX(Math.floor(Math.random() * -200))
                    }
                   console.log(collect.frame.name)

                    switch (collect.frame.name) {
                        case 0: bolaAlfa.setTintFill("0x0000ff")
                                bola.setTintFill("0x0000ff")
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
                   

                    
                    bolaAlfa.x = this.x + 60
                    bolaAlfa.y = this.y
                    bolaAlfa.alpha = .4

                    var intervalo1 = setInterval(() => {
                        incrementoTamañoBola += .2
                        bolaAlfa.setScale(incrementoTamañoBola)
        
                        if(incrementoTamañoBola >= 5){
        
                            bolaAlfa.alpha = .3
                        }

                        if(incrementoTamañoBola >= 10){
        
                            bolaAlfa.alpha = .2
                        }

                        if(incrementoTamañoBola >= 14){
        
                            bolaAlfa.alpha = .1
                        }
        
                        if(incrementoTamañoBola >= 16){
                            bolaAlfa.alpha = 0
                            incrementoTamañoBola = 0
                            bolaAlfa.setScale(incrementoTamañoBola)
                            clearInterval(intervalo1)
            
                        }
        
                    }, 1)



                })
                this.cortaUpdate = false
            }

            Phaser.Actions.Rotate(config.scene.grupocollect.getChildren(), .2)


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