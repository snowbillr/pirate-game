import { Baddie } from "../../baddie";
import { IStateComponent } from "../../../../lib/state-machine/i-state-component";

export class Paces implements IStateComponent<Baddie> {
  onEnter() {
  }

  onUpdate(parent: Baddie) {
    if (parent.sprite.x <= 500) {
      parent.controls.left.isDown = false;
      parent.controls.right.isDown = true;
    } else if (parent.sprite.x >= 800) {
      parent.controls.left.isDown = true;
      parent.controls.right.isDown = false;
    }
  }

  onLeave() {
  }
}