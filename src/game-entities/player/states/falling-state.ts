import { Player } from '../player';
import { Accelerates } from '../../states/components/accelerates';
import { Decelerates } from '../../states/components/decelerates';
import { PlayerStateKeys } from '../player-state-keys';
import { State } from '../../../lib/state-machine/state';
import { FacesMovingDirection } from '../../states/components/faces-moving-direction';
import { PlayerMovementAttributes } from '../player-movement-attributes';

export class FallingState extends State<Player> {
  public key: string = PlayerStateKeys.FALLING;

  constructor(parent: Player) {
    super(parent, [
      new FacesMovingDirection<Player>(),
      new Accelerates<Player>(PlayerMovementAttributes),
      new Decelerates<Player>(PlayerMovementAttributes),
    ]);
  }

  onUpdate(transition) {
    const jumpProgress = Math.abs(this.parent.sprite.body.velocity.y / PlayerMovementAttributes.jumpVelocity);
    const totalJumpFrames = 4;
    const currentFrame = Phaser.Math.Clamp(totalJumpFrames - Phaser.Math.RoundTo(totalJumpFrames * jumpProgress), 0, totalJumpFrames);
    this.parent.sprite.setTexture('player_jump', currentFrame);

    if (this.parent.controls.attack.isDown) {
      return transition(PlayerStateKeys.ATTACKING);
    }

    if (this.parent.sprite.body.blocked.down) {
      if (this.parent.sprite.body.velocity.x !== 0) {
        return transition(PlayerStateKeys.WALKING);
      } else {
        return transition(PlayerStateKeys.IDLING);
      }
    }
  }
}