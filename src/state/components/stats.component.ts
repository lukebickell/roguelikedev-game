import { Component } from 'geotic'

export class Defense extends Component {
  max: number
  current: number
  static properties = {
    max: 1,
    current: 1
  }
}

export class Health extends Component {
  max: number
  current: number
  static properties = {
    max: 1,
    current: 1
  }
}

export class Power extends Component {
  max: number
  current: number
  static properties = {
    max: 1,
    current: 1
  }
}