import { PlayerStateMachine } from '../player-state-machine';
import { Player } from '../player';
import { PlayerState } from './player-state';
import { Accelerates } from './components/accelerates';
import { Decelerates } from './components/decelerates';
import { PlayerAttributes } from '../player-attributes';

export class FallingState extends PlayerState {
  constructor(psm: PlayerStateMachine) {
    super('falling', psm, [Accelerates, Decelerates]);
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


    if (player.sprite.body.blocked.down) {
      if (player.sprite.body.velocity.x !== 0) {
        this.psm.transition(this.psm.states.walking);
      } else {
        this.psm.transition(this.psm.states.idle);
      }
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);
  }
}