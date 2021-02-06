import {EventTab} from './EventTab';

export class Observable {
  private readonly tab: any[];
  constructor() {
    this.tab = [];
  }

  on(eventName, callback): void {
    const temp = this.tab.filter(element => element.name === eventName);
    if (temp.length === 0) {
      this.tab.push(new EventTab(eventName, callback));
    }
  }

  off(eventName, callback): void {
    const found = this.tab.findIndex(element => element.name === eventName && element.callBack === callback);
    this.tab.splice(found, 1);
  }

  trigger(eventName, ...args): any {
    const objet = this.tab.find(element => element.name === eventName);
    if (typeof objet === 'object') {
      return objet.callBack(...args);
    }
    return -1;
  }
}
