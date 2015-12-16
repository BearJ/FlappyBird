var stateBoot = {
    // 预加载游戏资源
    preload: function () {
        if (!game.device.desktop) { // 移动设备适应
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // 等比缩放，占满屏幕
            this.scale.refresh();
        }
        game.load.image("loading", "img/loading.gif");
    },

    create: function () {
        game.state.start("load"); //跳转到资源加载页面
    }
};