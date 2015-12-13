var game = new Phaser.Game(288, 512, Phaser.AUTO, "flappybird");
var setting = {
    speed: 100
};

// 加载每个state
game.state.add("boot", stateBoot);
game.state.add("load", stateLoad);
game.state.add("menu", stateMenu);
game.state.add("play", statePlay);
game.state.add("gameover", stateGameOver);

game.state.start("boot");