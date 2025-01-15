import RigidBody from '@rigidbody/rigidbody';
import Vector from '@engine/lib/vector';
import Calculator from '@engine/utils/calculator';
import Draw from '@engine/utils/draw';

export default class Grid {
  world: Vector;
  cellSize: number;
  cells: RigidBody[][];
  cellCntX: number;
  cellCntY: number;
  drawUtils: Draw;
  calculatorUtils: Calculator;

  /**
   * @description
   * to make pillball like gameboard i did some hard coded implementation
   */

  constructor(cellSize: number) {
    this.world = new Vector({ x: 0, y: 0 });
    this.cellSize = cellSize;
    this.cells = [];
    this.cellCntX = 0;
    this.cellCntY = 0;
    this.drawUtils = Draw.getInstance();
    this.calculatorUtils = Calculator.getInstance();
  }

  initialize(world: Vector) {
    this.world = world;
    this.cellCntX = parseInt(String(this.world.x / this.cellSize));
    this.cellCntY = parseInt(String(this.world.y / this.cellSize));
    if (this.cellSize * this.cellCntX < this.world.x) {
      this.cellCntX++;
    }
    if (this.cellSize * this.cellCntY < this.world.y) {
      this.cellCntY++;
    }

    for (let i = 0; i < this.cellCntX * this.cellCntY; i++) {
      this.cells[i] = [];
    }

    // console.log(this.cells.length + " cells initiated");
  }

  getContentOfCell(id: number) {
    return this.cells[id];
  }

  getCellIdFromPosition(pos: Vector) {
    let y = parseInt(String(pos.y / this.cellSize));
    /**
     * @description
     * 홀수/짝수 행에 따라 X축 보정
     */
    let offsetX = y % 2 === 0 ? -this.cellSize / 2 : 0;
    let x = parseInt(String((pos.x - offsetX) / this.cellSize));
    return x + y * this.cellCntX;
  }

  cellIdToCenteroid(cellId: number) {
    return new Vector({
      x:
        this.cellSize * ((cellId % this.cellCntX) + 0.5) +
        (((cellId / this.cellCntX) | 0) % 2 === 0 ? -this.cellSize / 2 : 0),
      y: this.cellSize * (((cellId / this.cellCntX) | 0) + 0.5),
    });
  }

  draw() {
    for (let i = 0; i < this.cellCntX; i++) {
      for (let j = 0; j < this.cellCntY; j++) {
        let position = new Vector({
          x: (i + 0.5) * this.cellSize + (j % 2 === 0 ? -this.cellSize / 2 : 0),
          y: (j + 0.5) * this.cellSize,
        });

        this.drawUtils.drawRect(
          position,
          new Vector({ x: this.cellSize - 5, y: this.cellSize - 5 }),
          'grey',
        );
      }
    }
  }
}
