import { Player } from '../player';
import { Decelerates } from '../../states/components/decelerates';
import { PlayerStateKeys } from '../player-state-keys';
import { State } from '../../../lib/state-machine/state';
import { PlayerMovementAttributes } from '../player-movement-attributes';
import { FacesMovingDirection } from '../../states/components/faces-moving-direction';

export class IdlingState extends State<Player> {
  public key: string = PlayerStateKeys.IDLING;

  constructor(parent: Player) {
    super(parent, [
      new FacesMovingDirection<Player>(),
      new Decelerates<Player>(PlayerMovementAttributes),
    ]);
  }

  onEnter() {
    this.parent.sprite.play('player_idle');
    this.parent.sprite.body.velocity.x = 0;
  }

  onUpdate(transition) {
    if (this.parent.controls.left.isDown || this.parent.controls.right.isDown) {
      transition(PlayerStateKeys.WALKING);
    }

    if (this.parent.controls.jump.isDown) {
      transition(PlayerStateKeys.JUMPING);
    }

    if (this.parent.controls.attack.isDown) {
      transition(PlayerStateKeys.ATTACKING);
    }

    if (!this.parent.sprite.body.blocked.down) {
      transition(PlayerStateKeys.FALLING);
    }
  }
}