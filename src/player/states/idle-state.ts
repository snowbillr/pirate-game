import { Player } from '../player';
import { Decelerates } from './components/decelerates';
import { State } from '../../lib/state-machine/state';
import { StateMachine } from '../../lib/state-machine/state-machine';

export class IdleState extends State<Player> {
  constructor(stateMachine: StateMachine<Player>) {
    super('idle', stateMachine, [Decelerates])
  }

  onEnter(player: Player) {
    super.onEnter(player);

    player.sprite.play('player_idle');
    player.sprite.body.velocity.x = 0;
  }

  onUpdate(player: Player) {
    super.onUpdate(player);

    if (player.controls.left.isDown || player.controls.right.isDown) {
      this.stateMachine.transition('walking');
    }

    if (player.controls.jump.isDown) {
      this.stateMachine.transition('jumping');
    }

    if (player.controls.attack.isDown) {
      this.stateMachine.transition('attacking');
    }

    if (!player.sprite.body.blocked.down) {
      this.stateMachine.transition('falling');
    }
  }
}