var statePlay = {
    create: function() {
        var bg = game.add.tileSprite(0, 0, game.width, game.height, "background"); // 背景

        // 管道组
        var pipes = game.add.group();
        pipes.enableBody = true;
        //pipes.physicsBodyType = Phaser.Physics.ARCADE;
        //pipes.body.velocity.x = -setting.speed; // TODO 不能整组移动？
        this.pipes = pipes;

        // 地面
        var ground = game.add.tileSprite(0, game.height - 112, game.width, 112, "ground"); // 地板
        game.physics.enable(ground, Phaser.Physics.ARCADE); // 物理引擎
        ground.body.immovable = true;
        ground.autoScroll(-setting.speed, 0);
        this.ground = ground;

        // Get Ready
        var readyText = game.add.sprite(game.world.centerX, 100, "ready_text");
        readyText.anchor.setTo(.5, .5);

        // 小鸟
        var birdTop = 200,
            bird = game.add.sprite(game.world.centerX - 80, 200, "bird");
        bird.animations.add("fly");
        bird.animations.play("fly", 8, true);
        bird.anchor.setTo(.5, .5);
        game.add.tween(bird).to({y: birdTop + 10}, 350, null, true, 0, Number.MAX_VALUE, true);
        game.physics.enable(bird, Phaser.Physics.ARCADE); // 物理引擎
        bird.body.gravity.y = 0;
        this.bird = bird;

        // 指引
        var tutorial = game.add.sprite(game.world.centerX, 230, "tutorial");
        tutorial.anchor.setTo(.5,.5);

        // 分数
        var score = 0,
            scoreText = game.add.bitmapText(game.world.centerX, 40, 'flappy_font', '0', 36);
        scoreText.anchor.setTo(.5,.5);
        this.score = score;
        this.scoreText = scoreText;

        // 生效
        this.soundFly = game.add.sound('fly_sound');
        this.soundScore = game.add.sound('score_sound');
        this.soundHitPipe = game.add.sound('hit_pipe_sound');
        this.soundHitGround = game.add.sound('hit_ground_sound');
        this.soundSwooshing = game.add.sound('swooshing');

        // 游戏是否开始
        this.isStarted = false;

        // 点击开始
        game.input.onDown.addOnce(function(){
            readyText.destroy();
            tutorial.destroy();
            this.isStarted = true;
            game.time.events.loop(setting.speed * 15, this.createPipes, this);
        }, this);
    },
    /**
     * 生成管道
     */
    createPipes: function(gap){
        gap = gap || 100;
        var min = 50;
        var pos = Math.floor(Math.random() * (game.height - 112 - min * 2 - gap)) + min, // 随机出缺口的pos, 112是地面的高度
            topPos = pos - 320, // 320为管道的长度
            bottomPos = pos + gap;

        if(this.resetPipe(topPos, bottomPos)){
            this.scoreText.text = ++this.score;
            return;
        }

        var topPipe = game.add.sprite(game.width, topPos, "pipe_down"); // 320为pipe图片的高度
        var bottomPipe = game.add.sprite(game.width, bottomPos, "pipe_up");
        this.pipes.add(topPipe);
        this.pipes.add(bottomPipe);
        //topPipe.checkWorldBounds = true; // 检测边界
        //topPipe.outOfBoundsKill = true; // 当超出边界时回收
        //topPipe.body.velocity.x = -setting.speed;
        //bottomPipe.checkWorldBounds = true;
        //bottomPipe.outOfBoundsKill = true;
        //bottomPipe.body.velocity.x = -setting.speed;
        this.pipes.setAll('checkWorldBounds', true);
        this.pipes.setAll('outOfBoundsKill', true);
        this.pipes.setAll('body.velocity.x', -setting.speed);
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
            ++i;
        }, this);
        return i == 2;
    }
};