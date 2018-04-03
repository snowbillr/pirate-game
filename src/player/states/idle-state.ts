import { Player } from '../player';
import { PlayerStateMachine } from '../player-state-machine';
import { PlayerState } from './player-state';

export class IdleState extends PlayerState {
  constructor(psm: PlayerStateMachine) {
    super('idle', psm)
  }

  onEnter(player: Player) {
    player.sprite.setFrame('adventurer_stand.png');
    player.sprite.body.velocity.x = 0;
  }

  onUpdate(player: Player) {
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

  onLeave() {}
}