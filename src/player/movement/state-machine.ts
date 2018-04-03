import { Player } from '../player';
import { WalkingState } from './walking-state';
import { IdleState } from './idle-state';

import { IStateDefinition } from './i-state-definition';

export class StateMachine {
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
    this.callLifecycleMethod('onUpdate');
  }

  transition(to) {
    if (this.currentState.key == to.key) {
      return;
    }

    this.callLifecycleMethod('onLeave');
    this.currentState = to;
    this.callLifecycleMethod('onEnter');
  }

  private callLifecycleMethod(methodName) {
    this.currentState[methodName] && this.currentState[methodName](this.player);
  }
}
