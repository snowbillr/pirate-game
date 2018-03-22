class MyScene extends Phaser.Scene {
  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    const logo = this.add.image(50, 50, 'logo');
    const logo2 = this.add.image(150, 50, 'logo');

    this.tweens.add({
      targets: logo,
      duration: 2000,
      ease: 'Power2',
      loop: -1,

      rotation: Math.PI,
    });

    this.tweens.add({
      targets: logo2,
      duration: 2000,
      ease: 'Power2',
      loop: -1,

      rotation: -Math.PI,
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MyScene]
};

new Phaser.Game(config);
