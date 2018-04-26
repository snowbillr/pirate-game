import { PlayerAttributes } from "../../player-attributes";
import { IStateComponent } from "../../../../lib/state-machine/i-state-component";
import { IGameEntity } from "../../../i-game-entity";

export class Decelerates<T extends IGameEntity> implements IStateComponent<T> {
  private isDecelerating: boolean;

  onEnter(parent: T) {
    this.isDecelerating = !parent.controls.left.isDown && !parent.controls.right.isDown;
  }

  onUpdate(parent: T) {
    if (!this.isDecelerating && !parent.controls.left.isDown && !parent.controls.right.isDown) {
      this.isDecelerating = true;
      parent.sprite.body.acceleration.x = parent.sprite.body.acceleration.x * -1;
    }

    if (this.isDecelerating) {
      if (Phaser.Math.Within(parent.sprite.body.velocity.x, 0, PlayerAttributes.horizontalSlowdownThreshold)) {
        parent.sprite.body.acceleration.x = 0;
        parent.sprite.body.velocity.x = 0;
        this.isDecelerating = false;
      }
    }
  }

  onLeave() {

  }
}