import Vector from '@engine/lib/vector';
import Charactor from '../charactor';
import Skill from './skill';

export default class ProjectileSkill extends Skill {
  constructor(id: number) {
    super(id);
  }

  apply(user: Charactor, target: Vector) {
    super.apply(user, target);

    // add projectile
    this.addProjectile([]);
  }

  addProjectile(projectile: any) {}
}
