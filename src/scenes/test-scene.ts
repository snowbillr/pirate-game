import { Player } from "../player/player";

export class TestScene extends Phaser.Scene {
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
      frameRate: 6,
      repeat: -1,
    });

    this.tilemap = this.add.tilemap('test-map', 128, 128);
    const tileset = this.tilemap.addTilesetImage('test-tileset', 'kenney-platformer-redux-ground')
    this.layer = this.tilemap.createStaticLayer('Tile Layer 1', tileset, 0, 0);

    this.layer.setCollisionByProperty({ collides: true }, true)

    this.player.create();
    this.add.existing(this.player.sprite);

    this.cameras.main.setBounds(0, 0, 20 * this.tilemap.tileWidth, 10 * this.tilemap.tileHeight);
    this.cameras.main.roundPixels = true;
    this.cameras.main.startFollow(this.player.sprite);
  }

  update() {
    this.player.update();

    this.physics.add.collider(this.player.sprite, this.layer);
  }
}