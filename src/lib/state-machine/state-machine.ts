import { State } from "./state";

export class StateMachine<T> {
  private currentStateKey: string;
  private currentState: State<T>;
  private states: {};

  constructor(private parent: T, stateClasses: any[], initialStateKey: string) {
    this.states = stateClasses.reduce((states, stateClass) => {
      states[stateClass.key] = new stateClass(this);
      return states;
    }, {})

    this.currentStateKey = initialStateKey;
    this.currentState = this.states[initialStateKey];
    this.currentState.onEnter(this.parent);
  }

  update() {
    this.currentState.onUpdate(this.parent);
  }

  transition(toKey: string) {
    if (toKey === this.currentStateKey) {
      return;
    }

    this.currentState.onLeave(this.parent);

    this.currentState = this.states[toKey];
    this.currentStateKey = toKey;

    this.currentState.onEnter(this.parent);
  }

  getCurrentStateKey() {
    return this.currentStateKey;
  }
}
