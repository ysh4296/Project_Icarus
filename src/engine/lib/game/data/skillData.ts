import { SKILL } from '@engine/lib/enum/skill';
import Vector from '@engine/lib/vector';
import { BounceAttribute, DamageAttribute } from '../attribute/attribute';
import Frame from '../skill/frame';
import RangeSkill from '../skill/rangeSkill';
import Skill from '../skill/skill';

export const skillData: Skill[] = [];

const skillFrame: Frame[][] = [];

export const initSkillData = () => {
  skillData.push(
    new RangeSkill(SKILL.HORIZONTAL_SLASH, 100)
      .addAttribute(DamageAttribute)
      .addAttribute(BounceAttribute),
  );

  skillFrame.push([
    new Frame(
      SKILL.HORIZONTAL_SLASH,
      0,
      6,
      [{ x: -50, y: 85, width: 20, height: 50 }],
      {
        source: '/skillEffect/Horizontal_Slash.png',
        width: 48,
        height: 48,
        row: 0,
        column: 0,
      },
      new Vector({ x: -100, y: 160 }),
    ),
    new Frame(
      SKILL.HORIZONTAL_SLASH,
      6,
      6,
      [
        { x: -50, y: 80, width: 20, height: 50 },
        { x: -35, y: 35, width: 20, height: 50 },
        { x: 0, y: 0, width: 50, height: 20 },
      ],
      {
        source: '/skillEffect/Horizontal_Slash.png',
        width: 48,
        height: 48,
        row: 0,
        column: 1,
      },
      new Vector({ x: -100, y: 160 }),
    ),
    new Frame(
      SKILL.HORIZONTAL_SLASH,
      12,
      12,
      [
        { x: 0, y: 0, width: 50, height: 20 },
        { x: 35, y: 35, width: 20, height: 50 },
      ],
      {
        source: '/skillEffect/Horizontal_Slash.png',
        width: 48,
        height: 48,
        row: 0,
        column: 2,
      },
      new Vector({ x: -100, y: 160 }),
    ),
    new Frame(
      SKILL.HORIZONTAL_SLASH,
      24,
      6,
      [{ x: 50, y: 80, width: 20, height: 20 }],
      {
        source: '/skillEffect/Horizontal_Slash.png',
        width: 48,
        height: 48,
        row: 0,
        column: 3,
      },
      new Vector({ x: -100, y: 160 }),
    ),
    new Frame(
      SKILL.HORIZONTAL_SLASH,
      30,
      6,
      [],
      {
        source: '/skillEffect/Horizontal_Slash.png',
        width: 48,
        height: 48,
        row: 0,
        column: 4,
      },
      new Vector({ x: -100, y: 160 }),
    ),
  ]);

  skillData.forEach((skillData) => {
    if (skillData instanceof RangeSkill) {
      skillData.setFrame(skillFrame[skillData.id]);
    }
  });
};
