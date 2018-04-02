export class Player {
  private scene; //: Phaser.Scene;
  public sprite; //: Phaser.GameObjects.Sprite;
  private controls; //: { [string]: Phaser.Input.Keyboard.Key }

  private movementState; //: PlayerMovementState
  private idleState;
  private walkingState;

  private direction;

  constructor(scene) {
    this.scene = scene;

    this.sprite = null;
    this.controls = null;
    this.movementState = null;

    this.idleState = {
      key: 'idle',
      onEnter: () => {
        this.sprite.setFrame('adventurer_stand.png');
      },
      onUpdate: () => {
        if (this.controls.left.isDown || this.controls.right.isDown) {
          this.transition(this.walkingState);
        }
      },
      onLeave: () => {

      }
    }
    this.walkingState = {
      key: 'walking',
      onEnter: () => {
        this.sprite.play('player_walk');

        if (this.controls.left.isDown) {
          this.sprite.flipX = true;
          this.direction = Phaser.LEFT;
        } else if (this.controls.right.isDown) {
         this.sprite.flipX = false;
         this.direction = Phaser.RIGHT;
        }
      },
      onUpdate: () => {
        if (this.direction === Phaser.LEFT && !this.controls.left.isDown) {
          this.transition(this.idleState);
        }
        if (this.direction === Phaser.RIGHT && !this.controls.right.isDown) {
          this.transition(this.idleState);
        }
      },
      onLeave: () => {
        this.direction = null;
        this.sprite.anims.stop();
      }
    }
  }

  create() {
    this.sprite = new Phaser.GameObjects.Sprite(this.scene, 200, 200, 'player');
    this.controls = this.scene.input.keyboard.addKeys({
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
    this.movementState = this.idleState;
  }

  update() {
    this.movementState.onUpdate();
  }

  private transition(to) {
    if (this.movementState.key == to.key) {
      return;
    }

    this.movementState.onLeave();
    this.movementState = to;
    this.movementState.onEnter();
  }
}
