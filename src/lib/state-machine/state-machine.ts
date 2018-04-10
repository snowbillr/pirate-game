import { State } from "./state";

export class StateMachine<T> {
  private currentState: State<T>;
  public states: {};

  constructor(private parent: T, states: {}, initialStateKey: string) {
    this.states = {};

    Object.keys(states).forEach(stateKey => {
      this.states[stateKey] = new states[stateKey](this);
    });

    this.currentState = this.states[initialStateKey];
    this.currentState.onEnter(this.parent);
  }

  update() {
    this.currentState.onUpdate(this.parent);
  }

  transition(toKey: string) {
    if (this.currentState.key == this.states[toKey]) {
      return;
    }

    this.currentState.onLeave(this.parent);
    this.currentState = this.states[toKey];
    this.currentState.onEnter(this.parent);
  }

  getCurrentStateKey() {
    return this.currentState.key;
  }
}
