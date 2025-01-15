import Charactor from '@engine/lib/game/charactor';
import { registry } from '@engine/lib/main';
import RigidBody from '@engine/lib/rigidbody/rigidbody';
import Vector, { addVector, rotateVector, subVector } from '@engine/lib/vector';

// load image await https://stackoverflow.com/questions/46399223/async-await-in-image-loading

/**
 * @todo
 * 필요한만큼 sprite 선언 가능하도록 변경
 */

export default class Sprite {
  spriteSheet: HTMLImageElement;
  constructor() {
    this.spriteSheet = new Image();
  }

  // 비동기 초기화 메서드
  async init(src: string) {
    this.spriteSheet.src = src;
  }

  drawSprite(object: RigidBody, spriteConfiguration: spriteConfiguration) {
    // 이미지가 로드된 후 작업을 진행
    const spriteWidth = spriteConfiguration.width; // 스프라이트의 너비
    const spriteHeight = spriteConfiguration.height; // 스프라이트의 높이

    const col = spriteConfiguration.column;
    const row = spriteConfiguration.row;

    let rotation: number = 0;

    if (object.velocity.length() > 10) {
      rotation = registry.engine.calculatorUtils.getAngleBetweenVectors(
        new Vector({ x: 0, y: 1 }),
        object.velocity,
      );
    }
    const translation = subVector(
      object.shape.centroid,
      rotateVector(new Vector({ x: 25, y: 25 }), rotation),
    );

    const sx = col * spriteWidth;
    const sy = row * spriteHeight;
    registry.engine.drawUtils.ctx.save();
    registry.engine.drawUtils.ctx.translate(translation.x, translation.y);
    registry.engine.drawUtils.ctx.rotate(rotation);

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

  /**
   * draw skill from user position
   * @param user who uses this skill
   * @param spriteConfiguration spriteConfiguration for skill
   * @param target direction for target
   * @param drawOffset move offset for skill point
   */
  skillDraw(
    user: Charactor,
    spriteConfiguration: spriteConfiguration,
    target: Vector,
    drawOffset: Vector,
  ) {
    // 이미지가 로드된 후 작업을 진행
    const spriteWidth = spriteConfiguration.width; // 스프라이트의 너비
    const spriteHeight = spriteConfiguration.height; // 스프라이트의 높이

    const col = spriteConfiguration.column;
    const row = spriteConfiguration.row;

    const newAngle = registry.engine.calculatorUtils.getAngleBetweenVectors(
      new Vector({ x: 0, y: 1 }),
      target,
    );

    let rotation = newAngle;
    let translation = new Vector({ x: 0, y: 0 });

    rotation += user.object.shape.orientation - Math.PI / 2;

    translation = addVector(
      subVector(user.object.shape.centroid, target),
      rotateVector(drawOffset, newAngle),
    );

    registry.engine.drawUtils.ctx.save();
    registry.engine.drawUtils.ctx.translate(
      user.object.shape.centroid.x,
      user.object.shape.centroid.y,
    );

    // skillEffectComponent.shape.draw();
    registry.engine.drawUtils.ctx.restore();

    // if (object.velocity.length() > 10) {
    //   rotation = registry.engine.calculatorUtils.getAngleBetweenVectors(
    //     new Vector({ x: 0, y: 1 }),
    //     object.velocity,
    //   );
    // }
    const sx = col * spriteWidth;
    const sy = row * spriteHeight;
    registry.engine.drawUtils.ctx.save();

    registry.engine.drawUtils.ctx.translate(translation.x, translation.y);

    registry.engine.drawUtils.ctx.rotate(rotation);
    // registry.engine.drawUtils.ctx.strokeRect(0, 0, 200, 200);
    registry.engine.drawUtils.ctx.drawImage(
      this.spriteSheet,
      sx,
      sy,
      spriteWidth,
      spriteHeight,
      0,
      0,
      200,
      200,
    );

    registry.engine.drawUtils.ctx.restore();
  }
}
