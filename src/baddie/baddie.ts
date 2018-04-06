export class Baddie {
  sprite: any;

  create(scene) {
    this.sprite = new Phaser.Physics.Arcade.Sprite(scene, 500, 200, 'zombie_stand');
    scene.physics.add.existing(this.sprite);
  }
}