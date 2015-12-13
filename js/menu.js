var stateMenu = {
    create: function() {
        game.add.tileSprite(0, 0, game.width, game.height, "background"); // 背景
        game.add.tileSprite(0, game.height - 112, game.width, 112, "ground").autoScroll(-setting.speed * 10, 0); // 地板

        // 标题
        var title = game.add.sprite(game.width / 2, 50, "title");
        title.anchor.setTo(.5, .5);

        // 小鸟
        var bird = game.add.sprite(game.width / 2, 130, "bird");
        bird.animations.add("fly");
        bird.animations.play("fly", 8, true);
        bird.anchor.setTo(.5, .5);
        game.add.tween(bird).to({y: 140}, 350, null, true, 0, Number.MAX_VALUE, true);
    }
};