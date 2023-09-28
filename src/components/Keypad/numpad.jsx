import React from 'react';
import PropTypes from 'prop-types';
import {BsFillBackspaceFill} from "react-icons/bs";
import './numpad.css';

class Numpad extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="numpad">
                    <div className="btn" onClick={() => this.props.onKeyPress('1')}>{'1'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('2')}>{'2'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('3')}>{'3'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('4')}>{'4'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('5')}>{'5'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('6')}>{'6'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('7')}>{'7'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('8')}>{'8'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('9')}>{'9'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('<')}>{<BsFillBackspaceFill className='backspace'/>}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('0')}>{'0'}</div>
                    <div className="btn" onClick={() => this.props.onKeyPress('.')}>{','}</div>
                </div>
            </React.Fragment>
        );
    }
}

Numpad.propTypes = {
    onKeyPress: PropTypes.func.isRequired
};

export default Numpad;