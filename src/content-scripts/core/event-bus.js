export default class EventBus {
    constructor() {
        this.events = {};
    }
  
    subscribe(eventName, callback) {
        if(!this.events[eventName]) {
        this.events[eventName] = [];
        }
  
        this.events[eventName].push(callback);
    }
  
    publish(eventName, data) {
        const publishedEvent = this.events[eventName];
        if(!publishedEvent) {
            return;
        }

        publishedEvent.map(cb => cb(data));
    }
}