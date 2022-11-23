class Shots {
    // 传入初始坐标，初速度， 加速度， 射程
    constructor(initX, initY, initAccVelX, initAccVelY, initSpeedX, initSpeedY, field){
        this.location = createVector(initX, initY);
        this.accVel = createVector(initAccVelX, initAccVelY);
        this.bulletVel = createVector(initSpeedX, initSpeedY);
        this.field = field;
        this.ifDead = false;
        this.stillSpan = 255;
        this.ifDis = false;
        this.bulletSize = 10;
        this.r = this.bulletSize;
        this.id = 'bullets';

        this.xOffset = random(-5, 5);
        this.yOffset = random(-5, 5);
    }

    // 改变状态
    setStageLiving = () => {
        this.ifDead = true;
    }

    // 距离检测
    intersects = (other) => {
        let d = dist(this.location.x, this.location.y, other.location.x, other.location.y);
        return (d < this.r + other.r);
    }

    // 子弹移动
    move = () => {
        this.bulletVel.add(this.accVel);
        if (this.bulletVel.mag === 0) {
            this.ifDead = true;
        } 
        this.location.add(this.bulletVel);
        this.field -= 1;

        if (this.field <= 0) {
            this.ifDead = true;
        }
    }

    // 边界检测
    checkEdge = () => {
        if (this.location.x >= mapSize - this.bulletSize || this.location.x <= this.bulletSize || this.location.y >= mapSize - this.bulletSize || this.location.y <= this.bulletSize) {
            this.ifDead = true;
        }
    }

    // // 碰撞检测
    // checkHit() {

    // }

    // 显示
    display = () => {
        push();
            noStroke();
            // console.log(this.ifDead);
            if (this.ifDead) {   
                this.stillSpan -= 5;
                fill(0, 255, 128, this.stillSpan);
                for (let i = -1; i <= 1; i++) {
                    ellipse(this.location.x + Math.pow(-1, i) * this.yOffset, this.location.y + Math.pow(-1, i) * this.yOffset, 5 + this.xOffset, 5 + this.yOffset);
                }
            } else {
                // fill(255, 255, 255,);
                fill(0, 255, 128, this.field);
                ellipse(this.location.x, this.location.y, 10);
                // console.log('存活');
            }
            // console.log(this.location.x, this.location.y);
        pop();
    }

    // 是否死亡
    isDead = () => {
        if (this.ifDead) {
            this.bulletVel.mult(0);
        }
    }

    // 是否消失
    isDis = () => {
        if (this.ifDead) {
            this.bulletVel.mult(0);
            // this.stillSpan -= 1;
            if (this.stillSpan < 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // 暴露出子弹的坐标
    exposeLocation = () => {
        return this.location;
    }

    // 集成
    update = () => {
        this.move();
        this.checkEdge();
        this.display();
    }
}

function shootGun() {
    let initLoc = player.caluGun();
    let initVel = createVector(mouseX - initLoc.x, mouseY - initLoc.y);
    initVel.normalize();
    initVel.mult(10);
    bullets.push(new Shots(initLoc.x, initLoc.y, 0, 0, initVel.x, initVel.y, 255));
    // console.log(bullets);
}

function manageShot() {
    let sumTemp = bullets.length;
    if (sumTemp > 0) {
        for(let i = sumTemp - 1; i >= 0; i--) {
            let bulletTemp = bullets[i];
            bulletTemp.update();
            // bulletTemp.display();
            if (bulletTemp.isDis()) {
                bullets.splice(i, 1);
            }
        }
    }
}