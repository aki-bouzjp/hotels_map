class Event {
  private _listeners: App.Event.Listeners = {};

  public on(type: string, listener: App.Event.Listener) {
    const listenerExists = this._listeners[type] && this._listeners[type].indexOf(listener) !== -1;
    if (!listenerExists) {
      this._listeners[type] = this._listeners[type] || [];
      this._listeners[type].push(listener);
    }
  }

  public off(type: string, listener: App.Event.Listener) {
    if (this._listeners && this._listeners[type]) {
      const index = this._listeners[type].indexOf(listener);
      if (index !== -1) {
        this._listeners[type].splice(index, 1);
      }
    }
  }

  public fire(data: App.EventData) {
    const type = data.type as App.EventTypes;
    const listeners = this._listeners[type] ? this._listeners[type].slice() : [];
    for (const listener of listeners) {
      listener.call(this, data);
    }
  }
}

export default Event;
