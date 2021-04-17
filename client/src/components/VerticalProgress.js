import React, { useState } from 'react';

const styles = {
    container: {
        borderRadius: "50px",
        width: "30px",
        border: '2px solid #c4c4c4',
        position: 'relative'
    },
    filler:{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        transition: 'height 1s ease-in',
        height: 0
    },
    full:{
        borderRadius: '50px'
    },
    notfull:{
        borderBottomLeftRadius: '50px',
        borderBottomRightRadius: '50px'
    },
    name:{
        transform: 'rotate(270deg)',
        fontWeight: 700,
        textTransform: 'uppercase',
        position: 'absolute',
        top: '50%',
        marginTop: '-30%',
        left: '-12px',
    }
}

const VerticalProgress = ({ color, size, value, name }) => {
    const st = value == 100 ? styles.full : styles.notfull
    const [animated, setAnimated] = useState(true)
    setTimeout(() => {
        setAnimated(false)
    }, 1000)
    return (
        <div style={{...styles.container, height: size+'px'}}>
            <div style={{...styles.filler, height: animated ? 0 : Math.floor(value/100*size)+'px' , background: color, ...st}}></div>
            <div style={styles.name}>{name}</div>
        </div>
    );
}

export default VerticalProgress;
