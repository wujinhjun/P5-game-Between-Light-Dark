/*
    5.11: 子弹还不能攻击，实现了简单的物理碰撞检测 
    5.12.12: 实现了基本的怪物击杀
    5.12.23: 实现了基本的界面
    5.13: 对细节进行了优化，增加了换弹、
*/

new p5();

const canvasSize = 800;
let mapSize = 800;
let player = new Player(mapSize / 2, mapSize / 2, 2);
// let part
let enemys = [];
let propertys = [];
let bullets = [];
let particles = [];
let back;
let gameStart = false;
let gameSuspend = false;
let stage;
let timesNum = 1;

function setup() {
    // 画布中心： 
    createCanvas(canvasSize, canvasSize);
    back = loadImage('./pic/background.png');
    smooth();
    stage = 1;

    // for (let i = 0; i < 10 ; i++) {
    //     propertys[i] = new Property(random(width), random(height));
    // }

    // for (let i = 0; i < 10; i++) {
    //     enemys[i] = new Enemy(random(width), random(height), 1);
    // }

}

function draw() {
    background(back);

    // drawGui();
    // gameing();

    if (stage === 1) {
        homePage();
    }
    if (stage === 2) {
        if (gameStart) {
            gameing();
            stateBar();
            if (gameSuspend) {
                // console.log(gameSuspend);
                quitBoard();
            }
        }
    }
    if (stage === 3) {
        mapDisplay();
    }
    if (stage === 4) {
        skinSelect();
    }
    if (stage === 5) {
        someTips();
    }
    // skin();

}
// 鼠标单击监听
function mouseClicked() {
    if (gameStart && !gameSuspend) {
        if (mouseButton === LEFT) {
            if (player.bulletsNum >= 1) {
                player.bulletsNum -= 1;
                shootGun();
            }
        }

        if (mouseButton === RIGHT) {
            if (player.money >= 100) {
                player.bulletsNum = 20;
                player.money -= 100;
            }
        }

        // console.log(propertys);
    }

}

function keyTyped() {
    if (key === 'q') {
        gameSuspend = true;
    }
    if (key === 'e') {
        if (player.money >= 100) {
            player.bulletsNum = 20;
            player.money -= 100;
        }
    }
    if (key === 'c') {
        if (player.money >= 1000) {
            player.lifeLength = 100;
            player.money -= 1000;
        }
    }
}


function gameing() {

    // let part
    makeEnemy();
    console.log(enemys);
    let boundary = new Rectangle(mapSize / 2, mapSize / 2, mapSize, mapSize);
    let qTree = new QuadTree(boundary, 4);

    // 箱子
    for (let p of propertys) {
        let point = new Point(p.location.x, p.location.y, p);
        qTree.insert(point);

        p.display();
    }

    // 敌人
    if (enemys) {
        for (let e of enemys) {
            // console.log(e.location);
            let point = new Point(e.location.x, e.location.y, e);
            qTree.insert(point);

            // e.update();
        }
    }


    particles = enemys.concat(bullets);

    player.setStageHit(false);

    let rangePlayer = new Rectangle(player.location.x, player.location.y, player.w - 3, player.h - 3);
    // rangePlayer.spin();
    // rangePlayer.display();
    let points = qTree.query(rangePlayer);
    for (let point of points) {
        let other = point.userData;
        if (player.intersects(other)) {
            // player.setStageHit(true);
            // console.log(typeof other);
            if (other.id === 'property') {
                other.setStageHit(true);
                player.money += 5;
                // player.setStageHit(true);
            } else if (other.id === 'enemy' && !other.ifDead) {
                other.setStageHit(true);
                other.setStageAttack(true);
                player.setDisBet(other);
                // 玩家会受伤
                player.reduceLife(1);
                // console.log('enemy');
            }

        }
    }


    // 对子弹来说，判断是否接近，接近后全部崩解
    // 对怪物来说，判断是否接近，如果是子弹，则自己受伤，如果是道具，则开始鬼畜
    // 对箱子来说，没有必要
    for (let p of particles) {
        let range = new Circle(p.location.x, p.location.y, p.r * 2);
        let points = qTree.query(range);
        for (let point of points) {
            let other = point.userData;
            if (p !== other && p.intersects(other)) {
                if (p.id === 'bullets' && p.id !== other.id && !p.ifDead && !other.ifDead && other.id !== 'property') {
                    other.setBulletHit(true);
                    p.setStageLiving();
                    // p.update();
                    // console.log(p.ifDead);
                    // console.log('bullet1');
                } else if (p.id === 'enemy') {
                    if (other.id === 'bullets' && !p.ifDead && !other.ifDead) {
                        p.setBulletHit(true);
                        other.setStageLiving();
                        // console.log('bullet2');
                    } else if (other.id === 'enemy' && !p.ifDead && !other.ifDead) {
                        p.setStageHit(true);
                        p.setDisBet(other);
                        other.setStageHit(true);
                        // let dis = createVector(this.location.x - other.location.x, this.location.y - other.location.y);
                        // dis.setMag(2 * this.r);
                    } else if (other.id === 'property') {
                        p.setStageHit(true);
                    }
                }
            }
        }
    }
    // // gun.run();
    // angle = player.caluAngle();


    manageShot();
    manageEnemys();
    manageProp();

    particles = enemys.concat(bullets);

    player.run();

    if (player.isDead()) {
        gameSuspend = true;
    }
    borderDraw(mapSize);
    viewPort();
}

// 生成敌人
function makeEnemy() {
    if (enemys.length <= 0) {
        timesNum += 1;
        while (enemys.length <= 6) {
            let locTemp = createVector(random(width), random(height));
            let disTemp = locTemp.dist(player.location);
            if (disTemp >= 200) {
                enemys.push(new Enemy(locTemp.x, locTemp.y, random(0.5, 1)));
            }
        }
    }
}

// 管理敌人（死亡后从列表中清除）
function manageEnemys() {
    let sumTemp = enemys.length;
    if (sumTemp > 0) {
        for (let i = sumTemp - 1; i >= 0; i--) {
            let enemyTemp = enemys[i];
            if (gameSuspend) {
                enemyTemp.suspend();
            } else {
                enemyTemp.update();
            }
            if (enemyTemp.isDis()) {
                enemys.splice(i, 1);
            }
        }
    }
}

// 管理掉落物
function manageProp() {
    let sumTemp = propertys.length;
    if (sumTemp > 0) {
        for (let i = sumTemp - 1; i >= 0; i--) {
            let propTemp = propertys[i];
            propTemp.display();
            if (propTemp.ifHit) {
                propertys.splice(i, 1);
            }
        }
    }
}

function stateBar() {
    push();
    noStroke();
    fill(111, 80);
    rect(0, 0, 800, 145);
    fill(49, 132, 228, 200);
    rect(25, 10, 125, 125, 20);

    // 生命值
    push();
    noFill();
    // fill(0, 255, 100);
    stroke(200);
    rect(185, 10, 300, 50, 15);
    pop();
    if (player.lifeLength >= 70) {
        fill(0, 255, 133, 200);
    } else if (player.lifeLength >= 30) {
        fill(255, 162, 23, 200);
    } else {
        fill(255, 0, 0, 200);
    }

    let lifeLength = map(player.lifeLength, 0, 100, 0, 300);
    if (lifeLength >= 0) {
        rect(185, 10, lifeLength, 50, 15);
    }

    // 子弹条
    push();
    noFill();
    // fill(0, 255, 100);
    stroke(200);
    rect(185, 85, 300, 50, 15);
    pop();
    fill(201, 227, 121, 200);
    let bulletsNum = map(player.bulletsNum, 0, 20, 0, 300);
    if (lifeLength >= 0) {
        rect(185, 85, bulletsNum, 50, 15);
    }
    // rect(185, 85, 300, 50, 15);
    textAlign(LEFT, CENTER);
    textSize(40);
    fill('#000000')
    text('光点：' + player.money, 515, 35);
    text('波数：' + timesNum, 515, 110);
    pop();
}

function quitBoard() {
    // push();
    // translate(225, 225);
    fill(196, 255 * 0.6);
    rect(225, 225, 350, 350);
    textAlign(LEFT, TOP);
    textSize(48);
    fill(0)
    let str = '游戏暂停'
    if (player.lifeLength <= 0) {
        str = '游戏结束';
    }
    text(str, 79 + 225, 60 + 225);
    let quit = new Button(29 + 60 + 225, 225 + 40 + 225, 120, 80);
    let last = new Button(200 + 60 + 225, 225 + 40 + 225, 120, 80);
    quit.update('退出', 40);
    last.update('返回', 40);

    if (quit.buttonClick()) {
        gameSuspend = false;
        stage = 1;
        reStart();
    }
    if (last.buttonClick()) {
        gameSuspend = false;
    }

    // pop();
}

function reStart() {
    player = new Player(mapSize / 2, mapSize / 2, 2);
    propertys = [];
    enemys = [];
    bullets = [];
    particles = [];
}