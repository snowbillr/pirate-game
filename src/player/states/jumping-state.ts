import { PlayerStateMachine } from "../player-state-machine";
import { Player } from "../player";
import { HorizontalMovement } from "./components/horizontal-movement";
import { PlayerState } from "./player-state";
import { PlayerAttributes } from "../player-attributes";

export class JumpingState extends PlayerState {
  constructor(psm: PlayerStateMachine) {
    super('jumping', psm, { horizontalMovement: HorizontalMovement })
  }

  onEnter(player: Player) {
    super.onEnter(player);

    player.sprite.setFrame('adventurer_jump.png');
    player.sprite.body.velocity.y = -PlayerAttributes.jumpVelocity;
  }

  onUpdate(player: Player) {
   super.onUpdate(player);

    if (player.sprite.body.velocity.y >= 0) {
      this.psm.transition(this.psm.states.falling);
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);
  }
}