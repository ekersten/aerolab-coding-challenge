import { GET_USER, ADD_POINTS } from '../types';

export default function(state={}, action) {

    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case ADD_POINTS:
            return {
                ...state,
                user: {
                    ...state.user,
                    points: action.payload['New Points']
                }
            }
        default:
            return state
    }

}