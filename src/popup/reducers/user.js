const initialState = {
    firstName: '',
    lastName: '',
    gender: null,
    birthdate: null,
    facebook_profile_url: null,
    picture: null,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.user
            };
        default:
            return state
    }
}

export default user
