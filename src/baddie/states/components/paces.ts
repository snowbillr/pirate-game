import { IStateComponent } from "../../../lib/state-machine/i-state-component";
import { Baddie } from "../../baddie";

export class Paces implements IStateComponent<Baddie> {
  onEnter() {
  }

  onUpdate(parent: Baddie) {
    parent.controls.right.isDown = true;
  }

  onLeave() {
  }
}