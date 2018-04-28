import { Baddie } from "../baddie";
import { BaddieStateKeys } from "../baddie-state-keys";
import { State } from "../../../lib/state-machine/state";

export class IdlingState extends State<Baddie> {
  public key: string = BaddieStateKeys.IDLING;

  constructor(parent: Baddie) {
    super(parent, []);
  }

  onEnter() {
    this.parent.sprite.setTexture('zombie_stand');
  }

  onUpdate() {

  }

  onLeave() {

  }
}
