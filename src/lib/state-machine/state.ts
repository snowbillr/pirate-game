import { IStateComponent } from "./i-state-component";
import { StateMachine } from "./state-machine";

export class State<T> {
  public static key: string;
  private components: IStateComponent<T>[];

  constructor(protected stateMachine: StateMachine<T>, componentClasses: any[]) {
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
