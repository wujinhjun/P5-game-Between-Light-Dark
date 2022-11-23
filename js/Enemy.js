class Enemy {
    
    // 结构函数，传入坐标， 速度， 血量
    constructor(x, y, speed) {
        this.location = createVector(x, y);
        // this.velocity = createVector(xSpeed, ySpeed);
        this.speed = speed;
        this.bodyColor = "#00FF85";
        this.eyeColor = "#FF0000";
        this.id = "enemy";
        this.r = 35;

        this.ifHit = false;
        this.ifAttack = false;
        this.ifDead = false;
        this.offset = random(-5, 5);
        this.stillSpan = 255;

        // 是否掉落
        this.prop = false;
    }

    intersects = (other) => {
        let d = dist(this.location.x, this.location.y, other.location.x, other.location.y);
        return (d < this.r + other.r);
    }

    setStageHit = (value) => {
        this.ifHit = value;
    }

    setStageAttack = (value) => {
        this.ifAttack = value;
    }

    setDisBet = (other) => {
        // translate(this.location.x, this.location.y);
        // other.location.setMag(45);
        let distanceTemp =  dist(this.location.x, this.location.y, other.location.x, other.location.y);
        let dis = createVector(this.location.x - other.location.x, this.location.y - other.location.y);
        dis.normalize();
        dis.mult(-0.5);
        if (distanceTemp < 40) {
            other.location.add(dis);
        }
    }

    //判断子弹接触否 
    setBulletHit = (value) => {
        this.isDead = value;
        // console.log('bullet');
    }

    // 判断是否消失
    isDis = () => {
        if (this.isDead) {
            if (!this.prop) {
                this.someProps();
                this.prop = true;
            }
            this.speed = 0;
            this.stillSpan -= 3;
            if (this.stillSpan <= 0) {
                return true;
            } 
        }
    }

    move = () => {
        // if (!this.ifHit) {
            this.directionTemp = createVector(player.location.x - this.location.x, player.location.y - this.location.y);
            this.directionTemp.normalize();
            this.directionTemp.mult(this.speed);
            this.velocity = this.directionTemp;
            this.location.add(this.velocity);
        // } a
        // else {
        //     let tempDir = createVector(random(-2, 2), random(-2, 2));
        //     this.location.add(tempDir);
        // }
    }

    // 显示
    display = () => {
        push();
            if (!this.isDead) {
                noStroke();
                let vectorHor = createVector(50, 0);
                // this.direction.mult(5);
                let directionTemp = createVector(player.location.x - this.location.x, player.location.y - this.location.y);
                let angleTemp = vectorHor.angleBetween(directionTemp);
            
                fill(this.bodyColor);
                translate(this.location.x, this.location.y);
                rotate(angleTemp);
                arc(0, 0, 30, 30, QUARTER_PI, 2 * PI - QUARTER_PI, CHORD);
                if (this.ifAttack) {
                    fill(this.eyeColor);
                }
                ellipse(18, 5, 9, 6);
                ellipse(18, -5, 9, 6);
                fill(this.eyeColor);
                rectMode(CENTER);
                rect(0, -5, 10, 6);
                rect(0, 5, 10, 6);
            } else if (!this.stillSpan) {
                fill(200, this.stillSpan);
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        ellipse(18 + i * this.offset, 5 + j * this.offset, 9, 6);
                    }
                }
                
                // ellipse(18, -5, 9, 6);
                // console.log("yes");
            }
            
        pop();
    }

    // 生成掉落物
    someProps = () => {
        for (let i = 0; i < 5; i++){
            propertys.push(new Property(this.location.x + random(-5, 5), this.location.y + random(-5, 5)));
        }
    }

    update = () => {
        this.move();
        this.display();
        this.setStageHit(false);
        this.setStageAttack(false);
    }

    suspend = () => {
        this.display();
        this.setStageHit(false);
        this.setStageAttack(false);
    }
}