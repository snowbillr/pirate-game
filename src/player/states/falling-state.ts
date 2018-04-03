import { IState } from './i-state';
import { PlayerStateMachine } from '../player-state-machine';
import { Player } from '../player';
import { HorizontalMovement } from './components/horizontal-movement';

export class FallingState implements IState {
  key: string;
  psm: PlayerStateMachine;

  private horizontalMovementComponent: HorizontalMovement;

  constructor(psm: PlayerStateMachine) {
    this.key = 'falling';
    this.psm = psm;

    this.horizontalMovementComponent = new HorizontalMovement();
  }

  onEnter(player: Player) {
    this.horizontalMovementComponent.onEnter(player);

    player.sprite.setFrame('adventurer_fall.png');
  }

  onUpdate(player: Player) {
   this.horizontalMovementComponent.onUpdate(player);

    if (player.sprite.body.blocked.down) {
      if (this.horizontalMovementComponent.direction === Phaser.LEFT || this.horizontalMovementComponent.direction === Phaser.RIGHT) {
        this.psm.transition(this.psm.states.walking);
      } else {
        this.psm.transition(this.psm.states.idle);
      }
    }
  }

  onLeave() {
    this.horizontalMovementComponent.onLeave();
  }
}