import Component from '../core/component';

export default class ManageHistoryComponent extends Component {
    constructor(store) {
        const element = document.getElementById('appRoot');
        const componentName = 'ManageHistoryComponent';
        super(store, element, componentName);

        this.clearSinceOptions = [
            { value: 'all', label: 'All time' },
            { value: '4w', label: 'Last 4 weeks' },
            { value: '7d', label: 'Last 7 days' },
            { value: '24h', label: 'Last 24h' },
            { value: '1h', label: 'Last hour' }
        ];
        this.itemsToBeClearedOptions = [
            { value: 'history', label: 'Browsing history' },
            { value: 'downloads', label: 'Download history' },
            { value: 'cookies', label: 'Cookies and other site data' },
            { value: 'cache', label: 'Cached images and files' },
            { value: 'passwords', label: 'Passwords' },
            { value: 'formData', label: 'Autofill form data' }
        ]
    }

    render() {
        const clearSince = this.store.state.history.clearSince;;
        const itemsToBeCleared = this.store.state.history.itemsToBeCleared;;

        this.element.innerHTML = `
            <div id="manage-history">
                <h1>Manage History</h1>
                <div>
                    <label>Clear my browsing data from</label>
                    <select id="timeframes">
                        ${this.clearSinceOptions.map(x => `<option value=${ x.value } ${ x.value === clearSince ? 'selected' : '' }>
                            ${ x.label }
                        </option>`)}
                    </select>
                    <fieldset>
                        <legend>Items to be cleared</legend>
                        ${this.itemsToBeClearedOptions.map(x => `<div>
                            <input type="checkbox" 
                                id="${ x.value }" 
                                value="${ x.value }"
                                ${ (itemsToBeCleared || []).includes(x.value) ? 'checked' : '' } />
                            <label for="${ x.value }">${ x.label }</label>
                        </div>`).join('')}
                    </fieldset>
                </div>
                <button class="cross-link-btn clear-browsing-data">Clear Browsing Data</button>                    
                <button class="cross-link-btn privacy-settings-btn">Privacy Settings</button>                    
            </div>
        `;

        const timeframesDropdown = this.element.querySelector('#timeframes');
        timeframesDropdown.addEventListener("change", (e) => {
            this.store.dispatch('selectClearTimeframe', { clearSince: e.target.value });
        });

        const clearOptionsCheckboxes = this.element.querySelectorAll("input[type='checkbox']");
        [...clearOptionsCheckboxes].forEach(checkbox => {
            checkbox.addEventListener("change", (e) => {
                if (e.target.checked) {
                    this.store.dispatch('addItemToClear', { item: e.target.value })
                } else {
                    this.store.dispatch('removeItemToClear', { item: e.target.value })
                }
            });
        });
        
        const clearBrowsingDataBtn = this.element.querySelector('.clear-browsing-data');
        clearBrowsingDataBtn && clearBrowsingDataBtn.addEventListener('click', () => {
            if ( confirm('Are you sure you want to clear browsing data?') ) {
                chrome.runtime.sendMessage({ action: 'removeBrowsingData', options: { itemsToBeCleared, clearSince } },
                    () => alert('Successfully cleared!'));
            }
        });

        const privacySettingsBtn = this.element.querySelector('button.cross-link-btn.privacy-settings-btn');
        privacySettingsBtn && privacySettingsBtn.addEventListener('click', () =>
            this.store.dispatch('openSidebar', { newPage: 'privacy' }));
    }
}