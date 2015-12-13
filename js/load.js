var stateLoad = {
    preload: function () {
        var preloadSprite = game.add.sprite(35, game.height / 2, "loading"); //创建显示loading进度的sprite
        game.load.setPreloadSprite(preloadSprite);

        // 以下为要加载的资源
        game.load.image("background", "img/bg_day.png"); //背景
        game.load.image("ground", "img/ground.png"); //地面
        game.load.image("title", "img/title.png"); //游戏标题
        game.load.spritesheet("bird", "img/bird_oriange.png", 48, 48, 3); //鸟
        game.load.image("btn", "img/button_play.png"); //开始按钮

        game.load.bitmapFont("flappy_font", "font/font.png", "font/font.fnt");
        game.load.image("pipe_up", "img/pipe_up.png"); //上管道
        game.load.image("pipe_down", "img/pipe_down.png"); //下管道

        game.load.audio("fly_sound", "ogg/sfx_wing.ogg");//飞翔的音效
        game.load.audio("score_sound", "ogg/sfx_point.ogg");//得分的音效
        game.load.audio("hit_pipe_sound", "ogg/sfx_hit.ogg"); //撞击管道的音效
        game.load.audio("hit_ground_sound", "ogg/sfx_die.ogg"); //撞击地面的音效
        game.load.audio("sfx_swooshing", "ogg/sfx_swooshing.ogg"); // 按钮出现的音效

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