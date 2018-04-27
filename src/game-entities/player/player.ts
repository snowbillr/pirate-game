import { IdleState } from "./states/idle-state";
import { WalkingState } from "./states/walking-state";
import { AttackingState } from "./states/attacking-state";
import { JumpingState } from "./states/jumping-state";
import { FallingState } from "./states/falling-state";
import { PlayerStateKeys } from "./player-state-keys";
import { StateMachine } from "../../lib/state-machine/state-machine";
import { IGameEntity } from "../i-game-entity";
import { PlayerMovementAttributes } from "./player-movement-attributes";

export class Player implements IGameEntity {
  public sprite; //: Phaser.GameObjects.Sprite;
  public controls; //: { [string]: Phaser.Input.Keyboard.Key }

  private state: StateMachine<Player>;

  private hitBoxes: any;

  create(scene) {
    this.sprite = scene.physics.add.sprite(200, 200, 'player_idle', 0);
    this.sprite.body.maxVelocity.x = PlayerMovementAttributes.maxHorizontalVelocity;
    this.sprite.setScale(2);

    this.controls = scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      jump: Phaser.Input.Keyboard.KeyCodes.UP,
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.state = new StateMachine<Player>(this, [
      IdleState,
      WalkingState,
      AttackingState,
      JumpingState,
      FallingState,
    ], PlayerStateKeys.IDLING);

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
    if (this.state.getCurrentStateKey() === PlayerStateKeys.ATTACKING) {
      return this.hitBoxes.attacking[this.sprite.anims.currentFrame.index]
    }
  }
}
