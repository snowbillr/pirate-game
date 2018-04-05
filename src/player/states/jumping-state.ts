import { PlayerStateMachine } from "../player-state-machine";
import { Player } from "../player";
import { PlayerState } from "./player-state";
import { PlayerAttributes } from "../player-attributes";
import { Accelerates } from "./components/accelerates";
import { Decelerates } from "./components/decelerates";

export class JumpingState extends PlayerState {
  constructor(psm: PlayerStateMachine) {
    super('jumping', psm, { accelerates: Accelerates, decelerates: Decelerates })
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