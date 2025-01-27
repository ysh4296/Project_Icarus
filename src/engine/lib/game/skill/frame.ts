import { SKILL } from '@engine/lib/enum/skill';
import { registry } from '@engine/lib/main';
import Vector from '@engine/lib/vector';
import Charactor from '../charactor';
import { skillSpriteData } from '../data/spriteData';

/**
 * activated skill frames
 */

export default class Frame {
  private skillId: SKILL; // skill id
  private spriteConfiguration: spriteConfiguration; // imformation for getting sprite
  effectRanges: EffectRange[];
  private startDelay: number; // frame will go to wait queue
  private duration: number; // frame will excute effect during duration
  private drawOffset: Vector;

  /**
   * Create a copy of this Frame instance
   * @param skillId skillId
   * @returns {Frame}
   */
  constructor(
    skillId: SKILL,
    startDelay: number,
    duration: number,
    effectRanges: EffectRange[],
    spriteConfiguration: spriteConfiguration,
    drawOffset: Vector,
  ) {
    this.skillId = skillId;
    this.effectRanges = effectRanges;
    this.startDelay = startDelay;
    this.duration = duration; // 120 frame
    this.spriteConfiguration = spriteConfiguration;
    this.drawOffset = drawOffset;
  }

  isWait(addTime: number): boolean {
    return addTime + this.startDelay > registry.gameTime;
  }

  isAlive(addTime: number): boolean {
    return this.duration + this.startDelay + addTime > registry.gameTime;
  }

  draw(user: Charactor, target: Vector) {
    /**
     * @todo skill sprite draw
     * draw with spriteConfiguration
     */
    // this.effectRange.draw();
    // 스킬을 누가썼는지를 알아야 스킬을 어디에 배치할지를 알 수 있음
    if (!user) throw Error('noEntity');
    skillSpriteData[this.skillId]?.skillDraw(
      user,
      this.spriteConfiguration,
      target,
      this.drawOffset,
    );
  }

  /**
   * Create a copy of this Frame instance
   * @returns {Frame}
   */
  copy(): Frame {
    return new Frame(
      this.skillId,
      this.startDelay,
      this.duration,
      [...this.effectRanges], // Deep copy the effectRanges array
      { ...this.spriteConfiguration }, // Assuming spriteConfiguration is an object, create a shallow copy
      this.drawOffset,
    );
  }
}
