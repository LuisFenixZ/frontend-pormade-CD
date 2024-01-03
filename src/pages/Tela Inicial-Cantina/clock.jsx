import React, { useState, useEffect } from 'react';
import './styles.css';

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            setTime(currentTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        // let am_pm = "AM";

        // if (hours > 12) {
        //     hours -= 12;
        //     am_pm = "PM";
        // }

        // if (hours === 0) {
        //     hours = 12;
        //     am_pm = "AM";
        // }

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // return `${hours}:${minutes}:${seconds} ${am_pm}`;
        return `${hours}:${minutes}:${seconds}`;
    };

    const rotationStyles = {
        hours: {
            transform: `rotateZ(${30 * time.getHours() + time.getMinutes() / 2}deg)`
        },
        minutes: {
            transform: `rotateZ(${6 * time.getMinutes()}deg)`
        },
        seconds: {
            transform: `rotateZ(${6 * time.getSeconds()}deg)`
        }
    };

    return (
        <div className="text-green2 text-center text-[80px] md:text-[120px] xl:text-[80px] font-primary">
            <div id="relogio">{formatTime(time)}</div>
            <div id="hr" style={rotationStyles.hours}></div>
            <div id="mn" style={rotationStyles.minutes}></div>
            <div id="sc" style={rotationStyles.seconds}></div>
        </div>
    );
}

export default Clock;
