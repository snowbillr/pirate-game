import { PlayerAttributes } from "../../player-attributes";
import { IStateComponent } from "../../../../lib/state-machine/i-state-component";
import { IGameEntity } from "../../../i-game-entity";

export class Accelerates<T extends IGameEntity> implements IStateComponent<T> {
  onEnter() {

  }

  onUpdate(parent: T) {
    if (parent.controls.left.isDown) {
      parent.sprite.body.acceleration.x = -PlayerAttributes.horizontalAcceleration;

      if (parent.sprite.body.velocity.x > PlayerAttributes.horizontalTurnaroundBoostThreshold) {
        parent.sprite.body.velocity.x -= PlayerAttributes.horizontalTurnaroundBoost;
      }
    }

    if (parent.controls.right.isDown) {
      parent.sprite.body.acceleration.x = PlayerAttributes.horizontalAcceleration;

      if (parent.sprite.body.velocity.x < -PlayerAttributes.horizontalTurnaroundBoostThreshold) {
        parent.sprite.body.velocity.x += PlayerAttributes.horizontalTurnaroundBoost;
      }
    }
  }

  onLeave() {

  }
}