import { Player } from './player/player';

class MyScene extends Phaser.Scene {
  private player: Player;

  init() {
    this.player = new Player(this);
  }

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

    this.tilemap = this.add.tilemap('test-map', 128, 128);
    const tileset = this.tilemap.addTilesetImage('test-tileset', 'kenney-platformer-redux-ground')
    this.layer = this.tilemap.createStaticLayer('Tile Layer 1', tileset, 0, 0);

    this.tilemap.setCollisionByProperty({ collides: true }, true, true, this.layer)

    this.player.create();
    this.add.existing(this.player.sprite);
  }

  update() {
    this.player.update();

    this.physics.add.collider(this.player.sprite, this.layer);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 800,
      }
    },
  },
  scene: [MyScene]
};

new Phaser.Game(config);
