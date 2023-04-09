import { ICicle } from "../types";
import Point from "./Point";
import Rectangle from "./Rectangle";

export default class Circle implements ICicle {
  x: number;
  y: number;
  r: number;
  rSquared: number;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = r ** 2;
  }

  contains = (p: Point) =>
    Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2) <= this.rSquared;

  intersects = (range: Rectangle): boolean => {
    const w = range.w;
    const h = range.h;
    const r = this.r;
    const xDist = Math.abs(range.x - this.x);
    const yDist = Math.abs(range.y - this.y);

    const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

    if (xDist > r + w || yDist > r + h) {
      return false;
    }

    if (xDist <= w || yDist <= h) {
      return true;
    }

    return edges <= this.rSquared;
  };
}
