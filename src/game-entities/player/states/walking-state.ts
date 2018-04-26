import { Player } from '../player';
import { Accelerates } from './components/accelerates';
import { Decelerates } from './components/decelerates';
import { PlayerStateKeys } from '../player-state-keys';
import { StateMachine } from '../../../lib/state-machine/state-machine';
import { State } from '../../../lib/state-machine/state';
import { FacesMovingDirection } from '../../states/components/faces-moving-direction';

export class WalkingState extends State<Player> {
  public static key: string = PlayerStateKeys.WALKING;

  constructor(stateMachine: StateMachine<Player>) {
    super(stateMachine, [
      new FacesMovingDirection<Player>(),
      new Accelerates<Player>(),
      new Decelerates<Player>(),
    ]);
  }

  onEnter(player: Player) {
    player.sprite.play('player_walk');
  }

  onUpdate(player: Player) {
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
    player.sprite.anims.stop();
  }
}