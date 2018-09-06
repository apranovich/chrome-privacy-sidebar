import * as actions from './actions.js';
import { initialState } from './initial-state.js';
import Store from './store.js';

export default Store.createStore(initialState, actions);