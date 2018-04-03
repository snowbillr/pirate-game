import { Player } from '../player';
import { IState} from './i-state';
import { StateMachine } from './state-machine';

export class IdleState implements IState{
  key: string;
  fsm: StateMachine;

  constructor(fsm: StateMachine) {
    this.key = 'idle';
    this.fsm = fsm;
  }

  onEnter(player: Player) {
    player.sprite.setFrame('adventurer_stand.png');
  }

  onUpdate(player: Player) {
    if (player.controls.left.isDown || player.controls.right.isDown) {
      this.fsm.transition(this.fsm.states.walking);
    }

    if (player.sprite.body.velocity.y > 0) {
      this.fsm.transition(this.fsm.states.falling);
    }
  }

  onLeave() {}
}