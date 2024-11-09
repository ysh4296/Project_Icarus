import Monster from '@engine/lib/component/defense/monster';
import { registry } from '@engine/lib/main';
import Vector, { subVector } from '@engine/lib/vector';
import { Attribute } from '../attribute/attribute';
import Charactor from '../charactor';

export default class Skill {
  public id: number;
  public cost: number;
  public limit: number; // 스킬범위
  description?: string;
  public attributes: Attribute[]; // special traits for skill use it with apply
  user: any;

  constructor(id: number) {
    this.id = id;
    this.cost = 20;
    this.limit = 10000;
    this.attributes = [];
  }

  canApply(): boolean {
    return true;
  }

  apply(user: Charactor, target: Vector) {
    user.battleStat.MP -= this.cost;
    /**
     * @todo
     * Range Skill: add skill Frame
     * Projectile Skill: add projectile object
     */
  }

  /**
   * calculate nearest attackable target
   * @returns found target Vector direction & distance, or null if not found proper target
   */
  setTarget(user: Charactor, limit: number): Vector | null {
    let minLength = limit;
    let target = new Vector({ x: 0, y: 0 });
    registry.engine.objects.forEach((object) => {
      if (user.object.id === object.id) return;
      if (object instanceof Monster) {
        const distance = subVector(user.object.shape.centroid, object.shape.centroid).length();
        if (minLength > distance) {
          minLength = distance;
          target = subVector(user.object.shape.centroid, object.shape.centroid);
        }
      }
    });
    if (minLength === limit) return null;
    /**
     * @todo
     * predict target's position for improved targetting
     */
    return target;
  }

  getTargetBenefitScore(user: Charactor, target: Charactor): number {
    let score = 0;
    // for (const attr of this.attributes ?? []) {
    // conditionals to check if the move is self targeting (if so then you are applying the move to yourself, not the target)
    // score +=
    //   attr.getTargetBenefitScore(user, !attr.selfTarget ? target : user, this) *
    //   (target !== user && attr.selfTarget ? -1 : 1);
    // }
    return score;
  }

  hasAttribute<T extends Attribute>(attribute: Constructor<T>): boolean {
    return true;
  }

  addAttribute<T extends Constructor<Attribute>>(
    attribute: T,
    ...args: ConstructorParameters<T>
  ): Skill {
    const attr = new attribute(...args);
    this.attributes.push(attr);
    return this;
  }
}
