declare namespace App {
  namespace Event {
    type Listener = (type: EventTypes, event: App.EventData) => any;
    type Listeners = { [key: string]: Array<Listener> };
  }

  const EVENT_TYPES: {
    readonly CLICK: 'click';
    readonly HOVER: 'hover';
  };
  type EventTypes = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];

  class Event {
    public on(type: EventTypes, listener: Event.Listener): void;
    public off(type: EventTypes, listener: Event.Listener): void;
    public fire(event: EventData): void;
  }  
}
