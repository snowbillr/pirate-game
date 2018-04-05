import { Player } from "../../player";
import { PlayerAttributes } from "../../player-attributes";

export class Accelerates {
  // constructor(player: Player) {
    // player.sprite.body.maxVelocity.x = PlayerAttributes.maxHorizontalVelocity;
  // }

  onEnter() {

  }

  onUpdate(player: Player) {
    if (player.controls.left.isDown) {
      player.sprite.flipX = true;
      player.sprite.body.acceleration.x = -PlayerAttributes.horizontalAcceleration;

      if (player.sprite.body.velocity.x > PlayerAttributes.horizontalTurnaroundBoostThreshold) {
        player.sprite.body.velocity.x -= PlayerAttributes.horizontalTurnaroundBoost;
      }
    }

    if (player.controls.right.isDown) {
      player.sprite.flipX = false;
      player.sprite.body.acceleration.x = PlayerAttributes.horizontalAcceleration;

      if (player.sprite.body.velocity.x < -PlayerAttributes.horizontalTurnaroundBoostThreshold) {
        player.sprite.body.velocity.x += PlayerAttributes.horizontalTurnaroundBoost;
      }
    }
  }

  onLeave() {

  }
}