import { IState } from "./i-state";
import { PlayerStateMachine } from "../player-state-machine";
import { Player } from "../player";
import { HorizontalMovement } from "./components/horizontal-movement";

export class JumpingState implements IState {
  key: string;
  psm: PlayerStateMachine;

  private horizontalMovementComponent: HorizontalMovement;

  constructor(psm: PlayerStateMachine) {
    this.key = 'jumping';
    this.psm = psm;

    this.horizontalMovementComponent = new HorizontalMovement();
  }

  onEnter(player: Player) {
    player.sprite.setFrame('adventurer_jump.png');
    player.sprite.body.velocity.y = -600;

    this.horizontalMovementComponent.onEnter(player);
  }

  onUpdate(player: Player) {
   this.horizontalMovementComponent.onUpdate(player);

    if (player.sprite.body.velocity.y >= 0) {
      this.psm.transition(this.psm.states.falling);
    }
  }

  onLeave() {
    this.horizontalMovementComponent.onLeave();
  }
}