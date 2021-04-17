import React from 'react';
import way from '../img/way.png'
import { Image } from 'antd'
import './animation.css'

const styles = {
    container: {
        position: 'relative',
        margin: "15px 0"
    },
    
}

const Map = ({ stage }) => {
    return (
        <div style={styles.container}>
            <Image src={way} preview={false} />
            <div style={{position: 'absolute', bottom: '230px', left: '440px'}}>
                <div style={{position: 'relative'}}>
                    <div className="plannet"></div>
                    <div className="shadow"></div>
                </div>
            </div>
            <div style={{position: 'absolute', top: '250px', left: '70px'}}>
                <div style={{position: 'relative'}}>
                    <div className="plannet"></div>
                    <div className="shadow"></div>
                </div>
            </div>
            <div style={{position: 'absolute', top: '100px', left: '470px'}}>
                <div style={{position: 'relative'}}>
                    <div className="plannet"></div>
                    <div className="shadow"></div>
                </div>
            </div>
        </div>
    );
}

export default Map;
