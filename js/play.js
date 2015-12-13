var statePlay = {
    create: function() {
        var bg = game.add.tileSprite(0, 0, game.width, game.height, "background"); // 背景

        var ground = game.add.tileSprite(0, game.height - 112, game.width, 112, "ground"); // 地板
        game.physics.enable(ground, Phaser.Physics.ARCADE); // 物理引擎
        ground.body.immovable = true;
        ground.autoScroll(-setting.speed * 10, 0);

        var readyText = game.add.sprite(game.world.centerX, 100, "ready_text");
        readyText.anchor.setTo(.5, .5);

        var birdTop = 200,
            bird = game.add.sprite(game.world.centerX - 60, 200, "bird");
        bird.animations.add("fly");
        bird.animations.play("fly", 8, true);
        bird.anchor.setTo(.5, .5);
        game.add.tween(bird).to({y: birdTop + 10}, 350, null, true, 0, Number.MAX_VALUE, true);
        game.physics.enable(bird, Phaser.Physics.ARCADE); // 物理引擎
        bird.body.gravity.y = 0;

        var tutorial = game.add.sprite(game.world.centerX, 230, "tutorial");
        tutorial.anchor.setTo(.5,.5);

        var scoreText = game.add.bitmapText(game.world.centerX, 40, 'flappy_font', '0', 36);
        scoreText.anchor.setTo(.5,.5);

        this.soundFly = game.add.sound('fly_sound');
        this.soundScore = game.add.sound('score_sound');
        this.soundHitPipe = game.add.sound('hit_pipe_sound');
        this.soundHitGround = game.add.sound('hit_ground_sound');
        this.soundSwooshing = game.add.sound('swooshing');


        game.input.onDown.addOnce(function(){
            readyText.destroy();
            tutorial.destroy();
        }, this);
    }
};