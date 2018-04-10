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
    this.currentState.lifecycleOnEnter(this.parent);
  }

  update() {
    this.currentState.lifecycleOnUpdate(this.parent);
  }

  transition(toKey: string) {
    if (toKey === this.currentStateKey) {
      return;
    }

    this.currentState.lifecycleOnLeave(this.parent);

    this.currentState = this.states[toKey];
    this.currentStateKey = toKey;

    this.currentState.lifecycleOnEnter(this.parent);
  }

  getCurrentStateKey() {
    return this.currentStateKey;
  }
}
