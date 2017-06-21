
let game = new Phaser.Game(720, 1280, Phaser.AUTO, 'area', {
    preload: preload,
    create: create,
    update: update
});
let client = new Eureca.Client({ uri: 'http://localhost:3000/game' });
let rpc;

client.ready(function(remote) {
	rpc = remote;
}); 

let tuin;
let payed = false;
let coinText;
let coins = 0;
let gameEnded = false;
let score = 0;
let s = []; // s voor tweens
let MAX_AANTAL_PLANTEN = 10;
let doorleft;
let doorright;

function preload() {
    //game.load.image('onkruid', 'images/onkruid.png');
    //game.load.image('aarde', 'aarde.png');
    game.load.image('coin', 'images/coin.png');
	game.load.image('braam', 'images/blad.png');
    game.load.image('door-right', 'images/door-right.png');
    game.load.image('door-left', 'images/door-left.png');
	game.load.image('background', 'images/straat.png');


    //game.add.image('coin', 64, 64);
}

function create() {

	let background = game.add.sprite(0, 0, 'background');
    tuin = game.add.group();
    doorleft = game.add.sprite(-360, 0, 'door-left');
    doorright = game.add.sprite(480, 0, 'door-right');
    let onkruid;
    for (let i = 0; i < MAX_AANTAL_PLANTEN; i++) {
        let randX = game.rnd.integerInRange(64, game.world.bounds.width - 64);
        let randY = game.rnd.integerInRange(64, game.world.bounds.height - 64);
        onkruid = tuin.create(randX, randY, 'braam', i);
        onkruid.inputEnabled = true;
        onkruid.input.start(0, true);
        //TODO veranderen, geen idee hoe je points moet indienen
        onkruid.anchor.x = 0.5;
        onkruid.anchor.y = 0.5;
        onkruid.events.onInputDown.add(plantDown);
        onkruid.tween = game.add.tween(onkruid.scale);
        onkruid.tween.to({
            x: .1,
            y: .1
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .6,
            y: .6
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .1,
            y: .1
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .3,
            y: .3
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .1,
            y: .1
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .1,
            y: .1
        }, 100, Phaser.Easing.Linear.None);
    }

    // TEXT
    text = game.add.text(game.world.centerX, game.world.centerY + 200, "0", {
        font: "70px Arial",
        fill: "#8b8b8b",
        align: "center",
        stroke: "#8b8b8b",
        strokeThickness: "8"
    });
    text.anchor.setTo(0.5, 0.5);
	text.alpha = 0;

}

function tweenDoors(left_door, right_door) {
    left_door.tween = game.add.tween(left_door.position);
    left_door.tween.to({
        x: 0,
        y: 0
    }, 1000, Phaser.Easing.Linear.None);

    right_door.tween = game.add.tween(right_door.position);
    right_door.tween.to({
        x: 0,
        y: 0
    }, 1000, Phaser.Easing.Linear.None);

    right_door.tween.onComplete.add(function() {
        countCoinsTween();
    });
    right_door.tween.start();
    left_door.tween.start();

}

function countCoinsTween() {
    if (!gameEnded) {
        gameEnded = true;
    }
}

function scaleTween(item) {
    item.tween.onComplete.add(function() {
        item.destroy();
        score++;
    }, this);
    item.tween.start();
}

function update() {
    if (score == MAX_AANTAL_PLANTEN) {
        tweenDoors(doorleft, doorright);
        score++;
    }
    if (gameEnded) {
		text.alpha = 1;
        if (coins < 10000)
            coins+=100;
        text.setText(coins);
		if(coins == 10000) {
		payUser();
		}
	}

 }
function payUser() {
	if(!payed) {
        rpc.sendCoins(localStorage.getItem('wallet'), 10000); //adres zou hier ingevuld moeten worden mbv localstorage
        window.location.replace('136.144.155.184/home?account=' + localStorage.getItem('wallet'));
				payed = true;
    }
}

function plantDown(item, pointer) {
    scaleTween(item);
}


function endGameTween() {
    //let c = new Phaser.Color.getColor(255, 255, 255);
    game.stage.backgroundColor = "#FFFFFF";
}
