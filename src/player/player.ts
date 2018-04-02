import { MovementStateMachine } from "./movementStateMachine";

export class Player {
  private scene; //: Phaser.Scene;
  public sprite; //: Phaser.GameObjects.Sprite;
  public controls; //: { [string]: Phaser.Input.Keyboard.Key }

  private movementStateMachine: MovementStateMachine;

  constructor(scene) {
    this.scene = scene;

    this.sprite = null;
    this.controls = null;
    this.movementStateMachine = null;
  }

  create() {
    this.sprite = new Phaser.Physics.Arcade.Sprite(this.scene, 200, 200, 'player');
    this.controls = this.scene.input.keyboard.addKeys({
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
    this.movementStateMachine = new MovementStateMachine(this, 'idle');
  }

  update() {
    this.movementStateMachine.update();
  }
}
