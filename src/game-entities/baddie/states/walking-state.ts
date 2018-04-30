import { Baddie } from "../baddie";
import { BaddieStateKeys } from "../baddie-state-keys";
import { Paces } from "./components/paces";
import { State } from "../../../lib/state-machine/state";
import { FacesMovingDirection } from "../../states/components/faces-moving-direction";
import { Accelerates } from "../../states/components/accelerates";
import { BaddieMovementAttributes } from "../baddie-movement-attributes";

export class WalkingState extends State<Baddie> {
  public key: string = BaddieStateKeys.WALKING;

  constructor(parent: Baddie) {
    super(parent, [
      new Paces(),
      new FacesMovingDirection<Baddie>(),
      new Accelerates<Baddie>(BaddieMovementAttributes),
    ]);
  }

  onEnter() {
    this.parent.sprite.anims.play('zombie_walk');
  }

  onLeave() {
    this.parent.sprite.anims.stop();
  }
}
