import { CHARACTOR } from '@engine/lib/enum/charactor';
import { SKILL } from '@engine/lib/enum/skill';
import Sprite from '@engine/utils/sprite';

export const spriteData: Partial<Record<CHARACTOR, Sprite>> = {};

export const skillSpriteData: Partial<Record<SKILL, Sprite>> = {};

const spriteSourcePath: Record<CHARACTOR, string> = {
  [CHARACTOR.GNOME_MAGE]: '/Basic_Asset_Pack/Basic_Humanoid_Sprites/Basic Humanoid Sprites 4x.png',
};

const skillSpriteSourcePath: Record<SKILL, string> = {
  [SKILL.HORIZONTAL_SLASH]: '/skillEffect/Horizontal_Slash.png',
};

export const initSpriteData = () => {
  Object.entries(spriteSourcePath).forEach(([key, value]) => {
    const sprite = new Sprite();
    sprite.init(value);
    spriteData[key as unknown as CHARACTOR] = sprite;
  });
  Object.entries(skillSpriteSourcePath).forEach(([key, value]) => {
    const sprite = new Sprite();
    sprite.init(value);
    skillSpriteData[key as unknown as SKILL] = sprite;
  });
};
