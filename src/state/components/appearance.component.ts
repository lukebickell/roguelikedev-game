import { Component } from "geotic"

export class Appearance extends Component {
  sprite: string
  backgroundSprite: string
  static properties = {
    sprite: 'dingo',
    backgroundSprite: null
  }
}