import { State } from "./state";

export class StateMachine<T> {
  private currentStateKey: string;
  private currentState: State<T>;
  private states: {};

  constructor(states: State<T>[], initialStateKey: string) {
    this.states = states.reduce((statesMap, state) => {
      statesMap[state.key] = state;
      return statesMap;
    }, {});

    this.transition = this.transition.bind(this);

    this.currentStateKey = initialStateKey;
    this.currentState = this.states[initialStateKey];
    this.currentState.lifecycle('onEnter', this.transition);
  }

  update() {
    this.currentState.lifecycle('onUpdate', this.transition);
  }

  transition(toKey: string) {
    console.log(`transitioning to ${toKey}`);
    if (toKey === this.currentStateKey) {
      return;
    }

    this.currentState.lifecycle('onLeave', this.transition);

    this.currentState = this.states[toKey];
    this.currentStateKey = toKey;

    this.currentState.lifecycle('onEnter', this.transition);
  }

  getCurrentStateKey() {
    return this.currentStateKey;
  }
}
