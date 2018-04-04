import { Player } from "../../player";
import { PlayerAttributes } from "../../player-attributes";

export class HorizontalMovement {
  public direction: number = Phaser.NONE;

  onEnter(player: Player) {
    if (player.controls.left.isDown) {
      this.startMovingLeft(player);
    } else if (player.controls.right.isDown) {
      this.startMovingRight(player);
    }
  }

  onUpdate(player: Player) {
    if (player.controls.left.isDown && this.direction !== Phaser.LEFT) {
      this.startMovingLeft(player);
    } else if (player.controls.right.isDown && this.direction !== Phaser.RIGHT) {
      this.startMovingRight(player);
    }

    if (this.direction === Phaser.LEFT && !player.controls.left.isDown ||
        this.direction === Phaser.RIGHT && !player.controls.right.isDown) {
      this.startSlowingDown(player);
    }

    if (this.direction === Phaser.NONE) {
      if (Phaser.Math.Within(player.sprite.body.velocity.x, 0, PlayerAttributes.horizontalSlowdownThreshold)) {
        player.sprite.body.acceleration.x = 0;
        player.sprite.body.velocity.x = 0;
      }
    }
  }

  onLeave() {
    this.direction = Phaser.NONE;
  }

  private startMovingLeft(player: Player) {
    this.direction = Phaser.LEFT;

    player.sprite.flipX = true;
    player.sprite.body.acceleration.x = -PlayerAttributes.horizontalAcceleration;

    if (player.sprite.body.velocity.x > PlayerAttributes.horizontalTurnaroundBoostThreshold) {
      player.sprite.body.velocity.x -= PlayerAttributes.horizontalTurnaroundBoost;
    }
  }

  private startMovingRight(player: Player) {
    this.direction = Phaser.RIGHT;

    player.sprite.flipX = false;
    player.sprite.body.acceleration.x = PlayerAttributes.horizontalAcceleration;

    if (player.sprite.body.velocity.x < -PlayerAttributes.horizontalTurnaroundBoostThreshold) {
      player.sprite.body.velocity.x += PlayerAttributes.horizontalTurnaroundBoost;
    }
  }

  private startSlowingDown(player: Player) {
    this.direction = Phaser.NONE;

    player.sprite.body.acceleration.x *= -PlayerAttributes.horizontalSlowdownMultiplier;
  }
}