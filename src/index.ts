import { TestScene } from './scenes/test-scene';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000,
      }
    },
  },
  scene: [TestScene]
};

new Phaser.Game(config);
