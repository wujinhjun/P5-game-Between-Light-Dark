class Player {
    // 最开始写的一个class，当时忘了向量这个问题，哽咽，等有空了我重构

    // 构造函数，输入位置，速度，
    // 大小， 攻击范围？ 色彩：身体、眼睛、武器；视野
    // 其他属性：攻击范围，防御力， 血量， 初始等级……
    constructor(x, y, speed) {
        this.x = x + 15;
        this.y = y;
        this.w = 60;
        this.h = 30;
        this.location = createVector(x + 20, y);
        this.speed = speed;
        this.diameter = 30;
        this.radius = this.diameter / 2;
        this.field = 45;
        this.colorBody = '#FFFFFF';
        this.colorEye = '#3184E4';
        this.colorWeapon = '#000000';
        this.viewSize = 200;

        this.ifHit = false;
        this.lifeLength = 100;
        this.bulletsNum = 20;
        this.money = 0;
        this.id = "player";
    }

    // 检测碰撞
    setStageHit = (value) => {
        this.ifHit = value;
    }

    setDisBet = (other) => {
        // translate(this.location.x, this.location.y);
        // other.location.setMag(45);
        let distanceTemp =  dist(this.location.x, this.location.y, other.location.x, other.location.y);
        let dis = createVector(this.location.x - other.location.x, this.location.y - other.location.y);
        dis.normalize();
        dis.mult(-0.5);
        if (distanceTemp < 60) {
            other.location.add(dis);
        }
    }

    // 玩家受伤
    reduceLife = (value) => {
        this.lifeLength -= value;
    }

    // 很遗憾，发现我的这个并不好用
    // 距离检测
    intersects = (other) => {
        let vectorTemp = createVector(other.x - this.location.x, other.y - this.location.y);
        let vectorVer = createVector(0, -this.h);
        let angle = vectorTemp.angleBetween(vectorVer);
        let d = dist(this.location.x, this.location.y, other.location.x, other.location.y);

        let dTemp = Math.max((this.w / 2) * cos(angle), this.h / 2)
        let distTemp = other.r + dTemp;
        // console.log("yes intersect");
        // if (d < distTemp) {
        //     // console.log('no hit');
        //     return false;
        // } else {
        //     // console.log('hit');
        //     return true;
        // }
        return !(d < distTemp);
    }
    
    // // 改变状态
    // setStageLiving = () => {
    //     this.isDead = true;
    // }

    move = () => {
        // if (!this.ifHit) {
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            if (this.location.x - this.radius > 0){
                this.location.x -= this.speed;
            }
        } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            if (this.location.x + this.radius < width){
                this.location.x += this.speed;
            }
        } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
            if (this.location.y - this.radius > 0){
                this.location.y -= this.speed;
            }
        } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
            if (this.location.y + this.radius < height){
                this.location.y += this.speed;
            }
        }
        
        // }
    }

    // 一个函数用于暴露出玩家所在^终于理解为什么会有屎山代码了，我也想知道我为什么会写出这种代码
    exposeLoc = () => {
        let location = createVector(this.location.x, this.location.y);
        
        return location;
    }

    // 一个函数用于计算鼠标与中心点的向量
    caluVector = () => {
        let mouse = createVector(mouseX - this.location.x, mouseY - this.location.y);
        mouse.normalize();
        
        return mouse;
    }

    // 暴露出枪的位置
    caluGun = () => {
        let mouse = this.caluVector();
        mouse.mult(45);
        let loc = this.exposeLoc();
        let theGun = loc.add(mouse);

        return theGun;
    }

    caluAngle = () => {
        let directVector = this.caluVector();
        let thePlaneVector = createVector(50, 0);
        let angleMouse = thePlaneVector.angleBetween(directVector);

        return angleMouse;
    }

    displayTargetSpot = () => {
        let spotRectHeight = 1.5;
        let spotRectWidth = 15;
        let spotRectCenter = 17;
        if (mouseIsPressed) {
            spotRectHeight = 3;
        }
        push();
            noStroke();
            translate(mouseX, mouseY);
            fill(0);
            rectMode(CENTER);
            rect(spotRectCenter, 0, spotRectWidth, spotRectHeight);
            rect(-spotRectCenter, 0, spotRectWidth, spotRectHeight);
            rect(0, spotRectCenter, spotRectHeight, spotRectWidth);
            rect(0, -spotRectCenter, spotRectHeight, spotRectWidth);
            ellipse(0, 0, spotRectHeight*2);
        pop();
    }

    displayPlayer = () => {
        // line(this.location.x, this.location.y, mouseX, mouseY);
        push();
            if (!this.isDead()) {
                noStroke();
                translate(this.location.x, this.location.y);
                // translate(mapSize / 2, mapSize / 2);
                var angleMouse = this.caluAngle();
                rotate(angleMouse);
                rectMode(CENTER);
                fill(this.colorWeapon);
                rect(23, 0, 45, 6, 3);
                if (this.ifHit) {
                    fill(255, 0, 0);
                } else {
                    fill(this.colorBody);
                }
                ellipse(0, 0, this.diameter, this.diameter);
                if (mouseIsPressed) {
                    if (mouseButton === LEFT) {
                        rect(21, 0, 6, 20, 3);
                    }
                }else {
                    rect(25, 0, 6, 20, 3);
                }
                fill(this.colorEye);
                rect(6, 0, 6, 14, 3);
                rect(-6, 0, 6, 18, 3);
            } else {
                fill(this.colorBody);
                rectMode(CENTER);
                rect(this.location.x, this.location.y, 20, 30);
            }
        pop();
    }

    // 判断玩家是否死亡
    isDead = () => {
        return (this.lifeLength <= 0);    
    }

    run = () => {
        this.displayTargetSpot();
        this.displayPlayer();
        this.move();
    }
}