import Component from '../core/component';

export default class ManageHistoryComponent extends Component {
    constructor(store) {
        const element = document.getElementById('appRoot');
        const componentName = 'ManageHistoryComponent';
        super(store, element, componentName);
    }

    render() {
        const { state, dispatch } = this.store;
        const historySettings = state.history;
        this.element.innerHTML = `
            <div>
                <h1>Manage History</h1>
                <button class="cross-link-btn privacy-settings-btn">Manage History</button>                    
            </div>
        `;
    }
}