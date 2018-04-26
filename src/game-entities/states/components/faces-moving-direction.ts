import { IStateComponent } from "../../../lib/state-machine/i-state-component";
import { Baddie } from "../../baddie/baddie";
import { IGameEntity } from "../../i-game-entity";

export class FacesMovingDirection implements IStateComponent<IGameEntity> {
  onEnter() {}

  onUpdate(parent: Baddie) {
    if (parent.sprite.body.velocity.x >= 0) {
      parent.sprite.flipX = false;
    } else {
      parent.sprite.flipX = true;
    }
  }

  onLeave() {}
}