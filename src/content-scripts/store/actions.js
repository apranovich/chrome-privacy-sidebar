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

const openPage = (state, { newPage }) => ({
    ...state,
    openedPage: newPage
})

export { togglePrivacyPreference };