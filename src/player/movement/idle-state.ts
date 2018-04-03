import { Player } from '../player';
import { IStateDefinition } from './i-state-definition';
import { IStateMachine } from './i-state-machine';

export class IdleState implements IStateDefinition {
  key: string;
  fsm: IStateMachine;

  constructor(fsm: IStateMachine) {
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

  onLeave() {

  }
}