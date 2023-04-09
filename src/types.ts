import p5 from "p5";
import QuadTree from "./helper/QuadTree";

export interface IPoint {
  x: number;
  y: number;
  readonly userData?: string;
}

export interface IRectangle {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ICicle {
  x: number;
  y: number;
  r: number;
  rSquared: number;
}

export interface IQuad {
  boundary: IRectangle;
  capacity: number;
  depth: number;
  points: IPoint[];
  divided: boolean;
  northeast: QuadTree;
  northwest: QuadTree;
  southeast: QuadTree;
  southwest: QuadTree;
}

export type Vector = p5.Vector;
