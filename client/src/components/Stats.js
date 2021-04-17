import React from 'react';
import Kolobok from '../img/col.png';
import { Image, Row, Col } from 'antd'
import VerticalProgress from './VerticalProgress';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80%',
        margin: '20px auto',
        border: '1px solid #c4c4c4',
        background: '#eceaea',
        padding: '30px 15px'
    },
    pers:{
        width: "100%",
        height: '100%'
    },
    progresses:{
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '15px 0'
    },
    art_container:{
        display: 'flex',
        flexWrap: 'wrap',
        width: '65%',
        margin: '0 auto',
        justifyContent: 'space-between'
    },
    art_item: {
        minWidth: '80px',
        minHeight: '80px',
        border: '1px solid black',
        margin: '5px 0'
    }
}

const Stats = () => {
    return (
        <div style={styles.container}>
            <Image src={Kolobok} preview={false} styles/>
            <div style={styles.progresses}>
                <VerticalProgress size={200} color={"red"} value={30} name={'Кушой'}/>
                <VerticalProgress size={200} color={"lightblue"} value={70} name={'Дыши'}/>
            </div>
            <Row align="center" justify="space-around">
                <Col span={4} offset={2} style={styles.art_item}></Col>
                <Col span={4} offset={2} style={styles.art_item}></Col>
                <Col span={4} offset={2} style={styles.art_item}></Col>
                <Col span={4} offset={2} style={styles.art_item}></Col>
            </Row>
        </div>
    );
}

export default Stats;
