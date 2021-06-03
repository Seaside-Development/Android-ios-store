import UserActionTypes from '../type/user'

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                // this clears the error on a successful log in
                error: null,
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                /*reassign user value to null when there is a
                success: sign out*/
                currentUser: null,
                error: null
            }
        // Stacked cases no need to write separate case statements
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state
    }
}

export default userReducer;
