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


        config.scene.update = () => {

            if(config.scene.grupocollect && this.cortaUpdate){
                config.scene.physics.add.overlap(this, config.scene.grupocollect, (paleta, collect) => {

                    collect.destroy()
                    new Bola2({scene: config.scene, x: this.x, y: this.y, name: "bola"})
                })
                this.cortaUpdate = false
            }

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