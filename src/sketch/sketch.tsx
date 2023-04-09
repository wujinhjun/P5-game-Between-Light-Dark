import React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import p5Instance from "./type";

import Rectangle from "../helper/Rectangle";
import Circle from "../helper/Circle";
import QuadTree from "../helper/QuadTree";
import Point from "../helper/Point";

let qtree: QuadTree;

function sketch(p5: P5CanvasInstance) {
  p5.setup = () => {
    p5.createCanvas(600, 600);
    const width = p5.width,
      height = p5.height;
    qtree = new QuadTree(
      new Rectangle(width / 2, height / 2, width / 2, height / 2),
      4
    );
    for (let i = 0; i < 300; i++) {
      let x = p5.randomGaussian(width / 2, width / 8);
      let y = p5.randomGaussian(height / 2, height / 8);
      let p = new Point(x, y);
      qtree.insert(p);
    }
  };

  p5.draw = () => {
    p5.background(0);

    const range = new Circle(p5.mouseX, p5.mouseY, 64);
    show(qtree, range);
    p5.stroke("pink");
    p5.ellipse(range.x, range.y, range.r * 2);

    let points = qtree.query(range);
    for (let p of points) {
      p5.stroke(0, 255, 0);
      p5.strokeWeight(4);
      p5.point(p.x, p.y);
    }
  };
}

function show(qtree: QuadTree, range: Circle) {
  p5Instance.noFill();
  p5Instance.strokeWeight(1);
  p5Instance.rectMode("center");
  p5Instance.stroke(255, 41);
  if (range.intersects(qtree.boundary)) {
    p5Instance.stroke(255);
  }
  p5Instance.rect(
    qtree.boundary.x,
    qtree.boundary.y,
    qtree.boundary.w,
    qtree.boundary.h
  );

  p5Instance.stroke(255);
  p5Instance.strokeWeight(2);
  for (let p of qtree.points) {
    p5Instance.point(p.x, p.y);
  }

  if (qtree.divided) {
    show(qtree.northeast, range);
    show(qtree.northwest, range);
    show(qtree.southeast, range);
    show(qtree.southwest, range);
  }
}

export default function MySketch() {
  return <ReactP5Wrapper sketch={sketch} />;
}
