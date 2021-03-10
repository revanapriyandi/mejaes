//var game = new Phaser.Game(gameSet);
var game = new Phaser.Game(gameSet.width, gameSet.height, Phaser.CANVAS, "", { preload: preload, create: create, update: update });
var gamesNext = false

function preload() {
    game.load.image('yellow', 'assets/ball.png');
    game.load.image('red', 'assets/red.png');
    game.load.image('blue', 'assets/blue.png');
};

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.disableVisibilityChange = true;
    game.input.mouse.capture = true;
    game.stage.backgroundColor = '#5c7d77';
    //Generate 3 bola
    blueBall = new ball(0, 0, 'blue', true, 0)
    yellowBall = new ball(0, 0, 'yellow', false)
    redBall = new ball(0, 0, 'red', true, 960)

    blueBall.body.moves = false
        //Pantualn
    yellowBall.body.bounce.setTo(1);
    //Tabrakan
    blueBall.body.immovable = true;
    redBall.body.immovable = true;
    iniGame()
};

function iniGame() {
    blueBall.x = 190
    blueBall.y = gameSet.height / 2
    blueBall.anchor.setTo(0, 0.5);
    yellowBall.x = 445
    yellowBall.y = gameSet.height / 2
    yellowBall.anchor.setTo(0, 0.5);
    redBall.x = 1620
    redBall.y = gameSet.height / 2
    redBall.anchor.setTo(0, 0.5);
}

function collision(e) {
    yellowBall.body.moves = true
    yellowBall.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(game.physics.arcade.angleBetween(e, yellowBall) * 180 / Math.PI, 1500));
}


function update() {
    if (yellowBall.x > 1850) {
        alert('Kamu menang !')
        gamesNext = true
    } else if (yellowBall.x == 0 || yellowBall.x < 0) {
        alert('Bot Menang !')
        gamesNext = true
    }
    if (gamesNext) {
        yellowBall.body.moves = false
        yellowBall.body.velocity.setTo(0)
        gamesNext = false
        iniGame()
    } else {
        game.physics.arcade.collide([blueBall, redBall], yellowBall, collision, null, this);
        if (yellowBall.x > 960 && yellowBall.body.velocity.x > 20) {
            //Logic bila ball kuning lewat garis tengah, bola merah mengejar
            game.physics.arcade.moveToXY(redBall, yellowBall.x - 30, yellowBall.y, 2000)
            if (redBall.x - yellowBall.x < 40) {
                //Jika berhasil kembali ke pinggir
                game.physics.arcade.moveToXY(redBall, 1920, yellowBall.y, 2000)
            }
        } else {
            //Merah kembali
            game.physics.arcade.moveToXY(redBall, 1920, yellowBall.y, 500)
        }
    }
}