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
    if (player.controls.jump.isDown) {
      return this.psm.transition(this.psm.states.jumping);
    }

    if (player.sprite.body.velocity.y > 0) {
      return this.psm.transition(this.psm.states.falling);
    }

    if (this.horizontalMovementComponent.direction === Phaser.LEFT && !player.controls.left.isDown) {
      return this.psm.transition(this.psm.states.idle);
    }
    if (this.horizontalMovementComponent.direction === Phaser.RIGHT && !player.controls.right.isDown) {
      return this.psm.transition(this.psm.states.idle);
    }

    this.horizontalMovementComponent.onUpdate(player);
  }

  onLeave(player: Player) {
    player.sprite.anims.stop();

    this.horizontalMovementComponent.onLeave();
  }
}