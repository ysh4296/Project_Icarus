import RigidBody from "@engine/lib/rigidbody";
import JointConnection from "./jointConnection";

export default class Joint {
  jointConnection: JointConnection;
  objectA: RigidBody;
  objectB: RigidBody;
  anchorAId: number;
  anchorBId: number;

  constructor(jointConnection: JointConnection) {
    this.jointConnection = jointConnection;
    this.objectA = jointConnection.objectA;
    this.objectB = jointConnection.objectB;
    this.anchorAId = jointConnection.anchorAId;
    this.anchorBId = jointConnection.anchorBId;

    if (new.target === Joint) {
      throw new TypeError(
        "cannot construct abstract instance directly of class Joint"
      );
    }
  }

  getAnchorAPos() {
    return this.objectA.getShape().anchorPoints.get(this.anchorAId);
  }

  getAnchorBPos() {
    return this.objectB.getShape().anchorPoints.get(this.anchorBId);
  }

  updateConnectionA() {}

  updateConnectionB() {}

  draw() {
    this.jointConnection.draw();
  }
}
