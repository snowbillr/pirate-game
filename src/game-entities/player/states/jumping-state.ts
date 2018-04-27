import { Player } from "../player";
import { Accelerates } from "../../states/components/accelerates";
import { Decelerates } from "../../states/components/decelerates";
import { PlayerStateKeys } from "../player-state-keys";
import { State } from "../../../lib/state-machine/state";
import { StateMachine } from "../../../lib/state-machine/state-machine";
import { FacesMovingDirection } from "../../states/components/faces-moving-direction";
import { PlayerMovementAttributes } from "../player-movement-attributes";

export class JumpingState extends State<Player> {
  public static key: string = PlayerStateKeys.JUMPING;

  constructor(stateMachine: StateMachine<Player>) {
    super(stateMachine, [
      new FacesMovingDirection<Player>(),
      new Accelerates<Player>(),
      new Decelerates<Player>(),
    ]);
  }

  onEnter(player: Player) {
    player.sprite.body.velocity.y = -PlayerMovementAttributes.jumpVelocity;
  }

  onUpdate(player: Player) {
    const jumpProgress = 1 - Math.abs(player.sprite.body.velocity.y / PlayerMovementAttributes.jumpVelocity);
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