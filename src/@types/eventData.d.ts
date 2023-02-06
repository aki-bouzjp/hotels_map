declare namespace App {
  namespace EventData {
    type EventTypes = App.EventTypes;
  }

  class EventData {
    type: EventData.EventTypes;
    data: Object;
    constructor(type: EventData.EventTypes, data?: Object);
  } 
}
