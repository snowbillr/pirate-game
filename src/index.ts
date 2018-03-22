class MyScene extends Phaser.Scene {
  preload() {
    this.load.atlas('player', 'assets/sprite-atlases/player.png', 'assets/sprite-atlases/player.json');
  }

  create() {
    this.anims.create({
      key: 'player_walk',
      frames: [
        { key: 'player', frame: 'adventurer_walk1.png' },
        { key: 'player', frame: 'adventurer_walk2.png' },
      ],
      frameRate: 5,
      repeat: -1,
    });

    const player = this.add.sprite(200, 200, 'player', 'adventurer_stand.png');
    this.physics.world.enable(player);

    this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown_RIGHT', () => {
      player.flipX = false;
      player.play('player_walk');
    });
    this.input.keyboard.on('keyup_RIGHT', () => {
      player.anims.stop();
      player.setTexture('player', 'adventurer_stand.png')
    });

    this.input.keyboard.on('keydown_LEFT', () => {
      player.flipX = true;
      player.play('player_walk');
    });
    this.input.keyboard.on('keyup_LEFT', () => {
      player.anims.stop();
      player.setTexture('player', 'adventurer_stand.png')
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {},
  },
  scene: [MyScene]
};

new Phaser.Game(config);
