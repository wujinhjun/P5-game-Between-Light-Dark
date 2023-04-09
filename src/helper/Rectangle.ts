import { IPoint, IRectangle, Vector } from "../types";
import p5Instance from "../sketch/type";

export default class Rectangle implements IRectangle {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains = (point: IPoint) => {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  };

  intersects = (range: Rectangle) => {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.w > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  };

  calcVector = (): Vector => {
    const mouse: Vector = p5Instance.createVector(
      p5Instance.mouseX - this.x,
      p5Instance.mouseY - this.y
    );

    return mouse.normalize();
  };

  calcAngle = (): number => {
    const directVector = this.calcVector();
    return p5Instance.createVector(1, 0).angleBetween(directVector);
  };

  subdivide = (quadrant: "ne" | "nw" | "se" | "sw") => {
    const x = this.x,
      y = this.y,
      w = this.w,
      h = this.h;
    switch (quadrant) {
      case "ne":
        return new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
      case "nw":
        return new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
      case "se":
        return new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
      case "sw":
        return new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    }
  };

  display = () => {
    p5Instance.push();

    const angle = this.calcAngle();
    p5Instance.translate(this.x, this.y);
    p5Instance.rotate(angle);
    p5Instance.rectMode("center");
    p5Instance.rect(15, 0, this.w, this.h);

    p5Instance.pop();
  };
}
