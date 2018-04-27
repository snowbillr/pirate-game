import { IStateComponent } from "../../../lib/state-machine/i-state-component";
import { IGameEntity } from "../../i-game-entity";
import { IGameEntityMovementAttributes } from "../../i-game-entity-attributes";

export class Accelerates<T extends IGameEntity> implements IStateComponent<T> {
  private movementAttributes: IGameEntityMovementAttributes;

  constructor(movementAttributes: IGameEntityMovementAttributes) {
    this.movementAttributes = movementAttributes;
  }

  onEnter() {

  }

  onUpdate(parent: T) {
    if (parent.controls.left.isDown) {
      parent.sprite.body.acceleration.x = -this.movementAttributes.horizontalAcceleration;

      if (parent.sprite.body.velocity.x > this.movementAttributes.horizontalTurnaroundBoostThreshold) {
        parent.sprite.body.velocity.x -= this.movementAttributes.horizontalTurnaroundBoost;
      }
    }

    if (parent.controls.right.isDown) {
      parent.sprite.body.acceleration.x = this.movementAttributes.horizontalAcceleration;

      if (parent.sprite.body.velocity.x < -this.movementAttributes.horizontalTurnaroundBoostThreshold) {
        parent.sprite.body.velocity.x += this.movementAttributes.horizontalTurnaroundBoost;
      }
    }
  }

  onLeave() {

  }
}