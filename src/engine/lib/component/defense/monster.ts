import Matter from '@engine/lib/matter';
import Vector from '../../vector';
import ImageCircle from '@engine/lib/balls/imageCircle';
import { ANIMATION } from '@engine/lib/enum/animation';

/**
 * @deprecated
 * @todo
 * Convert ImageCircle to monster
 */
export default class Monster extends ImageCircle {
  hp: number;
  constructor(graphic: ANIMATION, position: Vector, hp: number, radius: number) {
    super(graphic, position, radius);
    this.hp = hp;
    this.matter = new Matter(0.7, 0.4);
  }
}
