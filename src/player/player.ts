import { PlayerStateMachine } from "./player-state-machine";
import { PlayerAttributes } from "./player-attributes";

export class Player {
  private scene; //: Phaser.Scene;
  public sprite; //: Phaser.GameObjects.Sprite;
  public controls; //: { [string]: Phaser.Input.Keyboard.Key }

  private state: PlayerStateMachine;

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    this.sprite = new Phaser.Physics.Arcade.Sprite(this.scene, 200, 200, 'player_idle', 0);
    this.scene.physics.add.existing(this.sprite);
    this.sprite.body.maxVelocity.x = PlayerAttributes.maxHorizontalVelocity;
    this.sprite.setScale(2);

    this.controls = this.scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      jump: Phaser.Input.Keyboard.KeyCodes.UP,
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.state = new PlayerStateMachine(this, 'idle');
  }

  update() {
    this.state.update();
  }
}
