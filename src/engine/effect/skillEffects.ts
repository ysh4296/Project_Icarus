import Charactor from '@engine/lib/game/charactor';
import Frame from '@engine/lib/game/skill/frame';
import Skill from '@engine/lib/game/skill/skill';
import { registry } from '@engine/lib/main';
import Rectangle from '@engine/lib/rigidbody/rectangle';
import Shape from '@engine/lib/rigidbody/shape';
import Vector, { subVector } from '@engine/lib/vector';

export interface SkillFrame {
  id: number;
  user: Charactor;
  skill: Skill;
  frame: Frame;
  frameShape: Shape[];
  addTime: number;
  target: Vector;
}

/**
 * @todo convert waiting & frame to heapq
 */
export default class SkillEffects {
  createdId: number;
  active: SkillFrame[]; // currently activating Skill
  wait: SkillFrame[]; // waiting for activate

  constructor() {
    this.createdId = 0;
    this.active = [];
    this.wait = [];
  }

  addFrame(user: Charactor, skill: Skill, frame: Frame, target: Vector) {
    const newAngle = registry.engine.calculatorUtils.getAngleBetweenVectors(
      new Vector({ x: 0, y: 1 }),
      target,
    );
    this.wait.push({
      id: this.createdId,
      user,
      skill,
      frame,
      frameShape: frame.effectRanges.map((effectRange) => {
        const newVector = new Vector({ x: effectRange.x, y: effectRange.y });
        newVector.rotate(newAngle);

        const shape = new Rectangle(
          subVector(newVector, target),
          effectRange.width,
          effectRange.height,
          'black',
        );
        shape.rotate(newAngle);
        return shape;
      }),
      addTime: registry.gameTime,
      target,
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
    this.active.forEach((skillFrame) => skillFrame.frame.draw(skillFrame.user, skillFrame.target));
  }
}
