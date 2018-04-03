import { Player } from '../player';
import { WalkingState } from './walking-state';
import { IdleState } from './idle-state';

import { IStateMachine } from './i-state-machine';
import { IStateDefinition } from './i-state-definition';

export class StateMachine implements IStateMachine {
  private player: Player;
  public states;
  private currentState: IStateDefinition;

  constructor(player, initialStateKey) {
    this.player = player;
    this.states = {
      idle: new IdleState(this),
      walking: new WalkingState(this),
    }
    this.currentState = this.states[initialStateKey];
  }

  update() {
    this.currentState.onUpdate(this.player);
  }

  transition(to) {
    if (this.currentState.key == to.key) {
      return;
    }

    this.currentState.onLeave(this.player);
    this.currentState = to;
    this.currentState.onEnter(this.player);
  }
}
