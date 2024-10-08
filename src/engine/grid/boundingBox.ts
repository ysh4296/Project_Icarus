import Vector from '@engine/lib/vector';
import { registry } from '@engine/lib/main';

export default class BoundingBox {
  topLeft: Vector;
  bottomRight: Vector;
  collision: boolean;

  constructor() {
    this.topLeft = new Vector({ x: 0, y: 0 });
    this.bottomRight = new Vector({ x: 0, y: 0 });
    this.collision = false;
  }

  intersect(target: BoundingBox): boolean {
    // aabb 충돌 감지 구현
    let lefta = this.topLeft.x;
    let righta = this.bottomRight.x;
    let topa = this.topLeft.y;
    let bottoma = this.bottomRight.y;

    let leftb = target.topLeft.x;
    let rightb = target.bottomRight.x;
    let topb = target.topLeft.y;
    let bottomb = target.bottomRight.y;

    let intersectx = rightb > lefta && leftb < righta;
    let intersecty = topb < bottoma && bottomb > topa;
    return intersectx && intersecty;
  }

  draw() {
    let color = 'green';
    if (this.collision) {
      color = 'red';
    }
    registry.engine.drawUtils.drawLine(
      this.topLeft,
      new Vector({ x: this.bottomRight.x, y: this.topLeft.y }),
      color,
    );
    registry.engine.drawUtils.drawLine(
      new Vector({ x: this.bottomRight.x, y: this.topLeft.y }),
      this.bottomRight,
      color,
    );
    registry.engine.drawUtils.drawLine(
      this.bottomRight,
      new Vector({ x: this.topLeft.x, y: this.bottomRight.y }),
      color,
    );
    registry.engine.drawUtils.drawLine(
      new Vector({ x: this.topLeft.x, y: this.bottomRight.y }),
      this.topLeft,
      color,
    );
  }
}
