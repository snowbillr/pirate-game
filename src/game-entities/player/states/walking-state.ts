import { Player } from '../player';
import { Accelerates } from '../../states/components/accelerates';
import { Decelerates } from '../../states/components/decelerates';
import { PlayerStateKeys } from '../player-state-keys';
import { State } from '../../../lib/state-machine/state';
import { FacesMovingDirection } from '../../states/components/faces-moving-direction';
import { PlayerMovementAttributes } from '../player-movement-attributes';

export class WalkingState extends State<Player> {
  public key: string = PlayerStateKeys.WALKING;

  constructor(parent: Player) {
    super(parent, [
      new FacesMovingDirection<Player>(),
      new Accelerates<Player>(PlayerMovementAttributes),
      new Decelerates<Player>(PlayerMovementAttributes),
    ]);
  }

  onEnter() {
    this.parent.sprite.play('player_walk');
  }

  onUpdate(transition) {
    if (this.parent.controls.jump.isDown) {
      return transition(PlayerStateKeys.JUMPING);
    }

    if (this.parent.controls.attack.isDown) {
      transition(PlayerStateKeys.ATTACKING);
    }

    if (!this.parent.sprite.body.blocked.down) {
      return transition(PlayerStateKeys.FALLING);
    }

    if (this.parent.sprite.body.velocity.x === 0) {
      return transition(PlayerStateKeys.IDLING);
    }
  }

  onLeave() {
    this.parent.sprite.anims.stop();
  }
}