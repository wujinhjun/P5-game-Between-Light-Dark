function homePage() {
    titleDisplay();
    let startGame = new Button(400, 390, 280, 100);
    startGame.update('开始游戏', 48);
    let selectMap = new Button(400, 526, 280, 100);
    selectMap.update('地图选择', 48);
    let selectSkin = new Button(400, 662, 280, 100);
    selectSkin.update('角色选择', 48);
    let tips = new Button(712, 712, 100, 77);
    tips.update('提示', 24);
    tips.cornerRadius(12);
    // let story = new Button(712, 712, 100, 77);
    // story.update('故事', 24);
    // story.cornerRadius(12);

    if(startGame.buttonClick()) {
        gameStart = true;
        stage = 2;
    }
    if(selectMap.buttonClick()) {
        stage = 3;
    }
    if(selectSkin.buttonClick()) {
        stage = 4;
    }
    if(tips.buttonClick()) {
        stage = 5;
    }
}

function titleDisplay() {
    push();
        textAlign(LEFT, TOP);
        textSize(96);
        text('光暗之间', 208, 69);
        textSize(32);
        text('by wujinhjun', 305.5, 209);
    pop();
}

function mapDisplay() {
    push();
        textAlign(LEFT, TOP);
        textSize(72);
        text('地图选择', 256, 165);
    pop();
    let map1 = new Button(400, 390, 280, 100);
    map1.update('地图一', 48);
    let map2 = new Button(400, 526, 280, 100);
    map2.update('地图二', 48);
    let map3 = new Button(400, 662, 280, 100);
    map3.update('地图三', 48);
    let returnHome = new Button(128, 101, 160, 106);
    returnHome.update('返回', 48);


    if (map1.buttonClick()) {
        back = loadImage('./pic/backgroundr.png');
    }

    if (map2.buttonClick()) {
        back = loadImage('./pic/background.png');
    }

    if (map3.buttonClick()) {
        back = loadImage('./pic/backgroundb.png');
    }
    if (returnHome.buttonClick()) {
        stage = 1;
    }

    // if(startGame.buttonClick()) {
    //     // console.log('yes');
    //     gameStart = true;
    //     stage = 2;
    // }
}

function skinSelect() {
    push();
        textAlign(LEFT, TOP);
        textSize(72);
        text('角色选择', 256, 165);
        // textAlign(TOP, TOP);
        textSize(24);
        text('此模块正在开发中，敬请期待', 244, 264);
    pop();
    let map1 = new Button(400, 390, 280, 100);
    map1.update('角色一', 48);
    let map2 = new Button(400, 526, 280, 100);
    map2.update('角色二', 48);
    let map3 = new Button(400, 662, 280, 100);
    map3.update('角色三', 48);
    let returnHome = new Button(128, 101, 160, 106);
    returnHome.update('返回', 48);

    if (returnHome.buttonClick()) {
        stage = 1;
    }
}

function someTips() {
    push();
        textAlign(LEFT, TOP);
        textSize(72);
        text('操作提示', 256, 165);
    pop();

    let returnHome = new Button(128, 101, 160, 106);
    returnHome.update('返回', 48);

    tipsLine(123, 304, '移动操作：WASD对应上下左右');
    tipsLine(123, 382, '攻击操作：使用鼠标左键进行攻击');
    tipsLine(123, 460, '填弹操作：使用e键进行填弹');
    tipsLine(123, 514, '每次填弹耗费100点');
    tipsLine(123, 592, '恢复生命：使用c键进行恢复，每次');
    tipsLine(123, 646, '恢复耗费1000点');

    if (returnHome.buttonClick()) {
        stage = 1;
    }
}

// 一个组件用来显示提示
function tipsLine(x, y, str) {
    push();
        textAlign(LEFT, TOP);
        textSize(36);
        text(str, x, y, 800 - 123, 700);
    pop();
}