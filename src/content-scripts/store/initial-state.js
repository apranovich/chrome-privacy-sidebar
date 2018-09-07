export const initialState = {
    privacy: {
        'blockCookies': {
            value: true,
            label: 'Block 3rd-party cookies'
        },
        'searchHistoryTracking': {
            value: true,
            label: 'Search History Tracking'
        },
        'privateSearchHistory': {
            value: false,
            label: 'Private Search History'
        },
        'noAds': {
            value: true,
            label: 'No targeted ads'
        },
        'sendDNT': {
            value: true,
            label: 'Send "Do NOT track"'
        },
        'HTTPS': {
            value: true,
            label: 'HTTPS Everywhere'
        },
        'incognito': {
            value: false,
            label: 'Incognito mode'
        }                                                
    },
    history: {
        clearSince: 'all', // 4w, 7d, 24h, 1h
        itemsToBeCleared: [
            'history',
            'downloads',
            'cookies',
            'cache',
            'passwords',
            'formData'
        ]
    },
    sidebarPage: ''
};