import React from 'react';

class Filter extends React.Component {
    render () {
        return (
            <div className="filter-box">
                <a href="javascript:void(0);" onClick={() => { this.handleClick('SHOW_ALL') }}>Show All</a>
                &nbsp;&nbsp;
                <a href="javascript:void(0);" onClick={() => { this.handleClick('ACTIVE') }}>Active</a>
                &nbsp;&nbsp;
                <a href="javascript:void(0);" onClick={() => { this.handleClick('COMPLETED') }}>Completed</a>
            </div>
        );
    }

    handleClick = (filter) => {
        this.props.handleFilterClick 
            && this.props.handleFilterClick(filter);
    }
}

export default Filter;