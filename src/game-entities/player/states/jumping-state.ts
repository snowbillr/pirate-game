import { Player } from "../player";
import { PlayerAttributes } from "../player-attributes";
import { Accelerates } from "./components/accelerates";
import { Decelerates } from "./components/decelerates";
import { PlayerStateKeys } from "../player-state-keys";
import { State } from "../../../lib/state-machine/state";
import { StateMachine } from "../../../lib/state-machine/state-machine";
import { FacesMovingDirection } from "../../states/components/faces-moving-direction";

export class JumpingState extends State<Player> {
  public static key: string = PlayerStateKeys.JUMPING;

  constructor(stateMachine: StateMachine<Player>) {
    super(stateMachine, [FacesMovingDirection, Accelerates, Decelerates])
  }

  onEnter(player: Player) {
    player.sprite.body.velocity.y = -PlayerAttributes.jumpVelocity;
  }

  onUpdate(player: Player) {
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

  onLeave() {}
}