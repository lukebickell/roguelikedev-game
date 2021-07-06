import { Component } from 'geotic'

export class Appearance extends Component {
  sprite: string
  static properties = {
    sprite: 'dingo'
  }
}

export class Position extends Component {
  x: number
  y: number
  prevX: number
  prevY: number
  static properties = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0
  }
}

export class Move extends Component {
  x: number
  y: number
  static properties = {
    x: 0,
    y: 0
  }
}