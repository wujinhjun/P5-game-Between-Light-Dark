class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains = (point) => {
        return (point.x >= this.x - this.w && point.x < this.x + this.w && point.y >= this.y - this.h && point.y < this.y + this.h);
    }

    intersects = (range) => {
        return !(range.x - range.w > this.x + this.w || range.x + range.w < this.x - this.w || range.y - range.h > this.y + this.h || range.y + range.h < this.y - this.h);
    }

    // 一个函数用于计算鼠标与中心点的向量
    caluVector = () => {
        let mouse = createVector(mouseX - this.x, mouseY - this.y);
        mouse.normalize();

        return mouse;
    }

    caluAngle = () => {
        let directVector = this.caluVector();
        let thePlaneVector = createVector(50, 0);
        let angleMouse = thePlaneVector.angleBetween(directVector);

        return angleMouse;
    }

    display() {
        push();
        let angle = this.caluAngle();

        translate(this.x, this.y);
        rotate(angle);
        rectMode(CENTER);
        rect(15, 0, this.w, this.h);
        pop();
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
    }

    contains(point) {
        // check if the point is in the circle by checking if the euclidean distance of
        // the point and the center of the circle if smaller or equal to the radius of
        // the circle
        let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
        return (d <= this.rSquared);
    }

    intersects(range) {
        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);

        // radius of the circle
        let r = this.r;

        let w = range.w;
        let h = range.h;

        let edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

        // no intersection
        if (xDist > r + w || yDist > r + h) {
            return false;
        }

        // intersection within the circle
        if (xDist <= w || yDist <= h) {
            return true;
        }

        // intersection on the edge of the circle
        return (edges <= this.rSquared);
    }
}