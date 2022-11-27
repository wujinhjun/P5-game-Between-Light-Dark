import p5 from "p5";

const mySketch = (parentElement: HTMLElement, widthSize = 300, heightSize = 300) => (sketch: p5) => {

    sketch.setup = () => {
        sketch.createCanvas(widthSize, heightSize);
        sketch.background(0, 0, 0);
    }

    sketch.draw = () => {
        sketch.clear(255, 255, 255, 0);
        sketch.background(0, 0, 0);
        sketch.fill(255);
        sketch.rectMode("center");
        sketch.rect(widthSize / 2, heightSize / 2, 300, 300);
    }
}

export default mySketch;