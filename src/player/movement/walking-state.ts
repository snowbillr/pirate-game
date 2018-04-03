import { Player } from '../player';
import { IStateDefinition } from './i-state-definition';
import { IStateMachine } from './i-state-machine';

export class WalkingState implements IStateDefinition {
  key: string;
  fsm: IStateMachine;

  direction: number;

  constructor(fsm: IStateMachine) {
    this.key = 'walking';
    this.fsm = fsm;
  }

  onEnter(player: Player) {
    player.sprite.play('player_walk');

    if (player.controls.left.isDown) {
      player.sprite.flipX = true;
      this.direction = Phaser.LEFT;
      player.sprite.setVelocityX(-100);
    } else if (player.controls.right.isDown) {
      player.sprite.flipX = false;
      this.direction = Phaser.RIGHT;
      player.sprite.setVelocityX(100);
    }
  }

  onUpdate(player: Player) {
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