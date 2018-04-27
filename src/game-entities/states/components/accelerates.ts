import { IStateComponent } from "../../../lib/state-machine/i-state-component";
import { IGameEntity } from "../../i-game-entity";
import { PlayerMovementAttributes } from "../../player/player-movement-attributes";

export class Accelerates<T extends IGameEntity> implements IStateComponent<T> {
  onEnter() {

  }

  onUpdate(parent: T) {
    if (parent.controls.left.isDown) {
      parent.sprite.body.acceleration.x = -PlayerMovementAttributes.horizontalAcceleration;

      if (parent.sprite.body.velocity.x > PlayerMovementAttributes.horizontalTurnaroundBoostThreshold) {
        parent.sprite.body.velocity.x -= PlayerMovementAttributes.horizontalTurnaroundBoost;
      }
    }

    if (parent.controls.right.isDown) {
      parent.sprite.body.acceleration.x = PlayerMovementAttributes.horizontalAcceleration;

      if (parent.sprite.body.velocity.x < -PlayerMovementAttributes.horizontalTurnaroundBoostThreshold) {
        parent.sprite.body.velocity.x += PlayerMovementAttributes.horizontalTurnaroundBoost;
      }
    }
  }

  onLeave() {

  }
}