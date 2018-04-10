import { PlayerAttributes } from "./player-attributes";
import { StateMachine } from "../lib/state-machine/state-machine";
import { IdleState } from "./states/idle-state";
import { WalkingState } from "./states/walking-state";
import { AttackingState } from "./states/attacking-state";
import { JumpingState } from "./states/jumping-state";
import { FallingState } from "./states/falling-state";
import { PlayerStateKeys } from "./states/state-keys";

export class Player {
  public sprite; //: Phaser.GameObjects.Sprite;
  public controls; //: { [string]: Phaser.Input.Keyboard.Key }

  private newState: StateMachine<Player>;

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

    this.newState = new StateMachine<Player>(this, {
      [PlayerStateKeys.IDLING]: IdleState,
      [PlayerStateKeys.WALKING]: WalkingState,
      [PlayerStateKeys.ATTACKING]: AttackingState,
      [PlayerStateKeys.JUMPING]: JumpingState,
      [PlayerStateKeys.FALLING]: FallingState,
    }, PlayerStateKeys.IDLING);

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
    this.newState.update();
  }

  getActiveHitBox() {
    if (this.newState.getCurrentStateKey() === PlayerStateKeys.ATTACKING) {
      return this.hitBoxes.attacking[this.sprite.anims.currentFrame.index]
    }
  }
}
