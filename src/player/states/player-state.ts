import { PlayerStateMachine } from "../player-state-machine";
import { Player } from "../player";

export abstract class PlayerState {
  public key: string;

  protected components: any = {};
  private componentKeys: string[];

  protected psm: PlayerStateMachine;

  constructor(key: string, psm: PlayerStateMachine, componentMap = {}) {
    this.key = key;
    this.psm = psm;

    this.componentKeys = Object.keys(componentMap);
    this.componentKeys.forEach(componentKey => {
      this.components[componentKey] = new componentMap[componentKey]();
    });
  }

  onEnter(player: Player) {
    this.callComponentLifecycle('onEnter', player);
  }

  onUpdate(player: Player) {
    this.callComponentLifecycle('onUpdate', player);
  }

  onLeave(player: Player) {
    this.callComponentLifecycle('onLeave', player);
  }

  private callComponentLifecycle(lifecycle, player) {
    for (let i = 0; i < this.componentKeys.length; i++) {
      this.components[this.componentKeys[i]][lifecycle](player);
    }
  }
}