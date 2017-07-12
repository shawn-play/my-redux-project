import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, setVisibility, VisibilityFilter } from '../actions/actions';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends Component {
	render() {
		const { dispatch, visibleTodos, visibilityFunc } = this.props;
		return (
            <div>
                <AddTodo
                    onAddClick={text =>
                    	dispatch(addTodo(text))
                    } />
                <TodoList
                    todos={visibleTodos}
					onTodoClick={index =>
					    dispatch(toggleTodo(index))
				    } />
				<Footer
				    filter={visibilityFunc}
				    onFilterChange={nextFilter =>
				       dispatch(setVisibility(nextFilter))
				       } />
            </div>
		)
	}
}

App.PropTypes = {
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	}).isRequired).isRequired,
	visibilityFunc: PropTypes.oneOf([
		'SHOW_ALL',
		'SHOW_COMPLETED',
		'SHOW_ACTIVE'
	]).isRequired
}


function selectTodos(todos, filter) {
	switch (filter) {
		case VisibilityFilter.SHOW_ALL:
		    return todos
		case VisibilityFilter.SHOW_COMPLETED:
		    return todos.filter(todo => todo.completed)
		case VisibilityFilter.SHOW_ACTIVE:
		    return todos.filter(todo => !todo.completed)
	}
}

function select(state) {
	return {
		visibleTodos: selectTodos(state.todos, state.visibilityFunc),
		visibilityFunc: state.visibilityFunc
	}
}

export default connect(select)(App)