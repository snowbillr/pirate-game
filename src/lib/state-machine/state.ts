import { IStateComponent } from "./i-state-component";
import { StateMachine } from "./state-machine";

export abstract class State<T> {
  public static key: string;
  protected stateMachine: StateMachine<T>;
  private components: IStateComponent<T>[];

  constructor(stateMachine: StateMachine<T>, components: IStateComponent<T>[]) {
    this.stateMachine = stateMachine;
    this.components = components;
  }

  lifecycleOnEnter(parent: T) {
    this.callComponentLifecycleMethod('onEnter', parent);
    this.onEnter(parent);
  }

  lifecycleOnUpdate(parent: T) {
    this.callComponentLifecycleMethod('onUpdate', parent);
    this.onUpdate(parent);
  }

  lifecycleOnLeave(parent: T) {
    this.callComponentLifecycleMethod('onLeave', parent);
    this.onLeave(parent);
  }

  abstract onEnter(parent: T);
  abstract onUpdate(parent: T);
  abstract onLeave(parent: T);

  private callComponentLifecycleMethod(lifecycle: string, parent: T) {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i][lifecycle](parent);
    }
  }
}
