import React from 'react';
import PropTypes from 'prop-types';
import {BsFillBackspaceFill} from "react-icons/bs";

class Numpad extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="grid grid-cols-3 m-1">
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('1')}>{'1'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('2')}>{'2'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('3')}>{'3'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('4')}>{'4'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('5')}>{'5'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('6')}>{'6'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('7')}>{'7'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('8')}>{'8'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('9')}>{'9'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('<')}>{<BsFillBackspaceFill className='backspace'/>}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('0')}>{'0'}</button>
                    <button className="flex justify-center items-center bg-grey4 w-[110px] h-[110px] md:w-[150px] md:h-[150px] xl:w-[150px] xl:h-[150px] text-white text-[40px] m-2 md:m-4 xl:m-4" onClick={() => this.props.onKeyPress('.')}>{','}</button>
                </div>
            </React.Fragment>
        );
    }
}

Numpad.propTypes = {
    onKeyPress: PropTypes.func.isRequired
};

export default Numpad;