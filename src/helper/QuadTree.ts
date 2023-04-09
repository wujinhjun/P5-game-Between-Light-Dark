import { IPoint, IQuad } from "../types";
import Rectangle from "./Rectangle";
import Point from "./Point";
import p5Instance from "../sketch/type";
import Circle from "./Circle";

export default class QuadTree implements IQuad {
  boundary: Rectangle;
  capacity: number;
  depth: number;
  points: Point[];
  divided: boolean;
  northeast!: QuadTree;
  northwest!: QuadTree;
  southeast!: QuadTree;
  southwest!: QuadTree;

  MAX_DEPTH = 8;
  DEFAULT_CAPACITY = 8;

  constructor(boundary: Rectangle, n: number = 8, depth = 0) {
    this.boundary = boundary;
    this.capacity = n;
    this.depth = depth;
    this.points = [];
    this.divided = false;
  }

  subdivided = () => {
    this.northeast = new QuadTree(
      this.boundary.subdivide("ne"),
      this.capacity,
      this.depth + 1
    );
    this.northwest = new QuadTree(
      this.boundary.subdivide("nw"),
      this.capacity,
      this.depth + 1
    );
    this.southeast = new QuadTree(
      this.boundary.subdivide("se"),
      this.capacity,
      this.depth + 1
    );
    this.southwest = new QuadTree(
      this.boundary.subdivide("sw"),
      this.capacity,
      this.depth + 1
    );

    this.divided = true;
  };

  insert = (p: IPoint): boolean => {
    if (!this.boundary.contains(p)) {
      return false;
    }
    if (!this.divided) {
      if (this.points.length < this.capacity || this.depth === this.MAX_DEPTH) {
        this.points.push(p);
        return true;
      }

      this.subdivided();
    }

    return (
      this.northeast.insert(p) ||
      this.northwest.insert(p) ||
      this.southeast.insert(p) ||
      this.southwest.insert(p)
    );
  };

  deleteInRange = (range: Rectangle) => {
    if (this.divided) {
      this.northeast.deleteInRange(range);
      this.northwest.deleteInRange(range);
      this.southeast.deleteInRange(range);
      this.southwest.deleteInRange(range);
    }

    this.points = this.points.filter((p) => !range.contains(p));
  };

  query = (range: Rectangle | Circle, found: Point[] = []): Point[] => {
    if (!range.intersects(this.boundary)) {
      return found;
    }

    for (const p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }

    if (this.divided) {
      this.northeast.query(range, found);
      this.northwest.query(range, found);
      this.southeast.query(range, found);
      this.southwest.query(range, found);
    }

    return found;
  };

  show = () => {
    p5Instance.stroke(255);
    p5Instance.strokeWeight(1);
    p5Instance.noFill();
    p5Instance.rectMode("center");
    p5Instance.rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );
    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
    p5Instance.strokeWeight(2);
    for (let p of this.points) {
      p5Instance.point(p.x, p.y);
    }
  };
}
