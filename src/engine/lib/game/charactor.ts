import RigidBody from '../rigidbody/rigidbody';
import Skill from './skill/skill';

export default class Charactor {
  /**
   * @todo
   * convert id to enum type
   */
  public id: number; // charactorId
  public stat: Stat;
  public battleStat: BattleStat;
  public skill: Skill;
  public ability: any;
  public buffs: any;
  public debuff: any;
  public Equipment: any[] | undefined;
  public object: RigidBody;

  constructor(id: number, stats: Stat, skill: Skill, object: RigidBody) {
    this.id = id;
    this.stat = stats;
    this.battleStat = this.calculateBattleStat(stats);
    this.skill = skill;
    /**
     * not just adding skill data to charactor
     * it could modified by value copy
     */
    this.object = object;
  }

  update() {
    if (this.battleStat.Resource.MP < this.battleStat.MP) {
      this.battleStat.Resource.MP += this.battleStat.MPRegen;
    }
    if (this.battleStat.Resource.HP < this.battleStat.HP) {
      this.battleStat.Resource.HP += this.battleStat.HPRegen;
    }

    if (this.skill.cost < this.battleStat.MP) {
      // execute Skill
      if (this.skill.canApply(this)) {
        const target = this.skill.setTarget(this, this.skill.limit);
        if (target === null) return;
        this.skill.apply(this, target);
      }
    }
  }

  calculateBattleStat(stats: Stat): BattleStat {
    const battleStat: BattleStat = {
      ATK: stats.STR * 2 + stats.AGI * 1.5 + stats.DEX * 1,
      MAG: stats.INT * 2 + stats.SPI * 1.5,
      CRIT: stats.LCK * 2 + stats.DEX * 1.5 + stats.AGI * 1,
      CRITDMG: stats.LCK * 1.5 + stats.STR * 1 + stats.AGI * 0.5,
      DEF: stats.VIT * 2 + stats.STR * 1.5 + stats.DEX * 0.5,
      RESIST: stats.SPI * 2 + stats.INT * 1.5 + stats.VIT * 1,
      HP: stats.VIT * 10 + stats.STR * 5,
      HPRegen: stats.VIT * 0.2 + stats.SPI * 0.1,
      MP: stats.INT * 10 + stats.SPI * 5,
      Resource: {
        HP: stats.VIT * 10 + stats.STR * 5,
        MP: 0,
      },
      MPRegen: stats.SPI * 0.2 + stats.INT * 0.1,
      CoolDown: stats.AGI * 0.5 + stats.DEX * 0.3 + stats.LCK * 0.2,
    };
    return battleStat;
  }
}
