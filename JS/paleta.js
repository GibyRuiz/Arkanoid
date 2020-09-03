// export default 

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