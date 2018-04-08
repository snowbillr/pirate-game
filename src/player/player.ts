import { PlayerStateMachine } from "./player-state-machine";
import { PlayerAttributes } from "./player-attributes";

export class Player {
  public sprite; //: Phaser.GameObjects.Sprite;
  public controls; //: { [string]: Phaser.Input.Keyboard.Key }

  private state: PlayerStateMachine;

  private hitBoxes: any;

  create(scene) {
    this.sprite = new Phaser.Physics.Arcade.Sprite(scene, 200, 200, 'player_idle', 0);
    scene.physics.add.existing(this.sprite);
    this.sprite.body.maxVelocity.x = PlayerAttributes.maxHorizontalVelocity;
    this.sprite.setScale(2);

    this.controls = scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      jump: Phaser.Input.Keyboard.KeyCodes.UP,
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.state = new PlayerStateMachine(this, 'idle');
    this.hitBoxes = {
      attacking: {
        2: [
          new Phaser.Geom.Circle(35, 55, 8),
          new Phaser.Geom.Circle(43, 55, 8),
          new Phaser.Geom.Circle(51, 55, 8),
          new Phaser.Geom.Circle(59, 56, 4),
        ],
        3: [
          new Phaser.Geom.Circle(33, 55, 8),
          new Phaser.Geom.Circle(41, 55, 8),
          new Phaser.Geom.Circle(49, 55, 8),
          new Phaser.Geom.Circle(57, 56, 4),
        ]
      }
    }
  }

  update() {
    this.state.update();
  }

  getActiveHitBox() {
    if (this.state.getCurrentStateKey() === 'attacking') {
      return this.hitBoxes.attacking[this.sprite.anims.currentFrame.index]
    }
  }
}
