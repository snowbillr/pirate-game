import { StateMachine } from "../lib/state-machine/state-machine";
import { IdlingState } from "./states/idling-state";
import { BaddieStateKeys } from "./baddie-state-keys";
import { WalkingState } from "./states/walking-state";

export class Baddie {
  state: StateMachine<Baddie>;
  sprite: any;
  controls: any;

  create(scene) {
    this.sprite = new Phaser.Physics.Arcade.Sprite(scene, 500, 200, 'zombie_stand');
    scene.physics.add.existing(this.sprite);

    this.state = new StateMachine<Baddie>(this, [
      IdlingState,
      WalkingState,
    ], BaddieStateKeys.WALKING);

    this.controls = {
      right: { isDown: false },
      left: { isDown: false },
      attack: { isDown: false },
      jump: { isDown: false },
    }
  }

  update() {
    this.state.update();
  }
}