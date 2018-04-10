import { IStateComponent } from "./i-state-component";
import { StateMachine } from "./state-machine";

export class State<T> {
  public key: string;
  private components: IStateComponent<T>[];

  constructor(key: string, protected stateMachine: StateMachine<T>, componentClasses: any[]) {
    this.key = key;

    this.components = componentClasses.map(componentClass => {
      return new componentClass();
    });
  }

  onEnter(parent: T) {
    this.callComponentLifecycleMethod('onEnter', parent);
  }

  onUpdate(parent: T) {
    this.callComponentLifecycleMethod('onUpdate', parent);
  }

  onLeave(parent: T) {
    this.callComponentLifecycleMethod('onLeave', parent);
  }

  private callComponentLifecycleMethod(lifecycle: string, parent: T) {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i][lifecycle](parent);
    }
  }
}
