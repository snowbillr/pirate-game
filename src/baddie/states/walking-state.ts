import { State } from "../../lib/state-machine/state";
import { Baddie } from "../baddie";
import { BaddieStateKeys } from "../baddie-state-keys";
import { StateMachine } from "../../lib/state-machine/state-machine";
import { Paces } from "./components/paces";

export class WalkingState extends State<Baddie> {
  public static key: string = BaddieStateKeys.WALKING;

  constructor(stateMachine: StateMachine<Baddie>) {
    super(stateMachine, [Paces]);
  }

  onEnter(parent: Baddie) {
    parent.sprite.anims.play('zombie_walk');
  }

  onUpdate(parent: Baddie) {
    if (parent.controls.right.isDown) {
      parent.sprite.body.velocity.x = 100;
    }
  }

  onLeave() {
  }
}