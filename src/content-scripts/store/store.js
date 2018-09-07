import EventBus from '../core/event-bus.js';
import { getState, setState } from '../core/storage-service';
import { isStorageEmpty } from '../app/utils';

const hydrateState = async (initialState) => {
    const savedState = await getState();
    return isStorageEmpty(savedState) ? initialState : savedState;
}

export default class Store {

    constructor({ state, actions }) {
        this.actions = actions || {};
        this.state = state || {};
        this.eventBus = new EventBus();
    }

    static async createStore(initialState, actions) {
        const state = await hydrateState(initialState);
        return new Store({ state, actions })
    }

    dispatch(actionKey, payload, initiator='') {
        const desiredAction = this.actions[actionKey];
        if (!desiredAction) {
            console.log(`Action ${actionKey} doesn't exist.`)
            return false;
        }

        // new state is received
        this.state = desiredAction(this.state, payload);
        this.eventBus.publish(`${initiator}:stateChanged`, this.state);
        // save new state in extension storage
        setState(this.state)
            .then(savedState => { 
                console.log(`State was saved, see below`);
                console.log(savedState);
            })
            .catch(e => console.log(`State wasn't saved due to ${e}`))
    }
}