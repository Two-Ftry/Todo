import { connect } from 'react-redux';
import Filter from './Filter';
import * as todoAction from '../../actions/todoAction';

const mapStateToProps = (state) => {
    return {
        visibleFilter: state.visibleFilter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFilterClick: (filter) => {
            dispatch(todoAction.changeFilter(filter));
        }
    };
};

const VisibleFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default VisibleFilter;