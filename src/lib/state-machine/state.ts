import { IStateComponent } from "./i-state-component";

export abstract class State<T> {
  public key: string;
  protected parent: T;
  private components: IStateComponent<T>[];

  onEnter(transition?: (toKey: string) => void): void { transition; }
  onUpdate(transition?: (toKey: string) => void): void { transition; }
  onLeave(transition?: (toKey: string) => void): void { transition; }

  constructor(parent: T, components: IStateComponent<T>[]) {
    this.parent = parent;
    this.components = components;
  }

  lifecycleOnEnter(transition) {
    this.callComponentLifecycleMethod('onEnter');
    this.onEnter(transition);
  }

  lifecycleOnUpdate(transition) {
    this.callComponentLifecycleMethod('onUpdate');
    this.onUpdate(transition);
  }

  lifecycleOnLeave(transition) {
    this.callComponentLifecycleMethod('onLeave');
    this.onLeave(transition);
  }

  private callComponentLifecycleMethod(lifecycle: string) {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i][lifecycle](this.parent);
    }
  }
}
