import { IPoint } from "../types";

class Point implements IPoint {
  x: number;
  y: number;
  userData: string;
  constructor(x: number, y: number, userData: string) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}
