import { Component } from "geotic"

export class Appearance extends Component {
  sprite: string
  backgroundSprite: string
  foregroundSprite: string
  
  static properties = {
    sprite: 'dingo',
    backgroundSprite: null,
    foregroundSprite: null,
  }
}