var BIRDX = 80;
var statePlay = {
    create: function() {
        game.add.sprite(0, 0, "background"); // 背景

        // 管道组
        var pipes = game.add.group();
        pipes.enableBody = true; // If true all Sprites created by, or added to this group, will have a physics body enabled on them.
        this.pipes = pipes;

        // 地面
        var ground = game.add.tileSprite(0, game.height - 112, game.width, 112, "ground"); // 地板
        game.physics.enable(ground); // 拥有物理引擎
        ground.body.immovable = true; // 当碰撞发生时，地面固定不动
        ground.autoScroll(-setting.speed, 0); // x, y
        this.ground = ground;

        // Get Ready
        var readyText = game.add.sprite(game.world.centerX, 100, "ready_text");
        readyText.anchor.setTo(.5, .5);

        // 小鸟
        var bird = game.add.sprite(BIRDX, 200, "bird");
        bird.animations.add("fly");
        bird.animations.play("fly", 8, true);
        bird.anchor.setTo(.5, .5);
        game.physics.enable(bird, Phaser.Physics.ARCADE);
        bird.body.gravity.y = 0;
        this.bird = bird;

        // 指引
        var tutorial = game.add.sprite(game.world.centerX, 230, "tutorial");
        tutorial.anchor.setTo(.5,.5);

        // 分数
        var score = 0,
            scoreText = game.add.bitmapText(game.world.centerX, 40, "flappy_font", "0", 36);
        scoreText.anchor.setTo(.5,.5);
        this.score = score;
        this.scoreText = scoreText;

        // 声效
        this.sound.fly = game.add.sound("wing");
        this.sound.point = game.add.sound("point");
        this.sound.hit = game.add.sound("hit");
        this.sound.die = game.add.sound("die");
        this.sound.swooshing = game.add.sound("swooshing");

        // 游戏是否开始
        this.isPlaying = false;

        // 点击开始
        game.input.onDown.addOnce(function(){
            readyText.destroy(); // 与kill()的区别：kill的话元素还在
            tutorial.destroy();
            this.sound.swooshing.play();
            this.start();
        }, this);
    },
    update: function() {
        game.physics.arcade.collide(this.bird, this.ground, this.hitGround, null, this); //与地面碰撞

        if(!this.isPlaying) return;
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this); //与管道碰撞

        if(this.bird.angle < 90) this.bird.angle += 1.5; //下降时头朝下
        // 检查分数
        this.pipes.forEachAlive(function(pipe){
            if(pipe.y > 0 || pipe.scored) return; // 只检查没被检查过的上管道即可
            if(pipe.x < BIRDX - 26){ // 26是管道的宽度的一半
                this.sound.point.play();
                pipe.scored = true;
                this.scoreText.text = ++this.score;
            }
        }, this);
    },
    /**
     * 游戏开始
     */
    start: function() {
        this.isPlaying = true;
        game.time.events.loop(parseInt(180000 / setting.speed), this.createPipes, this); // 启动一个计时器，负责生成管道
        game.time.events.start();
        this.bird.body.gravity.y = 1000;
        game.input.onDown.add(this.fly, this);
    },
    /**
     * 游戏结束
     */
    stop: function() {
        if(!this.isPlaying) return;

        this.isPlaying = false;
        this.ground.stopScroll();
        this.pipes.forEachExists(function(pipe){
            pipe.body.velocity.x = 0;
        }, this);
        this.bird.animations.stop("fly", 0);
        game.input.onDown.remove(this.fly, this);
        game.time.events.stop(true);

        this.scoreText.destroy();

        // 显示GameOver
        var bestScore = parseInt(localStorage.getItem("FlappyBirdBest")) || 0;
        if(this.score > bestScore) bestScore = this.score;
        localStorage.setItem("FlappyBirdBest", bestScore);

        var gameOverText = game.add.sprite(game.width / 2, 100, "game_over"); //game over 文字图片
        gameOverText.anchor.setTo(0.5, 0.5);

        var scorePanelGroup = game.add.group(); //添加一个组
        var scoreboard = scorePanelGroup.create(game.width / 2, 0, "score_board"); //分数板
        scoreboard.anchor.setTo(0.5, 0);
        game.add.bitmapText(scoreboard.x + 90, 37, "flappy_font", "" + this.score, 24, scorePanelGroup).anchor.setTo(1, 0); //当前分数
        game.add.bitmapText(scoreboard.x + 90, 80, "flappy_font", "" + bestScore, 24, scorePanelGroup).anchor.setTo(1, 0); //最好分数
        if(+this.score >= 10){
            game.add.sprite(scoreboard.x - 86, 45, "medals", (+this.score >= 40 ? 4 : parseInt(+this.score / 10)) - 1, scorePanelGroup);
        }
        scorePanelGroup.y = 150;

        var replayBtn = game.add.button(game.width / 2, game.height - 112, "play_btn", function () {//重玩按钮
            this.sound.swooshing.play();
            game.state.start("play");
        }, this);
        replayBtn.anchor.setTo(0.5, 1);
    },
    /**
     * 小鸟飞翔
     */
    fly: function() {
        this.sound.fly.play();
        this.bird.body.velocity.y = -300;
        game.add.tween(this.bird).to({angle:-30}, 50, null, true, 0, 0, false); //上升时头朝上
    },
    /**
     * 生成管道
     */
    createPipes: function(){
        var gap = 100, // 缺口高度为100
            min = 50, // 预留50高度
            pos = Math.floor(Math.random() * (game.height - 112 - min * 2 - gap)) + min, // 随机出缺口的pos, 112是地面的高度
            topPos = pos - 320, // 320为管道的长度
            bottomPos = pos + gap;

        if(this.resetPipe(topPos, bottomPos)) return;

        var topPipe = game.add.sprite(game.width, topPos, "pipe_down");
        var bottomPipe = game.add.sprite(game.width, bottomPos, "pipe_up");
        this.pipes.add(topPipe);
        this.pipes.add(bottomPipe);
        this.pipes.setAll("checkWorldBounds", true);
        this.pipes.setAll("outOfBoundsKill", true);
        this.pipes.setAll("body.velocity.x", -setting.speed);
    },
    /**
     * 管道回收
     */
    resetPipe: function(top, bottom){
        var i = 0;
        this.pipes.forEachDead(function(pipe){
            if(pipe.y <= 0){
                pipe.reset(game.width, top);
            }else{
                pipe.reset(game.width, bottom);
            }
            pipe.body.velocity.x = -setting.speed;
            pipe.scored = false;
            ++i;
        }, this);
        return i == 2;
    },
    /**
     * 撞到管子/地板
     */
    hit: function() {
        this.sound.hit.play();
        this.stop();
    },
    hitGround: function(){
        if(!this.isPlaying) return;
        this.hit();
    },
    hitPipe: function(){
        if(!this.isPlaying) return;

        this.hit();
        this.sound.die.play();
    }
};