import { registry } from '@engine/lib/main';
import Vector from '@engine/lib/vector';

export default class Animation {
  spriteSheet: HTMLImageElement;
  animationConfig: AnimationConfig;

  constructor(animationConfig: AnimationConfig) {
    this.spriteSheet = new Image();

    /**
     * @todo
     * unused variable initialize it with init() function
     */
    this.animationConfig = animationConfig;
  }

  // 비동기 초기화 메서드
  async init(src: string) {
    this.spriteSheet.src = src;
    await this.loadImage(this.spriteSheet);
  }

  // 이미지를 Promise로 로드하는 비동기 함수
  private loadImage(img: HTMLImageElement): Promise<void> {
    return new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (err) => reject(err);
    });
  }

  drawAnimation(
    state: CharactorState,
    frameNumber: number,
    dw: number,
    dh: number,
    rotation?: number,
    translation?: Vector,
  ) {
    // 이미지가 로드된 후 작업을 진행
    registry.engine.drawUtils.ctx.save();
    if (translation) registry.engine.drawUtils.ctx.translate(translation.x, translation.y);
    if (rotation) registry.engine.drawUtils.ctx.rotate(rotation);
    const sprite = this.animationConfig.frames[state][frameNumber];
    registry.engine.drawUtils.ctx.drawImage(
      this.spriteSheet,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
      0,
      0,
      dw,
      dh,
    );
    registry.engine.drawUtils.ctx.restore();
  }
}
