class Start extends Phaser.Scene{
    constructor(){
        super('start');
    }

    preload(){
        this.load.font('Amatic SC', 'assets/AmaticSC-Regular.ttf');
    }

    create(){
        this.add.text(360, 300, "CLICK TO BEGIN...",{
            fontFamily: 'Amatic SC',
            fontSize: '24px',
            color: '#ffffff',
        });

        this.input.on('pointerdown', () => this.scene.start('introscene'));

    }
}

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
            duration: 3000,
        });

        let tTween = this.tweens.add({
            targets: this.textStudio,
            alpha: 1,
            duration: 2500,
            delay: 3000,
            onComplete: () => {
                let ptween = this.tweens.add({
                targets: this.petals,
                alpha: 1,
                duration: 2500,
                delay: this.tweens.stagger(800), // Stagger the delay for each petal
                onComplete: () => {
                    this.scene.start('textscene');

                }
                });
            }
        });
    }

    update() {
    }
} 

class TextScene extends Phaser.Scene {
    constructor(){
        super('textscene');
    }

    preload() {
        this.load.image('topPetals', 'assets/redpetalsfallingtop.PNG');
        this.load.image('leftPetals', 'assets/redpetalsfallingleft.PNG');
        this.load.image('rightPetals', 'assets/redpetalsfallingright.PNG');

    }

    create() {
        this.imageTopPetals = this.add.image(350, 150, 'topPetals');
        this.imageTopPetals.setScale(0.3);
        this.imageTopPetals.setAlpha(0);

        this.imageLeftPetals = this.add.image(150, 340, 'leftPetals');
        this.imageLeftPetals.setScale(0.3);
        this.imageLeftPetals.setAlpha(0);

        this.imageRightPetals = this.add.image(460, 420, 'rightPetals');
        this.imageRightPetals.setScale(0.4);
        this.imageRightPetals.setAlpha(0);
        this.imageRightPetals.angle = -10;

        this.textObject = this.add.text(590, 100,
`DEEP WITHIN THE GARDEN,
THERE IS A STARVING WIDOW...`, {
            fontFamily: 'Amatic SC',
            fontSize: '24px',
            color: '#ffffff',
            }
        );
        this.textObject.setAlpha(0);
        

        this.textObject2 = this.add.text(40, 500, "SHE MUST FIND SUSTENANCE TO SURVIVE...", {
            fontFamily: 'Amatic SC',
            fontSize: '24px',
            color: '#ffffff',
        });
        this.textObject2.setAlpha(0);

        this.textObject3 = this.add.text(480, 325, "SHE MUST FIND A MATE TO HELP HER... HUNGER", {
            fontFamily: 'Amatic SC',
            fontSize: '24px',
            color: '#ffffff',
        })
        this.textObject3.setAlpha(0);

        let topTween = this.tweens.add({
            targets: [this.imageTopPetals, this.textObject],
            alpha: 1,
            duration: 4000,
        });

        let leftTween = this.tweens.add({
            targets: [this.imageLeftPetals, this.textObject2],
            alpha: 1,
            duration: 3000,
            delay: 4000,
        });

        let rightTween = this.tweens.add({
            targets: [this.imageRightPetals, this.textObject3],
            alpha: 1,
            duration: 4000,
            delay: 7000,
        });
        //red fade out
        this.time.delayedCall(8000, () => {
            this.cameras.main.fadeOut(2000, 255, 0, 0) 
        });

        this.time.delayedCall(10000, () => {
            this.scene.start('start');
        });

    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Start, IntroScene, TextScene]
};
const game = new Phaser.Game(config);  