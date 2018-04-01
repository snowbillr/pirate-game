class MyScene extends Phaser.Scene {
  preload() {
    this.load.atlas('player', 'assets/sprite-atlases/player.png', 'assets/sprite-atlases/player.json');

    // tilemap stuff
    this.load.image('kenney-platformer-redux-ground', 'assets/tilesets/kenney-platformer-redux-ground.png');
    this.load.tilemapTiledJSON('test-map', 'assets/maps/test-map.json');
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

    this.tilemap = this.add.tilemap('test-map');
    const tileset = this.tilemap.addTilesetImage('test-tileset', 'kenney-platformer-redux-ground')
    this.tilemap.createStaticLayer('Tile Layer 1', tileset);

    this.player = this.add.sprite(200, 200, 'player', 'adventurer_stand.png');
    this.physics.world.enable(this.player);

    this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown_RIGHT', () => {
      this.player.flipX = false;
      this.player.play('player_walk');
    });
    this.input.keyboard.on('keyup_RIGHT', () => {
      this.player.anims.stop();
      this.player.setFrame('adventurer_stand.png');
    });

    this.input.keyboard.on('keydown_LEFT', () => {
      this.player.flipX = true;
      this.player.play('player_walk');
    });
    this.input.keyboard.on('keyup_LEFT', () => {
      this.player.anims.stop();
      this.player.setTexture('player', 'adventurer_stand.png')
    });
  }

  update() {

  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {},
  },
  scene: [MyScene]
};

new Phaser.Game(config);
