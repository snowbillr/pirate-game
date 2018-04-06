import { Player } from "../player/player";

export class TestScene extends Phaser.Scene {
  private player: Player;

  init() {
    this.player = new Player();
  }

  preload() {
    this.load.spritesheet('player_idle', 'assets/spritesheets/player/idle.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player_walk', 'assets/spritesheets/player/walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player_jump', 'assets/spritesheets/player/jump.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player_attack', 'assets/spritesheets/player/attack.png', { frameWidth: 64, frameHeight: 64 });

    // tilemap stuff
    this.load.image('kenney-platformer-redux-ground', 'assets/tilesets/kenney-platformer-redux-ground.png');
    this.load.tilemapTiledJSON('test-map', 'assets/maps/test-map.json');
  }

  create() {
    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 7 }),
      frameRate: 9,
      repeat: -1,
    });
    this.anims.create({
      key: 'player_walk',
      frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 2 }),
      frameRate: 9,
      repeat: -1,
    });
    this.anims.create({
      key: 'player_attack',
      frames: this.anims.generateFrameNumbers('player_attack', { start: 0, end: 4 }),
      frameRate: 9,
      repeat: 0,
    });

    this.tilemap = this.add.tilemap('test-map', 128, 128);
    const tileset = this.tilemap.addTilesetImage('test-tileset', 'kenney-platformer-redux-ground')
    this.layer = this.tilemap.createStaticLayer('Tile Layer 1', tileset, 0, 0);

    this.layer.setCollisionByProperty({ collides: true }, true)

    this.player.create(this);
    this.add.existing(this.player.sprite);

    this.cameras.main.setBounds(0, 0, this.layer.width, this.layer.height);
    this.cameras.main.roundPixels = true;
    this.cameras.main.startFollow(this.player.sprite);
  }

  update() {
    this.player.update();

    this.physics.add.collider(this.player.sprite, this.layer);
  }
}