import Charactor from '@engine/lib/game/charactor';
import Frame from '@engine/lib/game/skill/frame';
import Skill from '@engine/lib/game/skill/skill';
import { registry } from '@engine/lib/main';
import Rectangle from '@engine/lib/rigidbody/rectangle';
import Shape from '@engine/lib/rigidbody/shape';
import Vector from '@engine/lib/vector';

export interface SkillFrame {
  user: Charactor;
  skill: Skill;
  frame: Frame;
  frameShape: Shape[];
  addTime: number;
}

/**
 * @todo convert waiting & frame to heapq
 */
export default class SkillEffects {
  active: SkillFrame[]; // currently activating Skill
  wait: SkillFrame[]; // waiting for activate

  constructor() {
    this.active = [];
    this.wait = [];
  }

  addFrame(user: Charactor, skill: Skill, frame: Frame) {
    this.wait.push({
      user,
      skill,
      frame,
      frameShape: frame.effectRanges.map(
        (effectRange) =>
          new Rectangle(
            new Vector({ x: effectRange.x, y: effectRange.y }),
            effectRange.width,
            effectRange.height,
            'black',
          ),
      ),
      addTime: registry.gameTime,
    });
  }

  update() {
    this.wait.forEach((skillFrame) => {
      // add active Frame
      if (!skillFrame.frame.isWait(skillFrame.addTime)) {
        this.active.push(skillFrame);
      }
    });

    this.wait = this.wait.filter((skillFrame) => skillFrame.frame.isWait(skillFrame.addTime)); // clear waiting queue

    this.active = this.active.filter((skillFrame) => skillFrame.frame.isAlive(skillFrame.addTime)); // frame out
  }

  draw() {
    this.active.forEach((skillFrame) => skillFrame.frame.draw(skillFrame.user));
  }
}
