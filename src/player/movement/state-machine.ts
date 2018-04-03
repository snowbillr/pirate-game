import { Player } from '../player';
import { WalkingState } from './walking-state';
import { IdleState } from './idle-state';

import { IStateMachine } from './i-state-machine';
import { IStateDefinition } from './i-state-definition';

export class StateMachine implements IStateMachine {
  private player: Player;
  public states;
  private currentState: IStateDefinition;

  constructor(player, initialStateKey) {
    this.player = player;
    this.states = {
      idle: new IdleState(this),
      walking: new WalkingState(this),
    }
    /*
    this.states = {
      idle: {
        key: 'idle',
        onEnter: () => {
          this.player.sprite.setFrame('adventurer_stand.png');
          this.player.sprite.setVelocityX(0);
        },
        onUpdate: () => {
          if (this.player.controls.left.isDown || this.player.controls.right.isDown) {
            this.transition(this.states.walking);
          }
        },
        onLeave: () => {

        }
      },
      walking: {
        key: 'walking',
        onEnter: () => {
          this.player.sprite.play('player_walk');

          if (this.player.controls.left.isDown) {
            this.player.sprite.flipX = true;
            this.direction = Phaser.LEFT;
            this.player.sprite.setVelocityX(-50);
          } else if (this.player.controls.right.isDown) {
            this.player.sprite.flipX = false;
            this.direction = Phaser.RIGHT;
            this.player.sprite.setVelocityX(50);
          }
        },
        onUpdate: () => {
          if (this.direction === Phaser.LEFT && !this.player.controls.left.isDown) {
            this.transition(this.states.idle);
          }
          if (this.direction === Phaser.RIGHT && !this.player.controls.right.isDown) {
            this.transition(this.states.idle);
          }
        },
        onLeave: () => {
          this.direction = null;
          this.player.sprite.anims.stop();
        }
      },
    }
    */
    this.currentState = this.states[initialStateKey];
  }

  update() {
    this.currentState.onUpdate(this.player);
  }

  transition(to) {
    if (this.currentState.key == to.key) {
      return;
    }

    this.currentState.onLeave(this.player);
    this.currentState = to;
    this.currentState.onEnter(this.player);
  }
}
