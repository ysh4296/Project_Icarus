import { registry } from '@engine/lib/main';
import Charactor from '../charactor';
import Frame from './frame';
import Skill from './skill';

export default class RangeSkill extends Skill {
  // frame effects for skill
  // execute frame sequentially
  frames: Frame[];

  constructor(id: number) {
    super(id);
    this.frames = [];
    console.log('init Range Skill', this);
  }

  setFrame(frames: Frame[]) {
    this.frames = frames;
  }

  apply(user: Charactor) {
    super.apply(user);
    for (let i = 0; i < this.frames.length; i++) {
      registry.engine.skillEffect.addFrame(user, this, this.frames[i]);
    }
    registry.engine.skillEffect.createdId++;
  }
}
