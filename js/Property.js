class Property {
    // 传入坐标
    // 决定尺寸
    constructor(locX, locY) {
        this.location = createVector(locX, locY);
        this.r = 5;
        this.angle = random(-180, 180);
        this.ifHit = false;
        this.ifDead = false;
        this.span = 255;
        this.id = 'property';
    }

    // 判断距离
    intersects = (other) => {
        let d = dist(this.location.x, this.location.y, other.location.x, other.location.y);
        return (d < this.r + other.r);
    }

    //判断子弹接触否 
    setBulletHit = () => {
        this.ifDead = true;
    }

    // // 检测碰撞
    // setStageHit = (value) => {
    //     this.ifHit = value;
    //     // console.log('hit');
    // }
    // 检测碰撞
    setStageHit = (value) => {
        this.ifHit = value;
        // this.ifDead = false;
        // console.log('hit');
    }
    // 改变状态
    // setStageLiving = () => {
    //     this.ifDead = true;
    // }

    // 判断状态
    
    // 绘制形状
    display = () => {
        push();
            if (this.ifHit) {
                // fill(0, 255, 128);
                this.span -= 10;
            } 
            // else {
            //     // fill(255, 0, 128);
            // }
            fill(255, 0, 128, this.span);
            noStroke();
            ellipse(this.location.x, this.location.y, this.r)
        pop();
    }
} 