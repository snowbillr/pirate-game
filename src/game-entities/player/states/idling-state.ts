import { Player } from '../player';
import { Decelerates } from '../../states/components/decelerates';
import { PlayerStateKeys } from '../player-state-keys';
import { StateMachine } from '../../../lib/state-machine/state-machine';
import { State } from '../../../lib/state-machine/state';
import { PlayerMovementAttributes } from '../player-movement-attributes';
import { FacesMovingDirection } from '../../states/components/faces-moving-direction';

export class IdlingState extends State<Player> {
  public static key: string = PlayerStateKeys.IDLING;

  constructor(stateMachine: StateMachine<Player>) {
    super(stateMachine, [
      new FacesMovingDirection<Player>(),
      new Decelerates<Player>(PlayerMovementAttributes),
    ]);
  }

  onEnter(player: Player) {
    player.sprite.play('player_idle');
    player.sprite.body.velocity.x = 0;
  }

  onUpdate(player: Player) {
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

  onLeave() {}
}