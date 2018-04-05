import { Player } from "../../player";
import { PlayerAttributes } from "../../player-attributes";

export class Decelerates {
  private isDecelerating: boolean;

  onEnter(player: Player) {
    this.isDecelerating = !player.controls.left.isDown && !player.controls.right.isDown;
  }

  onUpdate(player: Player) {
    if (!this.isDecelerating && !player.controls.left.isDown && !player.controls.right.isDown) {
      this.isDecelerating = true;
      player.sprite.body.acceleration.x = player.sprite.body.acceleration.x * -1;
    }

    if (this.isDecelerating) {
      if (Phaser.Math.Within(player.sprite.body.velocity.x, 0, PlayerAttributes.horizontalSlowdownThreshold)) {
        player.sprite.body.acceleration.x = 0;
        player.sprite.body.velocity.x = 0;
        this.isDecelerating = false;
      }
    }
  }

  onLeave() {

  }
}