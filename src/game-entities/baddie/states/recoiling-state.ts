import { Baddie } from "../baddie";
import { State } from "../../../lib/state-machine/state";
import { BaddieStateKeys } from "../baddie-state-keys";
import { BaddieRecoilAttributes } from "../baddie-recoil-attributes";
import { FacesMovingDirection } from "../../states/components/faces-moving-direction";

export class RecoilingState extends State<Baddie> {
  public key: string = BaddieStateKeys.RECOILING;
  private leftWasDown: boolean = false;
  private rightWasDown: boolean = false;

  constructor(parent: Baddie) {
    super(parent, [new FacesMovingDirection()]);
  }

  onEnter(transition, fromDirection) {
    this.leftWasDown = this.parent.controls.left.isDown;
    this.rightWasDown = this.parent.controls.right.isDown;
    this.parent.controls.left.isDown = false;
    this.parent.controls.right.isDown = false;
    this.parent.sprite.setTexture('zombie_hurt');

    this.parent.sprite.body.velocity.y = -BaddieRecoilAttributes.verticalVelocity;
    if (fromDirection === Phaser.LEFT) {
      this.parent.sprite.body.velocity.x = BaddieRecoilAttributes.horizontalVelocity;
      this.parent.sprite.body.acceleration.x = -BaddieRecoilAttributes.horizontalSlowingAcceleration;
    }
    if (fromDirection === Phaser.RIGHT) {
      this.parent.sprite.body.velocity.x = -BaddieRecoilAttributes.horizontalVelocity;
      this.parent.sprite.body.acceleration.x = BaddieRecoilAttributes.horizontalSlowingAcceleration;
    }
  }

  onUpdate(transition) {
    if (this.parent.sprite.body.blocked.down) {
      console.log('landed');
      this.parent.controls.left.isDown = this.leftWasDown;
      this.parent.controls.right.isDown = this.rightWasDown;
      transition(BaddieStateKeys.WALKING);
    }
  }
}
