
import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

/**
 * 设置todo项是否完成
 * @param {Array} todos 
 * @param {Object} item 
 */
const setTodoItemCompleted = (todos, todo) => {
    for (let i = 0, len = todos.length; i < len; i++) {
        const item = todos[i];
        if (item.id === todo.id && item.isCompleted !== todo.isCompleted) {
            item.isCompleted = todo.isCompleted;
            break;
        }
    }
    return todos;
};

const todos = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return [
                ...state,
                {
                    id: state.length + '',
                    name: action.item,
                    isCompleted: false
                }
            ];
        break;
        case actionTypes.SET_COMPLETED:
            const todos = [...state];
            return setTodoItemCompleted(todos, action.todoItem);
        break;
        default:
            return state
    }
}

const visibleFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case actionTypes.VISIBLE_FILTER:
            return action.text;
        default:
            return state;
    }
}

const reducers = combineReducers({
    visibleFilter,
    todos
});

export default reducers;