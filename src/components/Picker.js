
import React from 'react';
import PropTypes from 'prop-types';

class Picker extends React.Component {
    render () {
        const { value, onChange, options } = this.props;
        const optionsTemp = options ? options : ['reactjs', 'frontend'];
        return (
            <div className="picker-box">
                <h1>{value}</h1>
                <select onChange={(e) => { onChange && onChange(e.target.value) }} value={value}>
                    {optionsTemp.map((option) => (<option key={option} value={option}>{option}</option>))}
                </select>
            </div>
        );
    }
}

Picker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
};

export default Picker;