import { Player } from '../player';
import { IState} from './i-state';
import { StateMachine } from './state-machine';

export class WalkingState implements IState{
  key: string;
  fsm: StateMachine;

  direction: number;

  constructor(fsm: StateMachine) {
    this.key = 'walking';
    this.fsm = fsm;
  }

  onEnter(player: Player) {
    player.sprite.play('player_walk');

    if (player.controls.left.isDown) {
      player.sprite.flipX = true;
      this.direction = Phaser.LEFT;
      player.sprite.body.velocity.x = -200;
    } else if (player.controls.right.isDown) {
      player.sprite.flipX = false;
      this.direction = Phaser.RIGHT;
      player.sprite.body.velocity.x = 200;
    }
  }

  onUpdate(player: Player) {
    if (player.controls.jump.isDown) {
      this.fsm.transition(this.fsm.states.jumping);
    }

    if (this.direction === Phaser.LEFT && !player.controls.left.isDown) {
      this.fsm.transition(this.fsm.states.idle);
    }
    if (this.direction === Phaser.RIGHT && !player.controls.right.isDown) {
      this.fsm.transition(this.fsm.states.idle);
    }
  }

  onLeave(player: Player) {
    this.direction = null;
    player.sprite.anims.stop();
  }
}