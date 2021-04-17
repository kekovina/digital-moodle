import React from 'react';
import { Row, Col} from 'antd'
import { observer, inject } from 'mobx-react'
import Stats from './Stats'
import Map from './Map';


const Main = () => {
    return (
        <div className="container">
        <Row>
            <Col span={9}>
                <Stats />
            </Col>
            <Col span={12} offset={3}>
                <Map stage={0} />
            </Col>
        </Row>
        </div>
    );
}

export default Main;
