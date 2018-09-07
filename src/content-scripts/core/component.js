import Store from '../store/store.js';

export default class Component {
    constructor(store, element, initiator = '') {
        this.render = this.render || function() {};
        this.initiator = initiator;
        
        if(store instanceof Store) {
            this.store = store;
            store.eventBus.subscribe(`${this.initiator}:stateChanged`, () => this.render());
        }
        
        if(element) {
            this.element = element;
        }
    }
}
