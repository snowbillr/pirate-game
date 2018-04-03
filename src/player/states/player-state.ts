import { PlayerStateMachine } from "../player-state-machine";
import { Player } from "../player";

export abstract class PlayerState {
  protected components: any = {};

  constructor(public key: string, protected psm: PlayerStateMachine, componentMap = {}) {
    Object.keys(componentMap).forEach(componentKey => {
      this.components[componentKey] = new componentMap[componentKey]();
    })
  }

  onEnter(player: Player) {
    Object.keys(this.components).forEach(componentKey => {
      this.components[componentKey].onEnter(player);
    });
  }

  onUpdate(player: Player) {
    Object.keys(this.components).forEach(componentKey => {
      this.components[componentKey].onUpdate(player);
    });
  }

  onLeave(player: Player) {
    Object.keys(this.components).forEach(componentKey => {
      this.components[componentKey].onLeave(player);
    });
  }
}