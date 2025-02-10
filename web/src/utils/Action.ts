type EventHandler<T> = (arg: T) => unknown;

export class Action<T = unknown> {
  private _eventHandlers: Set<EventHandler<T>> = new Set();
  private _invocationCounter = 0;

  public add(handler: EventHandler<T>) {
    this._eventHandlers.add(handler);

    return () => {
      this._eventHandlers.delete(handler);
    };
  }

  public remove(handler: EventHandler<T>) {
    this._eventHandlers.delete(handler);
  }

  public invoke(arg: T) {
    this._invocationCounter += 1;
    this._eventHandlers.forEach((handler) => handler(arg));
  }

  public hasListener() {
    return this._eventHandlers.size > 0;
  }

  public hasBeenInvoked() {
    return this._invocationCounter > 0;
  }
}
