import {CHANGE_SEARCH_FIELD, REQUEST_ROBOTS_FAILURE, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS} from "./constants";

export const setSearchField = (text) => ({
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }
)

export const requestRobots = () => (dispatch) => {
    dispatch({ type: REQUEST_ROBOTS_PENDING })
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => dispatch({
            type: REQUEST_ROBOTS_SUCCESS,
            payload: users
        }))
        .catch(error => dispatch({type: REQUEST_ROBOTS_FAILURE, payload: error}));
}