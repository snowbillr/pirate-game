import { Baddie } from "../baddie";
import { BaddieStateKeys } from "../baddie-state-keys";
import { State } from "../../../lib/state-machine/state";
import { StateMachine } from "../../../lib/state-machine/state-machine";

export class IdlingState extends State<Baddie> {
  public static key: string = BaddieStateKeys.IDLING;

  constructor(stateMachine: StateMachine<Baddie>) {
    super(stateMachine, []);
  }

  onEnter(parent: Baddie) {
    parent.sprite.setTexture('zombie_stand');
  }

  onUpdate() {

  }

  onLeave() {

  }
}
