import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    this.add.text(20, 20, 'Interfaz', { fontSize: '24px', fill: '#fff' });
  }
}
