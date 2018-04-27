import { Decelerates } from "../../states/components/decelerates";
import { Player } from "../player";
import { Accelerates } from "../../states/components/accelerates";
import { PlayerStateKeys } from "../player-state-keys";
import { State } from "../../../lib/state-machine/state";
import { StateMachine } from "../../../lib/state-machine/state-machine";
import { FacesMovingDirection } from "../../states/components/faces-moving-direction";
import { PlayerMovementAttributes } from "../player-movement-attributes";

export class AttackingState extends State<Player> {
  public static key: string = PlayerStateKeys.ATTACKING;

  direction: number;
  isAttacking: boolean;

  constructor(stateMachine: StateMachine<Player>) {
    super(stateMachine, [
      new FacesMovingDirection<Player>(),
      new Accelerates<Player>(PlayerMovementAttributes),
      new Decelerates<Player>(PlayerMovementAttributes),
    ]);

    this.isAttacking = false;
  }

  onEnter(player: Player) {
    if (player.sprite.flipX) {
      this.direction = Phaser.LEFT;
    } else {
      this.direction = Phaser.RIGHT;
    }

    this.isAttacking = true;
    this.setAttackAnimationCallback(player, () => this.isAttacking = false);
    player.sprite.play('player_attack')
  }

  onUpdate(player: Player) {
    if (this.isAttacking && player.sprite.anims.currentFrame.index <= 3) {
      if (this.direction === Phaser.LEFT) {
        player.sprite.flipX = true;
        if (player.controls.right.isDown) {
          player.sprite.body.acceleration.x = 0;
        }
      } else if (this.direction === Phaser.RIGHT) {
        player.sprite.flipX = false;
        if (player.controls.left.isDown) {
          player.sprite.body.acceleration.x = 0;
        }
      }
    }

    if (!this.isAttacking) { // done with attack animation
      if (player.sprite.body.velocity.y >= 0) {
        return this.stateMachine.transition(PlayerStateKeys.FALLING);
      } else if (player.sprite.body.velocity.y < 0) {
        return this.stateMachine.transition(PlayerStateKeys.JUMPING);
      }

      if (player.controls.left.isDown || player.controls.right.isDown) {
        return this.stateMachine.transition(PlayerStateKeys.WALKING);
      } else {
        return this.stateMachine.transition(PlayerStateKeys.IDLING);
      }
    }
  }

  onLeave(player: Player) {
    this.setAttackAnimationCallback(player, Phaser.NOOP);
    this.isAttacking = false;
  }

  private setAttackAnimationCallback(player: Player, callback: () => void) {
    player.sprite.scene.anims.get('player_attack').onComplete = callback;
  }
}