import { Component } from "geotic"
import { _Action } from "./action.abstract"

export class Action extends Component {
  action: _Action

  static properties = {
    action: _Action
  }

  onAttached(): void {
    this.perform()
  }

  private perform(): void {
    this.action._perform(this.entity, this)
  }
}
