import { IState } from './i-state';
import { StateMachine } from './state-machine';
import { Player } from '../player';

export class FallingState implements IState {
  key: string;
  fsm: StateMachine;
  private direction: number;

  constructor(fsm: StateMachine) {
    this.key = 'falling';
    this.fsm = fsm;
    this.direction = null;
  }

  onEnter(player: Player) {
    player.sprite.setFrame('adventurer_fall.png');
  }

  onUpdate(player: Player) {
    if (player.controls.left.isDown) {
      player.sprite.flipX = true;
      this.direction = Phaser.LEFT;
      player.sprite.body.velocity.x = -200;
    } else if (player.controls.right.isDown) {
      player.sprite.flipX = false;
      this.direction = Phaser.RIGHT;
      player.sprite.body.velocity.x = 200;
    } else if (this.direction === Phaser.LEFT && !player.controls.left.isDown ||
        this.direction === Phaser.RIGHT && !player.controls.right.isDown) {
      this.direction = null;
      player.sprite.body.velocity.x = 0;
    }

    if (player.sprite.body.blocked.down) {
      if (this.direction === Phaser.LEFT || this.direction === Phaser.RIGHT) {
        this.fsm.transition(this.fsm.states.walking);
      } else {
        this.fsm.transition(this.fsm.states.idle);
      }
    }
  }

  onLeave() {
    this.direction = null;
  }
}