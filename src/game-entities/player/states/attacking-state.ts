import { Decelerates } from "../../states/components/decelerates";
import { Player } from "../player";
import { Accelerates } from "../../states/components/accelerates";
import { PlayerStateKeys } from "../player-state-keys";
import { State } from "../../../lib/state-machine/state";
import { FacesMovingDirection } from "../../states/components/faces-moving-direction";
import { PlayerMovementAttributes } from "../player-movement-attributes";

export class AttackingState extends State<Player> {
  public key: string = PlayerStateKeys.ATTACKING;

  direction: number;
  isAttacking: boolean;

  constructor(parent: Player) {
    super(parent, [
      new FacesMovingDirection<Player>(),
      new Accelerates<Player>(PlayerMovementAttributes),
      new Decelerates<Player>(PlayerMovementAttributes),
    ]);

    this.isAttacking = false;
  }

  onEnter() {
    if (this.parent.sprite.flipX) {
      this.direction = Phaser.LEFT;
    } else {
      this.direction = Phaser.RIGHT;
    }

    this.isAttacking = true;
    this.setAttackAnimationCallback(() => this.isAttacking = false);
    this.parent.sprite.play('player_attack')
  }

  onUpdate(transition) {
    if (this.isAttacking && this.parent.sprite.anims.currentFrame.index <= 3) {
      if (this.direction === Phaser.LEFT) {
        this.parent.sprite.flipX = true;
        if (this.parent.controls.right.isDown) {
          this.parent.sprite.body.acceleration.x = 0;
        }
      } else if (this.direction === Phaser.RIGHT) {
        this.parent.sprite.flipX = false;
        if (this.parent.controls.left.isDown) {
          this.parent.sprite.body.acceleration.x = 0;
        }
      }
    }

    if (!this.isAttacking) { // done with attack animation
      if (this.parent.sprite.body.velocity.y >= 0) {
        return transition(PlayerStateKeys.FALLING);
      } else if (this.parent.sprite.body.velocity.y < 0) {
        return transition(PlayerStateKeys.JUMPING);
      }

      if (this.parent.controls.left.isDown || this.parent.controls.right.isDown) {
        return transition(PlayerStateKeys.WALKING);
      } else {
        return transition(PlayerStateKeys.IDLING);
      }
    }
  }

  onLeave() {
    this.setAttackAnimationCallback(Phaser.NOOP);
    this.isAttacking = false;
  }

  private setAttackAnimationCallback(callback: () => void) {
    this.parent.sprite.scene.anims.get('player_attack').onComplete = callback;
  }
}