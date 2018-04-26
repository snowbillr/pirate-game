import { Baddie } from "../baddie";
import { BaddieStateKeys } from "../baddie-state-keys";
import { Paces } from "./components/paces";
import { State } from "../../../lib/state-machine/state";
import { StateMachine } from "../../../lib/state-machine/state-machine";
import { FacesMovingDirection } from "../../states/components/faces-moving-direction";
import { Accelerates } from "../../states/components/accelerates";

export class WalkingState extends State<Baddie> {
  public static key: string = BaddieStateKeys.WALKING;

  constructor(stateMachine: StateMachine<Baddie>) {
    super(stateMachine, [
      new Paces(),
      new FacesMovingDirection<Baddie>(),
      new Accelerates<Baddie>(),
    ]);
  }

  onEnter(parent: Baddie) {
    parent.sprite.anims.play('zombie_walk');
  }

  onUpdate() {
  }

  onLeave() {
  }
}
