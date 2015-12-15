var stateLoad = {
    preload: function () {
        var preloadSprite = game.add.sprite(35, game.world.centerY, "loading"); //创建显示loading进度的sprite
        game.load.setPreloadSprite(preloadSprite);

        // 以下为要加载的资源
        game.load.image("background", "img/bg_day.png"); //背景
        game.load.image("ground", "img/ground.png"); //地面
        game.load.image("title", "img/title.png"); //游戏标题
        game.load.spritesheet("bird", "img/bird_oriange.png", 34, 24, 3); //鸟
        game.load.image("play_btn", "img/button_play.png"); //开始按钮

        game.load.bitmapFont("flappy_font", "font/font.png", "font/font.fnt");
        game.load.image("pipe_up", "img/pipe_up.png"); //上管道
        game.load.image("pipe_down", "img/pipe_down.png"); //下管道

        game.load.audio("wing", "sound/sfx_wing.mp3");//飞翔的音效
        game.load.audio("point", "sound/sfx_point.mp3");//得分的音效
        game.load.audio("hit", "sound/sfx_hit.mp3"); //撞击管道的音效
        game.load.audio("die", "sound/sfx_die.mp3"); //撞击地面的音效
        game.load.audio("swooshing", "sound/sfx_swooshing.mp3"); // 按钮出现的音效

        game.load.image("tutorial", "img/tutorial.png"); //指引
        game.load.image("ready_text", "img/text_ready.png");
        game.load.image("play_tip", "img/tutorial.png");
        game.load.image("game_over", "img/text_game_over.png");
        game.load.image("score_board", "img/score_panel.png");
    },

    create: function () {
        game.state.start("menu"); //跳转到资源加载页面
    }
};