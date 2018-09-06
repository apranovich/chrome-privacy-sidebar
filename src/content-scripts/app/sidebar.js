import { htmlTemplateToDOMElement, inject } from './utils';
import { sidebarContainerTemplate } from './template';

export default class Sidebar {
    constructor(root) {
        this.root = root; // DOM element that sidebar to be injected in
        this.sidebar = this.createSidebarDOM();
    }

    createSidebarDOM() {
        return htmlTemplateToDOMElement(sidebarContainerTemplate);
    }

    render() {
        inject(this.root, this.sidebar);
    }

    open() {
        this.sidebar.style.width = "250px";
    }

    close() {
        this.sidebar.style.width = "0";
    }
}