import React from 'react';
import PropTypes from 'prop-types';
import {BsFillBackspaceFill} from "react-icons/bs";
import './styles.css';

class Numpad extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="numpad">
                    <button className="btn" onClick={() => this.props.onKeyPress('1')}>{'1'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('2')}>{'2'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('3')}>{'3'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('4')}>{'4'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('5')}>{'5'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('6')}>{'6'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('7')}>{'7'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('8')}>{'8'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('9')}>{'9'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('<')}>{<BsFillBackspaceFill className='backspace'/>}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('0')}>{'0'}</button>
                    <button className="btn" onClick={() => this.props.onKeyPress('.')}>{','}</button>
                </div>
            </React.Fragment>
        );
    }
}

Numpad.propTypes = {
    onKeyPress: PropTypes.func.isRequired
};

export default Numpad;