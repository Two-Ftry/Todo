
import * as actionTypes from './actionTypes';

export const addTodo = (todo) => {
    return {
        type: actionTypes.ADD_TODO,
        item: todo
    };
}

export const changeFilter = (filter) => {
    return {
        type: actionTypes.VISIBLE_FILTER,
        text: filter
    };
}


/**
 * 判断是否完成
 * @param {Boolean} isCompleted
 */
export const setCompleted = (todoItem) => {
    return {
        type: actionTypes.SET_COMPLETED,
        todoItem
    };
}