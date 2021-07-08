export class KeyboardInputController {
  private _rightPressed = false
  private _leftPressed = false
  private _upPressed = false
  private _downPressed = false

  constructor() {
    this.initializeListeners()
  }

  get rightPressed(): boolean {
    return this._rightPressed
  }

  get leftPressed(): boolean {
    return this._leftPressed
  }

  get upPressed(): boolean {
    return this._upPressed
  }

  get downPressed(): boolean {
    return this._downPressed
  }

  private initializeListeners(): void {
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false)
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false)
  }

  private keyDownHandler(e: KeyboardEvent): void {
    //console.log('key down: ' +e.key)
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      this._rightPressed = true
    }
    if (e.key == 'Left' || e.key == 'ArrowLeft') {
      this._leftPressed = true
    }
    if (e.key == 'Up' || e.key == 'ArrowUp') {
      this._upPressed = true
    }
    if (e.key == 'Down' || e.key == 'ArrowDown') {
      this._downPressed = true
    }
  }

  private keyUpHandler(e: KeyboardEvent): void {
    //console.log('key up: ' + e.key)
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      this._rightPressed = false
    }
    if (e.key == 'Left' || e.key == 'ArrowLeft') {
      this._leftPressed = false
    }
    if (e.key == 'Up' || e.key == 'ArrowUp') {
      this._upPressed = false
    }
    if (e.key == 'Down' || e.key == 'ArrowDown') {
      this._downPressed = false
    }
  }
}