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

  lifecycle(name: string, transitionFn, params?: any[]) {
    this.componentLifecycle(name);
    if (this[name]) {
      this[name].call(this, transitionFn, ...params);
    }
  }

  private componentLifecycle(name: string) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i][name]) {
        this.components[i][name](this.parent);
      }
    }
  }
}
