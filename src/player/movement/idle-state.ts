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
    player.sprite.setVelocityX(0);
  }

  onUpdate(player: Player) {
    if (player.controls.left.isDown || player.controls.right.isDown) {
      this.fsm.transition(this.fsm.states.walking);
    }
  }
}