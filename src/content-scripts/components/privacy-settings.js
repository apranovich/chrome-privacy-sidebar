import Component from '../core/component';

export default class PrivacySettingsComponent extends Component {
    constructor(store) {
        const element = document.getElementById('appRoot');
        const componentName = 'PrivacySettingsComponent';
        super(store, element, componentName);
    }

    render() {
        const privacySettings = this.store.state.privacy;
        this.element.innerHTML = `
            <div id="privacy-settings">
                <div>Privacy Settings</div>
                ${Object.keys(privacySettings).map(key => 
                    `<div>
                        ${ privacySettings[key].label }
                        <label class="switch">
                            <input type="checkbox" data-key="${ key }" ${ privacySettings[key].value ? 'checked' : '' }>
                            <span class="slider round"></span>
                        </label>
                    </div>`
                ).join('')}
                <button class="cross-link-btn manage-history-btn">Manage History</button>            
            </div>
        `;

        const privacyTogglers = this.element.querySelectorAll("input[type='checkbox']");
        [...privacyTogglers].forEach(toggler => {
            toggler.addEventListener("change", (e) => {
                const key = e.target.dataset['key'];
                this.store.dispatch('togglePrivacyPreference', { key, value: e.target.checked }, this.initiator)
            });
        });

        const manageHistoryBtn = this.element.querySelector('button.cross-link-btn.manage-history-btn');
        manageHistoryBtn && manageHistoryBtn.addEventListener('click', () =>
            this.store.dispatch('openSidebar', { newPage: 'history' }));
    }
}