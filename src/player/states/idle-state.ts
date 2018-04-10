import { Player } from '../player';
import { Decelerates } from './components/decelerates';
import { State } from '../../lib/state-machine/state';
import { StateMachine } from '../../lib/state-machine/state-machine';
import { PlayerStateKeys } from '../player-state-keys';

export class IdleState extends State<Player> {
  public static key: string = PlayerStateKeys.IDLING;

  constructor(stateMachine: StateMachine<Player>) {
    super(stateMachine, [Decelerates])
  }

  onEnter(player: Player) {
    super.onEnter(player);

    player.sprite.play('player_idle');
    player.sprite.body.velocity.x = 0;
  }

  onUpdate(player: Player) {
    super.onUpdate(player);

    if (player.controls.left.isDown || player.controls.right.isDown) {
      this.stateMachine.transition(PlayerStateKeys.WALKING);
    }

    if (player.controls.jump.isDown) {
      this.stateMachine.transition(PlayerStateKeys.JUMPING);
    }

    if (player.controls.attack.isDown) {
      this.stateMachine.transition(PlayerStateKeys.ATTACKING);
    }

    if (!player.sprite.body.blocked.down) {
      this.stateMachine.transition(PlayerStateKeys.FALLING);
    }
  }
}