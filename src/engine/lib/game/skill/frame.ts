import { registry } from '@engine/lib/main';
import Vector from '@engine/lib/vector';
import Charactor from '../charactor';

/**
 * activated skill frames
 */

export default class Frame {
  private skillId: number; // skill id
  private spriteConfiguration: spriteConfiguration; // imformation for getting sprite
  effectRanges: EffectRange[];
  private startDelay: number; // frame will go to wait queue
  private duration: number; // frame will excute effect during duration
  private drawOffset: Vector;
  constructor(
    skillId: number,
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
    registry.sprite.skillDraw(user, this.spriteConfiguration, target, this.drawOffset);
  }

  /**
   * @deprecated
   * when skill Frame conflict with charactor
   * @param userId
   * @param targetId
   */
  effect(userId: number, targetId: number) {
    // this.skill.attributes?.forEach((attr) => {
    //   /**
    //    * skill attributes applied by user , target information
    //    */
    //   attr.apply(user, target);
    // });
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
