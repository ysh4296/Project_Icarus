import { registry } from '@engine/lib/main';
import Vector from '@engine/lib/vector';

export default class Sprite {
  spriteSheet: HTMLImageElement;
  constructor() {
    this.spriteSheet = new Image();
  }

  // 비동기 초기화 메서드
  async init(
    src: string = '/Basic_Asset_Pack/Basic_Humanoid_Sprites/Basic Humanoid Sprites 4x.png',
  ) {
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

  drawSprite(rotation?: number, translation?: Vector) {
    // 이미지가 로드된 후 작업을 진행
    const spriteWidth = 72; // 스프라이트의 너비
    const spriteHeight = 72; // 스프라이트의 높이
    const spriteIndex = 8;
    const columns = 5; // 스프라이트 시트의 열 수

    const col = spriteIndex % columns;
    const row = Math.floor(spriteIndex / columns);

    const sx = col * spriteWidth;
    const sy = row * spriteHeight;
    registry.engine.drawUtils.ctx.save();
    if (translation) registry.engine.drawUtils.ctx.translate(translation.x, translation.y);
    if (rotation) registry.engine.drawUtils.ctx.rotate(rotation);

    registry.engine.drawUtils.ctx.drawImage(
      this.spriteSheet,
      sx,
      sy,
      spriteWidth,
      spriteHeight,
      0,
      0,
      50,
      50,
    );

    registry.engine.drawUtils.ctx.restore();
  }
}