export const getState = (key = 'forgeSettings') => {
    return new Promise(resolve => {
        chrome.storage.local.get(key, (state) => {
            resolve(state[key]);
        });
    });
}

export const setState = (state, wrapperObjectKey = 'forgeSettings') => {
    return new Promise(resolve => {
        chrome.storage.local.set({ [wrapperObjectKey]: state }, () => {
            resolve(state);
        });
    });
}