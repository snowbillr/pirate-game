import { PlayerStateMachine } from '../player-state-machine';
import { Player } from '../player';
import { HorizontalMovement } from './components/horizontal-movement';
import { PlayerState } from './player-state';

export class FallingState extends PlayerState {
  constructor(psm: PlayerStateMachine) {
    super('falling', psm, { horizontalMovement: HorizontalMovement });
  }

  onEnter(player: Player) {
    super.onEnter(player);

    player.sprite.setFrame('adventurer_fall.png');
  }

  onUpdate(player: Player) {
   super.onUpdate(player);

    if (player.sprite.body.blocked.down) {
      if (this.components.horizontalMovement.direction === Phaser.LEFT || this.components.horizontalMovement.direction === Phaser.RIGHT) {
        this.psm.transition(this.psm.states.walking);
      } else {
        this.psm.transition(this.psm.states.idle);
      }
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);
  }
}