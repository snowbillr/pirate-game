import { Player } from '../player';
import { PlayerStateMachine } from '../player-state-machine';
import { HorizontalMovement } from './components/horizontal-movement';
import { PlayerState } from './player-state';

export class WalkingState extends PlayerState {

  constructor(psm: PlayerStateMachine) {
    super('walking', psm, { horizontalMovement: HorizontalMovement })
  }

  onEnter(player: Player) {
    super.onEnter(player);

    player.sprite.play('player_walk');
  }

  onUpdate(player: Player) {
    super.onUpdate(player);

    if (player.controls.jump.isDown) {
      return this.psm.transition(this.psm.states.jumping);
    }

    if (!player.sprite.body.blocked.down) {
      return this.psm.transition(this.psm.states.falling);
    }

    if (player.sprite.body.velocity.x === 0) {
      return this.psm.transition(this.psm.states.idle);
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);

    player.sprite.anims.stop();
  }
}