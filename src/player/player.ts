import { StateMachine } from "./movement/state-machine";

export class Player {
  private scene; //: Phaser.Scene;
  public sprite; //: Phaser.GameObjects.Sprite;
  public controls; //: { [string]: Phaser.Input.Keyboard.Key }

  private state: StateMachine;

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    this.sprite = new Phaser.Physics.Arcade.Sprite(this.scene, 200, 200, 'player');
    this.scene.physics.add.existing(this.sprite);
    this.controls = this.scene.input.keyboard.addKeys({
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
    this.state = new StateMachine(this, 'idle');
  }

  update() {
    this.state.update();
  }
}
