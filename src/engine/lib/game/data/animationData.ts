import { ANIMATION } from '@engine/lib/enum/animation';
import Animation from '@engine/utils/animation';

export const animationData: Partial<Record<ANIMATION, Animation>> = {};

const animationSourcePath: Record<ANIMATION, string> = {
  [ANIMATION.FIREBALL]: '/animation/Fireball.png',
  [ANIMATION.GOBLIN_FIGHTER]: '/animation/GoblinFighter.png',
  [ANIMATION.GOBLIN_OCULTIST]: '/animation/GoblinOccultist.png',
};

const animationConfigs: Record<ANIMATION, AnimationConfig> = {
  [ANIMATION.FIREBALL]: {
    graphic: 'Fireball',
    frames: {
      idle: [
        {
          x: 0,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 16,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 32,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 48,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 64,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 80,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 96,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 112,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
      ],
      damage: [
        {
          x: 128,
          y: 0,
          width: 64,
          height: 64,
          frameRate: 5,
        },
      ],
      skill: [],
    },
  },
  [ANIMATION.GOBLIN_FIGHTER]: {
    graphic: 'GoblinFighter',
    frames: {
      idle: [
        {
          x: 0,
          y: 0,
          width: 15,
          height: 15,
          frameRate: 10,
        },
        {
          x: 16,
          y: 0,
          width: 15,
          height: 15,
          frameRate: 10,
        },
        {
          x: 32,
          y: 0,
          width: 15,
          height: 15,
          frameRate: 10,
        },
        {
          x: 48,
          y: 0,
          width: 15,
          height: 15,
          frameRate: 10,
        },
      ],
      damage: [
        {
          x: 128,
          y: 0,
          width: 64,
          height: 64,
          frameRate: 5,
        },
      ],
      skill: [],
    },
  },
  [ANIMATION.GOBLIN_OCULTIST]: {
    graphic: 'GoblinOcultist',
    frames: {
      idle: [
        {
          x: 0,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 16,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 32,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
        {
          x: 48,
          y: 0,
          width: 16,
          height: 16,
          frameRate: 10,
        },
      ],
      damage: [
        {
          x: 128,
          y: 0,
          width: 64,
          height: 64,
          frameRate: 5,
        },
      ],
      skill: [],
    },
  },
};

export const initAnimationData = () => {
  Object.entries(animationSourcePath).forEach(([key, value]) => {
    const animation = new Animation(animationConfigs[key as unknown as ANIMATION]);
    animation.init(value);
    animationData[key as unknown as ANIMATION] = animation;
  });
};
