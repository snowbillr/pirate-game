import { Player } from '../player';
import { IState} from './i-state';
import { PlayerStateMachine } from '../player-state-machine';
import { HorizontalMovement } from './components/horizontal-movement';

export class WalkingState implements IState{
  key: string;
  psm: PlayerStateMachine;

  private horizontalMovementComponent: HorizontalMovement;

  constructor(psm: PlayerStateMachine) {
    this.key = 'walking';
    this.psm = psm;

    this.horizontalMovementComponent = new HorizontalMovement();
  }

  onEnter(player: Player) {
    player.sprite.play('player_walk');

   this.horizontalMovementComponent.onEnter(player);
  }

  onUpdate(player: Player) {
    this.horizontalMovementComponent.onUpdate(player);

    if (player.controls.jump.isDown) {
      return this.psm.transition(this.psm.states.jumping);
    }

    if (!player.sprite.body.blocked.down) {
      return this.psm.transition(this.psm.states.falling);
    }

    if (this.horizontalMovementComponent.direction === Phaser.NONE) {
      return this.psm.transition(this.psm.states.idle);
    }
  }

  onLeave(player: Player) {
    player.sprite.anims.stop();

    this.horizontalMovementComponent.onLeave();
  }
}