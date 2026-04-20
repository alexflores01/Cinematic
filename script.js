class IntroScene extends Phaser.Scene {
    constructor() {
        super('introscene');
    }
    preload() {
        this.load.image('flower', 'assets/RedSpiderLily.png');
        this.load.image('singlePetal', 'assets/SinglePetalFalling.png');
        this.load.font('Amatic SC', 'assets/AmaticSC-Regular.ttf');
    }
    create() {
        this.imageFlower = this.add.image(327, 190, 'flower');
        this.imageFlower.setScale(0.5);
        this.imageFlower.setAlpha(0);

        this.textStudio = this.add.text(210, 300, "Spider Lily Studios", {
            fontFamily: 'Amatic SC',
            fontSize: '72px',
            color: '#ffffff',
        });
        this.textStudio.setAlpha(0);

        
        this.petals = [];

        const petalPositions = [
            {x: 450, y: 300},
            {x: 470, y: 350},
            {x: 430, y: 400},
        ];

        petalPositions.forEach(pos => {
            const petal = this.add.image(pos.x, pos.y, 'singlePetal');
            petal.setScale(0.1);
            petal.setAlpha(0);
            this.petals.push(petal);
        });

        let ftween = this.tweens.add({
            targets: this.imageFlower,
            alpha: 1,
            duration: 4000,
        });

        let tTween = this.tweens.add({
            targets: this.textStudio,
            alpha: 1,
            duration: 2500,
            delay: 4000,
            onComplete: () => {
                let ptween = this.tweens.add({
                targets: this.petals,
                alpha: 1,
                duration: 2500,
                delay: this.tweens.stagger(800), // Stagger the delay for each petal
                });
            }
        });

    }   
    update() {
    }
} 
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [IntroScene]
};
const game = new Phaser.Game(config);  