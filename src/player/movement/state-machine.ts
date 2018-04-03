import { Player } from '../player';
import { WalkingState } from './states/walking-state';
import { IdleState } from './states/idle-state';

import { IState} from './i-state';
import { FallingState } from './states/falling-state';
import { JumpingState } from './states/jumping-state';

export class StateMachine {
  private player: Player;
  public states;
  private currentState: IState;

  constructor(player, initialStateKey) {
    this.player = player;
    this.states = {
      idle: new IdleState(this),
      walking: new WalkingState(this),
      falling: new FallingState(this),
      jumping: new JumpingState(this),
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
