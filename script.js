class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }
    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
    }
    create() {
        const r1 = this.add.circle(200, 200, 80, 0x6666ff);
    }   
    update() {
    }
} 
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MyScene
};
const game = new Phaser.Game(config);  