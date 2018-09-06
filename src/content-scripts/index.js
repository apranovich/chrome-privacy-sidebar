import storePromise from './store';
import { htmlTemplateToDOMElement, getBody } from './app/utils';
import { topRightButtons } from './app/template';
import Sidebar from './app/sidebar';
import PrivacySettingsComponent from './components/privacy-settings';
import ManageHistoryComponent from './components/manage-history';

const addAdditionalWTTButtons = () => {
	const body = getBody();
	const wttTopRightButtons = htmlTemplateToDOMElement(topRightButtons);
	wttTopRightButtons.className = "nt-topright-btns"
	body.appendChild(wttTopRightButtons);
}

const addListeners = (sidebarContainer, privacySettingsComponent, manageHistoryComponent) => {
	const privacyBtn = document.getElementById("privacy-settings-btn");
	const historyBtn = document.getElementById("manage-history-btn");
	const closeBtn = document.getElementById("sidebar-close");

	privacyBtn.addEventListener('click', () => {
		sidebarContainer.open();
		privacySettingsComponent.render();
	});
	historyBtn.addEventListener('click', () => {
		sidebarContainer.open();
		manageHistoryComponent.render();
	});
	closeBtn.addEventListener('click', () => {
		sidebarContainer.close();
	});
}

const start = async () => {
	addAdditionalWTTButtons();
	const sidebarContainer = new Sidebar(getBody());
	sidebarContainer.render();

	const store = await storePromise;
	
	const privacySettingsComponent = new PrivacySettingsComponent(store);
	const manageHistoryComponent = new ManageHistoryComponent(store);
	addListeners(sidebarContainer, privacySettingsComponent, manageHistoryComponent);
}

start();

chrome.runtime.sendMessage({
	from: 'content',
	subject: 'showPageAction'
  });