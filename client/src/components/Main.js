import React from 'react';
import { Row, Col} from 'antd'
import { observer, inject } from 'mobx-react'
import Stats from './Stats'
import Inventory from './Inventory';


const Main = () => {
    return (
        <div className="container" id="main">
            <Row>
                <Col span={7} offset={3}>
                    <Stats />
                </Col>
                <Col span={10} offset={3}>
                    <Inventory />
                </Col>
            </Row>
        </div>
    );
}

export default Main;
