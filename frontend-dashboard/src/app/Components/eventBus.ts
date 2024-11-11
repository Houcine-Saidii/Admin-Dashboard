// Components/eventBus.ts
type Callback = (data: any) => void;

class EventBus {
  private events: { [key: string]: Callback[] } = {};

  subscribe(event: string, callback: Callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  unsubscribe(event: string, callback: Callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  publish(event: string, data: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}

const eventBus = new EventBus();
export default eventBus;