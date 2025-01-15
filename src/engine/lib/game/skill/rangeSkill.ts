import { registry } from '@engine/lib/main';
import Vector from '@engine/lib/vector';
import Charactor from '../charactor';
import Frame from './frame';
import Skill from './skill';

export default class RangeSkill extends Skill {
  // frame effects for skill
  // execute frame sequentially
  frames: Frame[];

  constructor(id: number, limit: number) {
    super(id, 25);
    this.frames = [];
    this.limit = limit;
  }

  setFrame(frames: Frame[]) {
    this.frames = frames;
  }

  apply(user: Charactor, target: Vector) {
    super.apply(user, target);
    for (let i = 0; i < this.frames.length; i++) {
      registry.engine.skillEffect.addFrame(user, this, this.frames[i], target);
    }
    registry.engine.skillEffect.createdId++;
  }
}
