import React from 'react';
import PropTypes from 'prop-types';
import './index.scss'
const Form = ({ inputValue, callbackSubmit, handleChangeCallBack }) => {
    const submitQueryParams = (e) => {
        e.preventDefault(); // prevent refresh
        callbackSubmit()
    }
    // arrow function
    const handleChange = e => {
        e.preventDefault()
        handleChangeCallBack(e)
    }
    return (
        <form onSubmit={(e) => submitQueryParams(e)}>
            <div className="form-group">
                <input placeholder="Enter Berlin, DE or Berlin" type="text" name="city" value={inputValue} onChange={(e) => handleChange(e)} required />
                <input type="submit" value="Search" />
            </div>
        </form>
    );
}
Form.propTypes = {
    inputValue: PropTypes.string.isRequired,
    callbackSubmit: PropTypes.func.isRequired,
    handleChangeCallBack: PropTypes.func.isRequired
}
export default Form;