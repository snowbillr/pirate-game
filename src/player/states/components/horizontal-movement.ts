import { Player } from "../../player";
import { PlayerAttributes } from "../../player-attributes";

export class HorizontalMovement {
  public direction: number = Phaser.NONE;

  onEnter(player: Player) {
    if (player.controls.left.isDown) {
      this.direction = Phaser.LEFT;

      player.sprite.flipX = true;
      player.sprite.body.velocity.x = -PlayerAttributes.horizontalMovementVelocity;
    } else if (player.controls.right.isDown) {
      this.direction = Phaser.RIGHT;

      player.sprite.flipX = false;
      player.sprite.body.velocity.x = PlayerAttributes.horizontalMovementVelocity;
    }
  }

  onUpdate(player: Player) {
    if (player.controls.left.isDown) {
      this.direction = Phaser.LEFT;

      player.sprite.flipX = true;
      player.sprite.body.velocity.x = -PlayerAttributes.horizontalMovementVelocity;
    } else if (player.controls.right.isDown) {
      this.direction = Phaser.RIGHT;

      player.sprite.flipX = false;
      player.sprite.body.velocity.x = PlayerAttributes.horizontalMovementVelocity;
    }

    if (this.direction === Phaser.LEFT && !player.controls.left.isDown ||
        this.direction === Phaser.RIGHT && !player.controls.right.isDown) {
      this.direction = Phaser.NONE;
      player.sprite.body.velocity.x = 0;
    }
  }

  onLeave() {
    this.direction = Phaser.NONE;
  }
}