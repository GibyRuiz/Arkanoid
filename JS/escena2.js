class Escena2 extends Phaser.Scene {

    constructor()
    {
        super({key:"Escena2"})
    }

    preload(){

        this.load.tilemapTiledJSON('tileArka', 'JSON/Arkanoid.json')
        this.load.image('arka', 'Arkanoid.png')
        this.load.image('paleta', 'paleta.png')
        this.load.image('bola', 'bola.png')

    }

    create(){
        
        var scene = this.scene

        this.map = this.make.tilemap({ key: 'tileArka' })
        this.tileset = this.map.addTilesetImage('Arkanoid', "arka")
        
        this.layer = this.map.createDynamicLayer('Capa2', this.tileset, 13, 5)

        this.paleta = this.physics.add.sprite(360, 550, "paleta").setScale(.5).setCollideWorldBounds(true).setOrigin(0,0)
        this.bola = this.physics.add.sprite(400, 530, "bola").setScale(.3).setCollideWorldBounds(true)
        this.bola.setBounce(1.1)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.bola.setVelocity(100,-300)

        this.text = this.add.text(20, 580, 'Presiona "espacio" para cambiar de capa')

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.spaceKey.on('up', function () {
            
            
                scene.start("SceneGame")
        
        })

        this.physics.add.overlap(this.paleta, this.bola, () => {

            

                if((this.bola.x - this.paleta.x) > 87){

                    this.bola.setVelocity(100,-300)

                }

                else if((this.bola.x - this.paleta.x) < 27){

                    this.bola.setVelocity(-100,-300)

                }

                else if((this.bola.x - this.paleta.x) > 27 && (this.bola.x - this.paleta.x) < 50){

                    this.bola.setVelocity(-60,-300)

                }

                else if((this.bola.x - this.paleta.x) > 70 && (this.bola.x - this.paleta.x) < 87){

                    this.bola.setVelocity(60,-300)

                }

                else if((this.bola.x - this.paleta.x) < 70 && (this.bola.x - this.paleta.x) > 60){

                    this.bola.setVelocity(40,-300)

                }

                else if((this.bola.x - this.paleta.x) < 60 && (this.bola.x - this.paleta.x) > 50){

                    this.bola.setVelocity(-40,-300)

                }
           
                
            
        })

        this.map.setCollision([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]);
        this.physics.add.collider(this.bola, this.layer, (bola, tile) => {

            this.map.removeTile(tile)
        });



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