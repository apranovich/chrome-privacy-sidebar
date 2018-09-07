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

const addItemToClear = (state, { item }) => ({
    privacy: { ...state.privacy },
    history: { 
        clearSince: state.history.clearSince,
        itemsToBeCleared: [ ...state.history.itemsToBeCleared, item ]
    },
    sidebarPage: state.sidebarPage
});

const removeItemToClear = (state, { item }) => {
    const index = state.history.itemsToBeCleared.indexOf(item);
    if(index === -1) return state;

    return {
        privacy: { ...state.privacy },
        history: { 
            clearSince: state.history.clearSince,
            itemsToBeCleared: [ 
                ...state.history.itemsToBeCleared.slice(0, index),
                ...state.history.itemsToBeCleared.slice(index + 1)
            ]
        },
        sidebarPage: state.sidebarPage
    }
}

export { togglePrivacyPreference, openSidebar, selectClearTimeframe, addItemToClear, removeItemToClear };