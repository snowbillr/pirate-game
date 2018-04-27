import { IStateComponent } from "../../../lib/state-machine/i-state-component";
import { IGameEntity } from "../../i-game-entity";

export class FacesMovingDirection<T extends IGameEntity> implements IStateComponent<T> {
  onEnter() {}

  onUpdate(parent: T) {
    if (parent.sprite.body.velocity.x > 0) {
      parent.sprite.flipX = false;
    } else if (parent.sprite.body.velocity.x < 0) {
      parent.sprite.flipX = true;
    }
  }

  onLeave() {}
}