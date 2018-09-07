import storePromise from './store';
import { htmlTemplateToDOMElement, inject, getBody } from './app/utils';
import { topRightButtons, sidebarContainerTemplate } from './app/template';
import SidebarContainer from './components/sidebar';

const addAdditionalWTTButtons = () => {
	const body = getBody();
	const wttTopRightButtons = htmlTemplateToDOMElement(topRightButtons);
	wttTopRightButtons.className = "nt-topright-btns"
	body.appendChild(wttTopRightButtons);
}

const addListeners = (sidebar, store) => {
	const privacyBtn = document.getElementById("privacy-settings-btn");
	const historyBtn = document.getElementById("manage-history-btn");
	const closeBtn = document.getElementById("sidebar-close");

	const showSidebar = () => sidebar.style.width = "250px";
	const hideSidebar = () => sidebar.style.width = "0px";

	privacyBtn.addEventListener('click', () => {
		showSidebar();
		store.dispatch('openSidebar', { newPage: 'privacy' });
	});
	historyBtn.addEventListener('click', () => {
		showSidebar();
		store.dispatch('openSidebar', { newPage: 'history' });
	});
	closeBtn.addEventListener('click', () => {
		hideSidebar();
	});
}

const injectSidebar = (root) => {
	const sidebarDOM = htmlTemplateToDOMElement(sidebarContainerTemplate);
	inject(root, sidebarDOM);
	return sidebarDOM;
}

const start = async () => {
	addAdditionalWTTButtons();
	const sidebar = injectSidebar(getBody());

	const store = await storePromise;
	new SidebarContainer(store);

	addListeners(sidebar, store);
}

start();