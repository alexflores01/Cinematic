class Start extends Phaser.Scene{
    constructor(){
        super('start');
    }

    preload(){
        this.load.font('Amatic SC', 'assets/AmaticSC-Regular.ttf');
        this.load.audio('wind', 'audio/dragon-studio-winter-wind-402331.mp3');
        this.load.audio('dramatic', 'audio/universfield-dramatic-scene-separation-melancholy-15s-159310.mp3');
    }

    create(){
        this.add.text(340, 300, "CLICK TO BEGIN...",{
            fontFamily: 'Amatic SC',
            fontSize: '24px',
            color: '#ffffff',
        });

        this.windSound = this.sound.add('wind');

        this.input.on('pointerdown', () => {
            this.windSound.play({loop: true});
            this.scene.start('introscene')
        });

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
                    this.tweens.add({
                        targets: this.sound.get('wind'),
                        volume: 0,
                        duration: 2700,
                        onComplete: () => {
                            this.sound.stopByKey('wind');
                            this.scene.start('textscene');
                        }
                    });
                }
                });
            }
        });

        this.input.on('pointerdown', () => {
            this.scene.start('textscene');
        })
    }

    update() {
    }
} 

class TextScene extends Phaser.Scene {
    constructor(){
        super('textscene');
    }

    preload() {
        this.load.image('topPetals', 'assets/RedPetalsFallingTop.PNG');
        this.load.image('leftPetals', 'assets/RedPetalsFallingLeft.PNG');
        this.load.image('rightPetals', 'assets/RedPetalsFallingRight.PNG');

    }

    create() {
        this.dramaticSound = this.sound.add('dramatic');
        this.dramaticSound.play({loop: true});

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
        this.time.delayedCall(11000, () => {
            this.cameras.main.fadeOut(2000, 255, 0, 0)
        });
        
        this.time.delayedCall(13000, () => {
            this.scene.start('menu');
        });

        this.input.on('pointerdown', () => {
            this.scene.start('menu');
        })

    }
}

class Menu extends Phaser.Scene {
    constructor () {
        super('menu');
    }

    preload(){
        this.load.image('spiderWeb', 'assets/RealisticSpiderWeb.png');
        this.load.image('blackWidow', 'assets/BlackWidowSpider.png');
    }

    create(){
        
        this.cameras.main.setBackgroundColor('#012046')

        this.imageWeb = this.add.image(400, 300, 'spiderWeb');
        this.imageWeb.setScale(0.35);
        this.imageSpider = this.add.image(520, 350, 'blackWidow');
        this.imageSpider.setScale(0.1);
        this.imageSpider.angle = -50;
        //set the zoom fixed at 175x
        this.cameras.main.setZoom(175);
        //point the camera at the red sybmols x, y
        this.cameras.main.centerOn(560, 380);
        //zoom out from 175x to 1x in 4 secs, ease
        this.time.delayedCall(2000, () => {
            this.cameras.main.zoomTo(1, 4000, 'Power2');
        });
        //move/pan back camera to center
        this.time.delayedCall(5000, () => {
            this.cameras.main.pan(400, 300, 1000, 'Power2');
        })

        this.textTitle = this.add.text(180, 70, 'Lonely Widow', {
            fontFamily: 'Amatic SC',
            fontSize: '120px',
            fontStyle: 'bold',
            color: '#CD0404',
        });

        this.textTitle.setAlpha(1);

        this.textMenu = this.add.text(50, 200, 
` Start

 Load

 Settings`, {
            fontFamily: 'Amatic SC',
            fontSize: '60px',
            fontStyle: 'bold',
            color: '#CD0404',
        });
        this.textMenu.setAlpha(1);
        //this.widowSymbol = this.add.containter(35, 230)
        //x, y the center of the object, x1, y1, x2, y2, x3, y3 these corners are relative to that center point
        //let triangle1 = this.add.triangle(35, 210, 0, 0, 50, 0, 25, 40, '0xCD0404');
        //let triangle2 = this.add.triangle(35, 250, 25, 0, 0, 40, 50, 40, '0xCD0404');



    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Start, IntroScene, TextScene, Menu]
};
const game = new Phaser.Game(config);  