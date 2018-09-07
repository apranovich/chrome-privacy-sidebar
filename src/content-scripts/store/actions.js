const togglePrivacyPreference = (state, { key, value }) => ({
    privacy: { 
        ...state.privacy,
        [key]: {
            ...state.privacy[key],
            value
        }
    },
    history: { ...state.history }
});

const openSidebar = (state, { newPage }) => ({
    ...state,
    sidebarPage: newPage
})

export { togglePrivacyPreference, openSidebar };