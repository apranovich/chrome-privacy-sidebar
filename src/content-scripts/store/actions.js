const togglePrivacyPreference = (state, { key, value }) => ({
    privacy: { 
        ...state.privacy,
        [key]: {
            ...state.privacy[key],
            value
        }
    },
    history: { ...state.history },
    sidebarPage: state.sidebarPage
});

const openSidebar = (state, { newPage }) => ({
    ...state,
    sidebarPage: newPage
})

const selectClearTimeframe = (state, { clearSince }) => ({
    privacy: { ...state.privacy },
    history: { 
        clearSince,
        itemsToBeCleared: [ ...state.history.itemsToBeCleared ]
    },
    sidebarPage: state.sidebarPage
})

const addItemToClear = (state, items) => ({
    privacy: { ...state.privacy },
    history: { 
        clearSince: state.history.clearSince,
        itemsToBeCleared: [ ...state.history.itemsToBeCleared, ...items ]
    },
    sidebarPage: state.sidebarPage
});

const removeItemToClear = (state, items) => ({
    privacy: { ...state.privacy },
    history: { 
        clearSince: state.history.clearSince,
        itemsToBeCleared: state.history.itemsToBeCleared.filter(x => !items.includes(x))
    },
    sidebarPage: state.sidebarPage
});

export { togglePrivacyPreference, openSidebar, selectClearTimeframe, addItemToClear, removeItemToClear };