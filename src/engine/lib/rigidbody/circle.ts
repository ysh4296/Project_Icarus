import Draw from '@engine/utils/draw';
import Shape from './shape';
import Vector, { subVector } from '../vector';

export default class Circle extends Shape {
  radius: number;
  drawUtils: Draw;

  constructor(position: Vector, radius: number, color: string) {
    super(
      [new Vector({ ...position }), new Vector({ x: position.x + radius, y: position.y })],
      color,
    );
    this.radius = radius;
    this.drawUtils = Draw.getInstance();
    super.setCentroid(position);
  }

  calculateInertia(mass: number) {
    return mass * this.radius * this.radius * 0.5;
  }

  calculateBoundingBox() {
    this.boundingBox.topLeft = new Vector({
      x: this.centroid.x - this.radius,
      y: this.centroid.y - this.radius,
    });
    this.boundingBox.bottomRight = new Vector({
      x: this.centroid.x + this.radius,
      y: this.centroid.y + this.radius,
    });
  }

  draw() {
    super.draw();
    this.drawUtils.strokeCircle(this.centroid, this.radius, this.color);
  }

  isInside(position: Vector) {
    const distance = subVector(this.centroid, position).length();
    if (distance > this.radius) return false;
    return true;
  }
}
