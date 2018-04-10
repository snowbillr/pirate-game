// import { PlayerStateMachine } from '../player-state-machine';
import { Player } from '../player';
// import { PlayerState } from './player-state';
import { Accelerates } from './components/accelerates';
import { Decelerates } from './components/decelerates';
import { PlayerAttributes } from '../player-attributes';
import { State } from '../../lib/state-machine/state';
import { StateMachine } from '../../lib/state-machine/state-machine';
import { PlayerStates } from './state-keys';

export class FallingState extends State<Player> {
  constructor(stateMachine: StateMachine<Player>) {
    super(PlayerStates.FALLING, stateMachine, [Accelerates, Decelerates]);
  }

  onEnter(player: Player) {
    super.onEnter(player);
  }

  onUpdate(player: Player) {
    super.onUpdate(player);

    const jumpProgress = Math.abs(player.sprite.body.velocity.y / PlayerAttributes.jumpVelocity);
    const totalJumpFrames = 4;
    const currentFrame = Phaser.Math.Clamp(totalJumpFrames - Phaser.Math.RoundTo(totalJumpFrames * jumpProgress), 0, totalJumpFrames);
    player.sprite.setTexture('player_jump', currentFrame);

    if (player.controls.attack.isDown) {
      return this.stateMachine.transition(PlayerStates.ATTACKING);
    }

    if (player.sprite.body.blocked.down) {
      if (player.sprite.body.velocity.x !== 0) {
        return this.stateMachine.transition(PlayerStates.WALKING);
      } else {
        return this.stateMachine.transition(PlayerStates.IDLE);
      }
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);
  }
}