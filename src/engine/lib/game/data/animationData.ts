import { ANIMATION } from '@engine/lib/enum/animation';
import Animation from '@engine/utils/animation';

export const animationData: Partial<Record<ANIMATION, Animation>> = {};

const animationSourcePath: Record<ANIMATION, string> = {
  [ANIMATION.FIREBALL]: '/animation/Fireball.png',
};

export const initAnimationData = () => {
  Object.entries(animationSourcePath).forEach(([key, value]) => {
    const animation = new Animation();
    animation.init(value);
    animationData[key as unknown as ANIMATION] = animation;
  });
};
