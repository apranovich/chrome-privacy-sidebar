import Component from '../core/component';
import PrivacySettingsComponent from './privacy-settings'
import ManageHistoryComponent from './manage-history';
import { htmlTemplateToDOMElement } from '../app/utils';

export default class SidebarContainer extends Component {
    constructor(store) {
        const element = document.getElementById('sidebarContainer');
        super(store, element);

        this.childrenPool = {
            privacy: {
                instance: null, type: PrivacySettingsComponent
            },
            history: {
                instance: null, type: ManageHistoryComponent
            }
        };
        this.innerDOM = htmlTemplateToDOMElement(`<div id="appRoot"></div>`);
    }

    initChildren() {
        const currentPageToRender = this.store.state.sidebarPage; // either `privacy` or `history`
        // if child component that needs to be rendered hasn't been created yet, let's do that
        if ( !this.childrenPool[ currentPageToRender ].instance ) {
            const ChildComponentType = this.childrenPool[ currentPageToRender ].type;
            this.childrenPool[ currentPageToRender ].instance = new ChildComponentType(this.store);
        }
    }

    renderInnerDOM  () {
        // if div#appRoot node (with insides) was injected once - don't override it with `innerHTML`,
        // but detach it and attach again, since in that case it doesn't break reference to this node in child components
        if(this.innerDOM.parentNode === this.element)
            this.element.removeChild(this.innerDOM);

        this.element.appendChild(this.innerDOM);
    }

    render() {
        this.renderInnerDOM();
        this.initChildren();
        const child = this.childrenPool[ this.store.state.sidebarPage ].instance;
        child.render();
    }
}