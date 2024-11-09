import Monster from '@engine/lib/component/defense/monster';
import { registry } from '@engine/lib/main';
import Vector, { rotateVector, subVector } from '@engine/lib/vector';
import Charactor from '../charactor';

export abstract class Attribute {
  private extraCondition: AttributeCondition;

  constructor() {}

  getCondition(): AttributeCondition | null {
    return this.extraCondition || null;
  }

  addCondition(condition: AttributeCondition): Attribute {
    this.extraCondition = condition;
    return this;
  }
}

export type AttributeCondition = ((charactor: Charactor) => boolean) | undefined;

export class DamageAttribute extends Attribute {
  damage: number;
  constructor() {
    super();
    this.damage = 300;
  }

  apply(user: Charactor, targetMonster: Monster): boolean | Promise<boolean> {
    targetMonster.onDamage(this.damage, targetMonster.shape.centroid);
    return true;
  }
}

export class BounceAttribute extends Attribute {
  hit: Vector;
  constructor() {
    super();
    this.hit = new Vector({ x: 0, y: -500 });
  }

  apply(user: Charactor, targetMonster: Monster): boolean | Promise<boolean> {
    const newAngle = registry.engine.calculatorUtils.getAngleBetweenVectors(
      new Vector({ x: 0, y: 1 }),
      subVector(user.object.shape.centroid, targetMonster.shape.centroid),
    );
    targetMonster.velocity.add(rotateVector(this.hit, newAngle));
    // targetMonster.velocity = rotateVector(this.hit, newAngle);
    return true;
  }
}
