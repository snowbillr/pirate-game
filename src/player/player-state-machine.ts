import { Player } from './player';
import { WalkingState } from './states/walking-state';
import { IdleState } from './states/idle-state';

import { FallingState } from './states/falling-state';
import { JumpingState } from './states/jumping-state';
import { PlayerState } from './states/player-state';
import { AttackingState } from './states/attacking-state';

export class PlayerStateMachine {
  private player: Player;
  public states;
  private currentState: PlayerState;

  constructor(player, initialStateKey) {
    this.player = player;
    this.states = {
      idle: new IdleState(this),
      walking: new WalkingState(this),
      falling: new FallingState(this),
      jumping: new JumpingState(this),
      attacking: new AttackingState(this),
    }
    this.currentState = this.states[initialStateKey];
  }

  update() {
    this.currentState.onUpdate(this.player);
  }

  transition(to: PlayerState) {
    if (this.currentState.key == to.key) {
      return;
    }

    this.currentState.onLeave(this.player);
    this.currentState = to;
    this.currentState.onEnter(this.player);
  }

  getCurrentStateKey() {
    return this.currentState.key;
  }
}
