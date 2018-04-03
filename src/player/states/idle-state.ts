import { Player } from '../player';
import { IState} from './i-state';
import { PlayerStateMachine } from '../player-state-machine';

export class IdleState implements IState{
  key: string;
  psm: PlayerStateMachine;

  constructor(psm: PlayerStateMachine) {
    this.key = 'idle';
    this.psm = psm;
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

    if (player.sprite.body.velocity.y > 0) {
      this.psm.transition(this.psm.states.falling);
    }
  }

  onLeave() {}
}