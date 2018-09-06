"use strict";

(function() {

    const shallowDiff = (newObj, oldObj) =>
        // we assume that each obj[key] has nested { ..., value: true/false } structure
        Object.keys(newObj).reduce((diff, key) => 
            oldObj[key] && newObj[key] && oldObj[key].value !== newObj[key].value
                ? { ...diff, [key]: newObj[key].value }
                : diff 
        ,{});
    
    const setChromePrivacySetting = (settingKey, value) => {
        chrome.privacy.websites[settingKey].set({ value }, () => {
            if (chrome.runtime.lastError === undefined)
                console.log(`Privacy setting changed: ${settingKey} = ${value}`);
            else
                console.log(`Privacy setting didn't change ${chrome.runtime.lastError}`);
        });
    };

    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (changes.forgeSettings && areaName === 'local') {
            const privacySettingsChanges = shallowDiff(
                changes.forgeSettings.newValue.privacy,
                changes.forgeSettings.oldValue ? changes.forgeSettings.oldValue.privacy : {}
            )
            const historySettingsChanges = shallowDiff(
                changes.forgeSettings.newValue.history,
                changes.forgeSettings.oldValue ? changes.forgeSettings.oldValue.history : {}
            )

            if('sendDNT' in privacySettingsChanges) {
                setChromePrivacySetting('doNotTrackEnabled', privacySettingsChanges.sendDNT);
            }
            if('blockCookies' in privacySettingsChanges) {
                setChromePrivacySetting('thirdPartyCookiesAllowed', !privacySettingsChanges.blockCookies);
            }
        }
    });

})();