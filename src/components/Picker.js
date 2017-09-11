
import React from 'react';
import PropTypes from 'prop-types';

class Picker extends React.Component {
    render () {
        const { value, onChange, options, onFresh } = this.props;
        const optionsTemp = options ? options : ['reactjs', 'frontend'];
        return (
            <div className="picker-box">
                <h1>{value}</h1>
                <select onChange={(e) => { onChange && onChange(e.target.value) }} value={value}>
                    {optionsTemp.map((option) => (<option key={option} value={option}>{option}</option>))}
                </select>
                <button type="button" onClick={() => {
                  onFresh && onFresh()
                }}>刷新</button>
            </div>
        );
    }
}

Picker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    onFresh: PropTypes.func
};

export default Picker;
