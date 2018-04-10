import { Player } from '../player';
import { Accelerates } from './components/accelerates';
import { Decelerates } from './components/decelerates';
import { State } from '../../lib/state-machine/state';
import { StateMachine } from '../../lib/state-machine/state-machine';
import { PlayerStateKeys } from '../player-state-keys';

export class WalkingState extends State<Player> {

  constructor(stateMachine: StateMachine<Player>) {
    super(PlayerStateKeys.WALKING, stateMachine, [Accelerates, Decelerates])
  }

  onEnter(player: Player) {
    super.onEnter(player);

    player.sprite.play('player_walk');
  }

  onUpdate(player: Player) {
    super.onUpdate(player);

    if (player.controls.jump.isDown) {
      return this.stateMachine.transition(PlayerStateKeys.JUMPING);
    }

    if (player.controls.attack.isDown) {
      this.stateMachine.transition(PlayerStateKeys.ATTACKING);
    }

    if (!player.sprite.body.blocked.down) {
      return this.stateMachine.transition(PlayerStateKeys.FALLING);
    }

    if (player.sprite.body.velocity.x === 0) {
      return this.stateMachine.transition(PlayerStateKeys.IDLING);
    }
  }

  onLeave(player: Player) {
    super.onLeave(player);

    player.sprite.anims.stop();
  }
}