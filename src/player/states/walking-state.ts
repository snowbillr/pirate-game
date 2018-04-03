import { Player } from '../player';
import { IState} from './i-state';
import { PlayerStateMachine } from '../player-state-machine';

export class WalkingState implements IState{
  key: string;
  psm: PlayerStateMachine;

  direction: number;

  constructor(psm: PlayerStateMachine) {
    this.key = 'walking';
    this.psm = psm;
  }

  onEnter(player: Player) {
    player.sprite.play('player_walk');

    if (player.controls.left.isDown) {
      player.sprite.flipX = true;
      this.direction = Phaser.LEFT;
      player.sprite.body.velocity.x = -300;
    } else if (player.controls.right.isDown) {
      player.sprite.flipX = false;
      this.direction = Phaser.RIGHT;
      player.sprite.body.velocity.x = 300;
    }
  }

  onUpdate(player: Player) {
    if (player.controls.jump.isDown) {
      this.psm.transition(this.psm.states.jumping);
    }

    if (player.sprite.body.velocity.y > 0) {
      this.psm.transition(this.psm.states.falling);
    }

    if (this.direction === Phaser.LEFT && !player.controls.left.isDown) {
      this.psm.transition(this.psm.states.idle);
    }
    if (this.direction === Phaser.RIGHT && !player.controls.right.isDown) {
      this.psm.transition(this.psm.states.idle);
    }
  }

  onLeave(player: Player) {
    this.direction = null;
    player.sprite.anims.stop();
  }
}