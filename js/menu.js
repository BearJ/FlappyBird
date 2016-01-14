var stateMenu = {
    create: function() {
        game.add.sprite(0, 0, "background"); // 背景
        game.add.tileSprite(0, game.height - 112, game.width, 112, "ground").autoScroll(-setting.speed, 0); // 地板

        // 标题
        var title = game.add.sprite(game.world.centerX, 100, "title");
        title.anchor.setTo(.5, .5);

        // 小鸟
        var birdTop = 200,
            bird = game.add.sprite(game.world.centerX, birdTop, "bird");
        bird.animations.add("fly"); // 命名动画
        bird.animations.play("fly", 8, true); // 8表示每秒8帧。true表示循环播放
        bird.anchor.setTo(.5, .5);
        game.add.tween(bird).to({y: birdTop + 10}, 350, null, true, 0, Number.MAX_VALUE, true);

        // 开始按钮
        var startBtn = game.add.button(game.world.centerX, game.height - 112, "play_btn", function(){
            game.add.sound("swooshing").play();
            game.state.start("play");
        });
        startBtn.anchor.setTo(.5, 1);
    }
};