import p5 from "p5";

const mySketch = (parentElement: HTMLElement, widthSize = 300, heightSize = 300) => (sketch: p5) => {

    let back: p5.Image;
    sketch.preload = () => {
        back = sketch.loadImage("https://raw.githubusercontent.com/wujinhjun/wujinhjun-pic/main/202211272209540.png")
    }

    sketch.setup = () => {
        sketch.createCanvas(widthSize, heightSize);
        sketch.background(0, 0, 0);
        sketch.smooth();
    }

    sketch.draw = () => {
        sketch.clear(255, 255, 255, 0);
        sketch.background(back);
    }
}

export default mySketch;