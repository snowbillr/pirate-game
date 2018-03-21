class MyScene extends Phaser.Scene {
  preload() {
      this.load.image('logo', 'assets/logo.png');
  }

  create() {
      var logo = this.add.image(10, 10, 'logo');

      this.tweens.add({
          targets: logo,
          x: 450,
          duration: 2000,
          ease: 'Power2',
          yoyo: true,
          loop: -1
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

