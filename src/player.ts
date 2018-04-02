export class Player {
  private scene; //: Phaser.Scene;
  public sprite; //: Phaser.GameObjects.Sprite;
  private controls; //: { [string]: Phaser.Input.Keyboard.Key }

  constructor(scene) {
    this.scene = scene;

    this.sprite = null;
    this.controls = null;
  }

  create() {
    this.sprite = new Phaser.GameObjects.Sprite(this.scene, 200, 200, 'player');
    this.controls = this.scene.input.keyboard.addKeys({
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
  }

  update() {
    if (this.controls.left.isDown) {
      this.sprite.flipX = true;
      this.sprite.play('player_walk', true);
    } else if (this.controls.right.isDown) {
      this.sprite.flipX = false;
      this.sprite.play('player_walk', true);
    } else {
      this.sprite.anims.stop();
      this.sprite.setFrame('adventurer_stand.png');
    }
  }
}
