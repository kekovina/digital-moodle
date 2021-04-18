import React from 'react';
import Kolobok from '../img/col.png';
import { Image, Row, Col, Progress } from 'antd'
import VerticalProgress from './VerticalProgress';
import { inject, observer } from 'mobx-react'
import spaceman from '../img/spaceman.svg'
import o2 from '../img/o2.svg'
import coins from '../img/coins.svg'
import './stats.css'

const styles = {
    container: {
        padding: "40px 0"
    },
    persInfo:{
        background: "#20409A80",
        border: "2px solid #F8A62B",
        padding: "19px",
        minHeight: '100px',
        borderRadius: "4px"
    }

}

const Stats = inject('store')(observer(( { store }) => {
    return (
        <div style={styles.container}>
            <h2 style={{textAlign: 'center', color: 'white'}}>Персонаж</h2>
            <Row justify="center">
                <Col span={24} style={styles.persInfo}>
                    <Row>
                        <Col span={20}>
                            <Progress percent={store.userInfo.oxygen_bar || 0} strokeColor={"#0EA453"} trailColor={"#C2D1FB"} format={(pers, spers) => <Image src={o2} preview={false}/>} />
                            <Progress percent={store.userInfo.food_bar || 0} strokeColor={"#F8A62B"} trailColor={"#C2D1FB"} format={(pers, spers) => <div style={{color: "white"}}>Еда</div>}/>
                        </Col>
                    </Row>
                    <Row justify="space-between" align="center">
                        <Row align="center">
                            <Image src={coins} preview={false} />
                            <span style={{color: "#F8A62B", fontSize: 16}}>{store.userInfo.balance || 0.00}</span>
                        </Row>
                        <span style={{color: "#F8A62B", fontSize: 16}}>45 дней</span>
                    </Row>
                    <Image src={spaceman} preview={false}/>
                    <Row justify="space-between" style={{zIndex: '2'}}>
                        <div className="artif" style={styles.artif}>
                        </div>
                        <div className="artif" style={styles.artif}>
                        </div>
                        <div className="artif" style={styles.artif}>
                        </div>
                        <div className="artif empty" style={styles.artif}>
                        </div>
                    </Row>
                </Col>
            </Row>
            
        </div>
    );
}))

export default Stats;
