import { IStateComponent } from "./i-state-component";
import { IState } from "./i-state";

export abstract class State<T> implements IState {
  public key: string;
  protected parent: T;
  private components: IStateComponent<T>[];

  constructor(parent: T, components: IStateComponent<T>[]) {
    this.parent = parent;
    this.components = components;
  }

  lifecycle(name, transitionFn) {
    this.callComponentLifecycleMethod(name);
    if (this[name]) {
      this[name].call(this, transitionFn);
    }
  }

  private callComponentLifecycleMethod(lifecycle: string) {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i][lifecycle](this.parent);
    }
  }
}
