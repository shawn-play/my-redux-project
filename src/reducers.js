import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, VISIBILITY_FILTER, VisibilityFilter } from './actions/actions';

const { SHOW_ALL } = VisibilityFilter;

function visibilityFunc(state = SHOW_ALL, action) {
	switch (action.type) {
		case VISIBILITY_FILTER:
		    return action.filter;
		default:
		    return state;
	}
}

function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
		    return [
		        ...state,
		        {
		        	text: action.text,
		        	completed: false
		        }
		    ]
		case TOGGLE_TODO:
		     return [
		         ...state.slice(0, action.index),
		         Object.assign({}, state[action.index], {
		         	completed: !state[action.index].completed
		         }),
		         ...state.slice(action.index + 1)
		    ]
		default:
		    return state
	}
}

const todoApp = combineReducers({
	visibilityFunc,
	todos
})

export default todoApp;