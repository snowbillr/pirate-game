// import { PlayerState } from "./player-state";
// import { PlayerStateMachine } from "../player-state-machine";
import { Decelerates } from "./components/decelerates";
import { Player } from "../player";
import { Accelerates } from "./components/accelerates";
import { State } from "../../lib/state-machine/state";
import { StateMachine } from "../../lib/state-machine/state-machine";
import { PlayerStates } from "./state-keys";

export class AttackingState extends State<Player> {
  direction: number;
  isAttacking: boolean;

  constructor(stateMachine: StateMachine<Player>) {
    super(PlayerStates.ATTACKING, stateMachine, [Accelerates, Decelerates]);

    this.isAttacking = false;
  }

  onEnter(player: Player) {
    super.onEnter(player);

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
    super.onUpdate(player);

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

    if (!this.isAttacking) {
      if (player.sprite.body.velocity.y >= 0) {
        return this.stateMachine.transition(PlayerStates.FALLING);
      } else if (player.sprite.body.velocity.y < 0) {
        return this.stateMachine.transition(PlayerStates.JUMPING);
      }

      if (player.controls.left.isDown || player.controls.right.isDown) {
        return this.stateMachine.transition(PlayerStates.WALKING);
      } else {
        return this.stateMachine.transition(PlayerStates.IDLE);
      }
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);

    this.setAttackAnimationCallback(player, Phaser.NOOP);
    this.isAttacking = false;
  }

  private setAttackAnimationCallback(player: Player, callback: () => void) {
    player.sprite.scene.anims.get('player_attack').onComplete = callback;
  }
}