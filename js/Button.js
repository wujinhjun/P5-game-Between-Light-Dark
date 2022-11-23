class Button {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.radius = 24;
        this.size = 48;

        this.colorFill = '#6F6F6F';
        this.colorHover = '#9A9A9A';
        this.colorClick = '#D8D8D8';

    }

    outButton = () => {
        let mouse = createVector(mouseX, mouseY);
        if (mouse.x > this.x - this.w / 2 && mouse.x < this.x + this.w / 2 && mouse.y > this.y - this.h / 2 && mouse.y < this.y + this.h /2) {
            return false;
        }else {
            return true;
        }
    }

    buttonClick = () => {
        if (!this.outButton() && mouseIsPressed) {
            return true;
        } else {
            return false;
        }
    }

    title = (mes, size) => {
        push();
        textAlign(CENTER, CENTER);
        textSize(size);
        text(mes, this.x, this.y);
        pop();
    }

    cornerRadius = (value) => {
        this.radius = value;
    }

    display = () => {
        push();
            rectMode(CENTER);
            // noStroke();
            strokeWeight(3);
            if (this.buttonClick()) {
                fill(this.colorClick);
            } else if (!this.outButton()){
                fill(this.colorHover);
            } else {
                fill(this.colorFill);
            }
            rect(this.x, this.y, this.w, this.h, this.radius);
        pop();
    }

    update = (mes, size) => {
        this.display();
        this.title(mes, size);
    }
}