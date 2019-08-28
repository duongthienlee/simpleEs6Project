import React from 'react';
import PropTypes from 'prop-types';
import './index.scss'
const TickBox = ({ onClick, label, isActive }) => {
    return (
        <label
            onClick={onClick}
            className="checkbox-container">
            <span className={`checkmark ${isActive ? 'checkmark_active' : ''}`} />
            {label}
        </label>
    );
}

TickBox.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
}
export default TickBox;