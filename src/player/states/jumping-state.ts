// import { PlayerStateMachine } from "../player-state-machine";
import { Player } from "../player";
// import { PlayerState } from "./player-state";
import { PlayerAttributes } from "../player-attributes";
import { Accelerates } from "./components/accelerates";
import { Decelerates } from "./components/decelerates";
import { State } from "../../lib/state-machine/state";
import { StateMachine } from "../../lib/state-machine/state-machine";
import { PlayerStateKeys } from "./state-keys";

export class JumpingState extends State<Player> {
  constructor(stateMachine: StateMachine<Player>) {
    super(PlayerStateKeys.JUMPING, stateMachine, [Accelerates, Decelerates])
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
      return this.stateMachine.transition(PlayerStateKeys.ATTACKING);
    }

    if (player.sprite.body.velocity.y >= 0) {
      return this.stateMachine.transition(PlayerStateKeys.FALLING);
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);
  }
}