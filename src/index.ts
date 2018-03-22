class MyScene extends Phaser.Scene {
  preload() {
    this.load.atlas('player', 'assets/sprite-atlases/player.png', 'assets/sprite-atlases/player.json');
  }

  create() {
    this.add.sprite(200, 200, 'player');

    this.anims.create({
      key: 'player_walk',
      frames: [
        { key: 'player', frame: 'adventurer_walk1.png' },
        { key: 'player', frame: 'adventurer_walk2.png' },
      ],
      frameRate: 5,
      repeat: -1,
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
