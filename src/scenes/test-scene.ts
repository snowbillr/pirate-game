import { Baddie } from "../game-entities/baddie/baddie";
import { Player } from "../game-entities/player/player";
import { BaddieStateKeys } from "../game-entities/baddie/baddie-state-keys";

export class TestScene extends Phaser.Scene {
  private player: Player;
  private baddie: Baddie;

  private hitboxDebug: Phaser.GameObjects.Graphics;
  private layer: Phaser.Tilemaps.StaticTilemapLayer;
  private tilemap: Phaser.Tilemaps.Tilemap;

  init() {
    this.player = new Player();
    this.baddie = new Baddie();
  }

  preload() {
    this.load.spritesheet('player_idle', 'assets/spritesheets/player/idle.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player_walk', 'assets/spritesheets/player/walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player_jump', 'assets/spritesheets/player/jump.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player_attack', 'assets/spritesheets/player/attack.png', { frameWidth: 64, frameHeight: 64 });

    this.load.image('zombie_stand', 'assets/spritesheets/zombie/stand.png');
    this.load.image('zombie_walk1', 'assets/spritesheets/zombie/walk1.png');
    this.load.image('zombie_walk2', 'assets/spritesheets/zombie/walk2.png');
    this.load.image('zombie_hurt', 'assets/spritesheets/zombie/hurt.png');

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
    this.anims.create({
      key: 'zombie_walk',
      frames: [{ key: 'zombie_walk1', frame: 0 }, { key: 'zombie_walk2', frame: 0 }],
      frameRate: 4,
      repeat: -1,
    })

    this.tilemap = this.add.tilemap('test-map', 128, 128);
    const tileset = this.tilemap.addTilesetImage('test-tileset', 'kenney-platformer-redux-ground')
    this.layer = this.tilemap.createStaticLayer('Tile Layer 1', tileset, 0, 0);

    this.layer.setCollisionByProperty({ collides: true }, true)

    this.baddie.create(this);
    this.add.existing(this.baddie.sprite);

    this.player.create(this);
    this.add.existing(this.player.sprite);

    this.physics.add.collider(this.player.sprite, this.layer);
    this.physics.add.collider(this.baddie.sprite, this.layer);
    this.hitboxDebug = this.add.graphics();

    this.cameras.main.setBounds(0, 0, this.layer.width, this.layer.height);
    this.cameras.main.roundPixels = true;
    this.cameras.main.startFollow(this.player.sprite);
  }

  update() {
    this.player.update();
    this.baddie.update();

    this.hitboxDebug.clear();

    const activeHitBoxes = this.player.getActiveHitBox();
    if (activeHitBoxes) {
      for (let i = 0; i < activeHitBoxes.length; i++) {
        let activeHitBox = activeHitBoxes[i];
        let adjustedHitBox = Phaser.Geom.Circle.Clone(activeHitBox);
        adjustedHitBox.setPosition(this.player.sprite.x + activeHitBox.x, this.player.sprite.y + activeHitBox.y);
        this.hitboxDebug.fillStyle(0x9966ff, 0.5);
        this.hitboxDebug.fillCircleShape(adjustedHitBox);

        if (Phaser.Geom.Intersects.CircleToRectangle(adjustedHitBox, this.baddie.sprite.getBounds())) {
          const fromDirection = adjustedHitBox.left < this.baddie.sprite.body.left ? Phaser.LEFT : Phaser.RIGHT;
          this.baddie.state.transition(BaddieStateKeys.RECOILING, fromDirection);
        }
      }
    }
  }
}