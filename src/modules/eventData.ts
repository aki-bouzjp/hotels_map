class EventData implements App.EventData {
  public type: App.EventTypes;
  public data: Object;

  constructor(type: App.EventTypes, data: Object = {}) {
    this.type = type;
    this.data = data;
  }
}

export default EventData;
