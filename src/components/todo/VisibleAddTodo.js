import { connect } from 'react-redux';
import AddTodo from './AddTodo';
import * as todoAction from '../../actions/todoAction';

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddTodo: (text) => {
            dispatch(todoAction.addTodo(text))
        }
    };
};

const VisibleAddTodo = connect(() => {return {};}, mapDispatchToProps)(AddTodo);

export default VisibleAddTodo;