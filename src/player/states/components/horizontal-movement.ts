import { Player } from "../../player";

export class HorizontalMovement {
  public direction: number = Phaser.NONE;

  onEnter(player: Player) {
    if (player.controls.left.isDown) {
      this.direction = Phaser.LEFT;

      player.sprite.flipX = true;
      player.sprite.body.velocity.x = -300;
    } else if (player.controls.right.isDown) {
      this.direction = Phaser.RIGHT;

      player.sprite.flipX = false;
      player.sprite.body.velocity.x = 300;
    }
  }

  onUpdate(player: Player) {
    if (player.controls.left.isDown) {
      this.direction = Phaser.LEFT;

      player.sprite.flipX = true;
      player.sprite.body.velocity.x = -300;
    } else if (player.controls.right.isDown) {
      this.direction = Phaser.RIGHT;

      player.sprite.flipX = false;
      player.sprite.body.velocity.x = 300;
    }
  }

  onLeave() {
    this.direction = Phaser.NONE;
  }
}