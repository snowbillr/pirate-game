import { PlayerStateMachine } from "../player-state-machine";
import { Player } from "../player";

export abstract class PlayerState {
  public key: string;

  protected psm: PlayerStateMachine;

  private components: any[];

  constructor(key: string, psm: PlayerStateMachine, componentClasses = []) {
    this.key = key;
    this.psm = psm;

    this.components = [];
    componentClasses.forEach(componentClass => {
      this.components.push(new componentClass());
    });
  }

  onEnter(player: Player) {
    this.callComponentLifecycleMethod('onEnter', player);
  }

  onUpdate(player: Player) {
    this.callComponentLifecycleMethod('onUpdate', player);
  }

  onLeave(player: Player) {
    this.callComponentLifecycleMethod('onLeave', player);
  }

  private callComponentLifecycleMethod(lifecycle, player) {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i][lifecycle](player);
    }
  }
}