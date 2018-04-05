import { PlayerStateMachine } from "../player-state-machine";
import { Player } from "../player";
import { PlayerState } from "./player-state";
import { PlayerAttributes } from "../player-attributes";
import { Accelerates } from "./components/accelerates";
import { Decelerates } from "./components/decelerates";

export class JumpingState extends PlayerState {
  constructor(psm: PlayerStateMachine) {
    super('jumping', psm, [Accelerates, Decelerates])
  }

  onEnter(player: Player) {
    super.onEnter(player);

    player.sprite.body.velocity.y = -PlayerAttributes.jumpVelocity;
  }

  onUpdate(player: Player) {
    super.onUpdate(player);

    const jumpProgress = 1 - Math.abs(player.sprite.body.velocity.y / PlayerAttributes.jumpVelocity);
    const totalJumpFrames = 4;
    const currentFrame = Phaser.Math.Clamp(Phaser.Math.RoundTo(totalJumpFrames * jumpProgress), 0, totalJumpFrames);
    player.sprite.setTexture('player_jump', currentFrame);

    if (player.controls.attack.isDown) {
      return this.psm.transition(this.psm.states.attacking);
    }

    if (player.sprite.body.velocity.y >= 0) {
      return this.psm.transition(this.psm.states.falling);
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);
  }
}