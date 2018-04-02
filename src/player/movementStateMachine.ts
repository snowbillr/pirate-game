import { Player } from './player';

export class MovementStateMachine {
  private player: Player;
  private states;
  private currentState;

  private direction;

  constructor(player, initialStateKey) {
    this.player = player;
    this.direction = null;
    this.states = {
      idle: {
        key: 'idle',
        onEnter: () => {
          this.player.sprite.setFrame('adventurer_stand.png');
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
          } else if (this.player.controls.right.isDown) {
          this.player.sprite.flipX = false;
          this.direction = Phaser.RIGHT;
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
    this.currentState = this.states[initialStateKey];
  }

  update() {
    this.currentState.onUpdate();
  }

  transition(to) {
    if (this.currentState.key == to.key) {
      return;
    }

    this.currentState.onLeave();
    this.currentState = to;
    this.currentState.onEnter();
  }
}
