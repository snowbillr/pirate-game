import { Player } from '../player';
import { PlayerStateMachine } from '../player-state-machine';
import { PlayerState } from './player-state';
import { Decelerates } from './components/decelerates';

export class IdleState extends PlayerState {
  constructor(psm: PlayerStateMachine) {
    super('idle', psm, [Decelerates])
  }

  onEnter(player: Player) {
    super.onEnter(player);

    player.sprite.play('player_idle');
    player.sprite.body.velocity.x = 0;
  }

  onUpdate(player: Player) {
    super.onUpdate(player);

    if (player.controls.left.isDown || player.controls.right.isDown) {
      this.psm.transition(this.psm.states.walking);
    }

    if (player.controls.jump.isDown) {
      this.psm.transition(this.psm.states.jumping);
    }

    if (!player.sprite.body.blocked.down) {
      this.psm.transition(this.psm.states.falling);
    }
  }
}