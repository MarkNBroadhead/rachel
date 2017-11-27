const initialState = {
    loading: true,
    success: false,
    error: false,
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLICATION_SET_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
            };
        case 'APPLICATION_SET_ERROR':
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        default:
            return state
    }
}

export default app
