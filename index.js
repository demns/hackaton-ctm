var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var house1, house2, house3, house4;
var background;
var cursors;
var platforms;
var visibleGround;
var invisibleGround;
var currentHouse;
var fuel = 1000000;
var distance = 0;
var maxDistance = 0;
var groundPerTimeMovement = 4;
var fuelText, distanceText, maxDistance;

function preload() {
    this.load.image('sky', 'assets/starry-night.jpg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('house1', 'assets/house1.png');
    this.load.image('house2', 'assets/house2.png');
    this.load.image('house3', 'assets/house3.png');
    this.load.image('house4', 'assets/house4.png');

    this.load.image('star', 'assets/star.png');
    this.load.image('santa', 'assets/santa.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    background = this.add.tileSprite(0, 0, 1600, 1200, 'sky');
    cursors = this.input.keyboard.createCursorKeys();


    platforms = this.physics.add.staticGroup();
    invisibleGround = platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    visibleGround = this.add.tileSprite(400, 568, 800, 64, 'ground');

    house1 = this.add.tileSprite(-300, 420, 173, 232, 'house1');
    house2 = this.add.tileSprite(-300, 426, 211, 220, 'house2');
    house3 = this.add.tileSprite(-300, 445, 209, 182, 'house3');
    house4 = this.add.tileSprite(-300, 452, 213, 168, 'house4');

    player = this.physics.add.sprite(100, 100, 'santa');

    player.setBounce(0.2);
    player.body.setGravityY(300);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);

    fuelText = this.add.text(16, 16, 'Deers: ' + fuel, { fontSize: '32px', fill: '#35a930' });
    distanceText = this.add.text(400, 16, 'Distance: 0', { fontSize: '32px', fill: '#35a930' });
    maxDistanceText = this.add.text(400, 550, 'Maximum: 0', { fontSize: '32px', fill: '#35a930' });
}

function update() {
    background.tilePositionX += 2;
    visibleGround.tilePositionX += groundPerTimeMovement;
    distance++;
    distanceText.setText('Distance: ' + distance);
    if (currentHouse) {
        if (Math.abs(currentHouse.y - player.y) < 50 && Math.abs(currentHouse.x - player.x) < 50) {
            currentHouse.x = -100;
            currentHouse = null;
            fuel += 10000;
        } else {
            currentHouse.x -= groundPerTimeMovement;
        }
        if (currentHouse && currentHouse.x < -70) {
            currentHouse.x = -100;
            currentHouse = null;
        }
    }
    if (distance % 150 === 0 && !currentHouse) {
        currentHouse = getRandomHouse();
        currentHouse.x = 900;
    }

    if (cursors.up.isDown && fuel > 0) {
        player.setVelocityY(-100);
        fuel -= 100;
        fuelText.setText('Deers: ' + fuel);
    }

    if (player.body.touching.down) {
        // gameOver();
    }
}

function gameOver() {
    alert('game over');
    fuel = 10000;
    if (distance > maxDistance) {
        maxDistance = distance;
        maxDistanceText.setText('Maximum: ' + maxDistance);
    }
    distance = 0;
    player.y = 100;
}

function getRandomHouse() {
    var a = Math.random();
    if (a > 0.25) return house1;
    if (a > 0.50) return house2;
    if (a > 0.75) return house3;
    return house4;
}