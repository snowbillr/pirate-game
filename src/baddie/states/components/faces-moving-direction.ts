import { IStateComponent } from "../../../lib/state-machine/i-state-component";
import { Baddie } from "../../baddie";

export class FacesMovingDirection implements IStateComponent<Baddie> {
  onEnter() {

  }
  onUpdate(parent: Baddie) {
    if (parent.sprite.body.velocity.x >= 0) {
      parent.sprite.flipX = false;
    } else {
      parent.sprite.flipX = true;
    }
  }
  onLeave() {

  }
}