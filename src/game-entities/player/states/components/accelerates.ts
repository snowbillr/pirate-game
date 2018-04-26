import { Player } from "../../player";
import { PlayerAttributes } from "../../player-attributes";
import { IStateComponent } from "../../../../lib/state-machine/i-state-component";

export class Accelerates implements IStateComponent<Player> {
  onEnter() {

  }

  onUpdate(player: Player) {
    if (player.controls.left.isDown) {
      player.sprite.body.acceleration.x = -PlayerAttributes.horizontalAcceleration;

      if (player.sprite.body.velocity.x > PlayerAttributes.horizontalTurnaroundBoostThreshold) {
        player.sprite.body.velocity.x -= PlayerAttributes.horizontalTurnaroundBoost;
      }
    }

    if (player.controls.right.isDown) {
      player.sprite.body.acceleration.x = PlayerAttributes.horizontalAcceleration;

      if (player.sprite.body.velocity.x < -PlayerAttributes.horizontalTurnaroundBoostThreshold) {
        player.sprite.body.velocity.x += PlayerAttributes.horizontalTurnaroundBoost;
      }
    }
  }

  onLeave() {

  }
}