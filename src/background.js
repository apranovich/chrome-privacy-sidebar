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

            if('sendDNT' in privacySettingsChanges) {
                setChromePrivacySetting('doNotTrackEnabled', privacySettingsChanges.sendDNT);
            }
            if('blockCookies' in privacySettingsChanges) {
                setChromePrivacySetting('thirdPartyCookiesAllowed', !privacySettingsChanges.blockCookies);
            }
        }
    });

    chrome.runtime.onMessage.addListener((message, sender) => {
        if(message.action === 'removeBrowsingData' && /hp.mysearch/.test(sender.url)) {
            const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;

            let since = 0; // stands for 'all time'
            switch(message.options.clearSince) {
                case '4w':
                    since = (new Date()).getTime() - 4 * millisecondsPerWeek;
                    break;
                case '7d':
                    since = (new Date()).getTime() - millisecondsPerWeek;
                    break;
                case '24h':
                    since = (new Date()).getTime() - millisecondsPerWeek / 7;
                    break;
                case '1h':
                    since = (new Date()).getTime() - millisecondsPerWeek / (7 * 24);
                    break;
            }
            const itemsToClear = message.options.itemsToBeCleared.reduce((obj, item) => ({ ...obj, [item]: true }), {});
            chrome.browsingData.remove({ since }, { ...itemsToClear });
        }
    });

})();