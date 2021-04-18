import React from 'react';
import way from '../img/way.png'
import { Image, Row, Col } from 'antd'
import './animation.css'
import spaceman1 from '../img/spaceman1.svg'
import planet1 from '../img/planet1.svg'
import planet2 from '../img/planet2.svg'
import planet3 from '../img/planet3.svg'
import planet4 from '../img/planet4.svg'
import planet5 from '../img/planet5.svg'
import planet12 from '../img/12.svg'
import planet23 from '../img/23.svg'
import planet34 from '../img/34.svg'
import planet45 from '../img/45.svg'
const styles = {
    container: {
        position: 'relative',
        margin: "15px 0"
    },
    
}

const Map = ({ stage }) => {
    return (
        <div className="container">
            <Row>
                <Col span={6} offset={1}>
                    <div style={{background: "#20409A", padding: '15px', borderRadius: 4, border: '2px solid #F8A62B', margin: '60px 0'}}>
                        <table style={{color: 'white', fontSize: "20px", width: '100%'}}>
                            <tr>
                                <td>Пройдено:</td>
                                <td>1 модуль из 5</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>19 тестов из 60</td>
                            </tr>
                            <tr>
                                <td>Выполнено:</td>
                                <td>0 заданий из 25</td>
                            </tr>
                            <tr>
                                <td>Прочитано:</td>
                                <td>12 книг из 48</td>
                            </tr>
                            <tr>
                                <td>Получено:</td>
                                <td>10 артефактов из 50</td>
                            </tr>
                        </table>
                    </div>
                    
                    <img src={spaceman1} style={{width: '100%', marginTop: '160px'}}/>
                </Col>
                <Col span={14} offset={1} style={{position: 'relative', height: '100vh'}}>
                    <img src={planet5} style={{position: 'absolute', width: '150px', marginTop: '150px', left: 60, bottom: 590,  opacity: .3}}/>
                    <div style={{position: 'absolute', left: 55, bottom:580, color: 'white',fontSize: 18}}>5.Планета СЕРВЕРОВ</div>
                    <div style={{position: 'absolute',color: 'white',fontSize: 18,bottom:735, left:380}}>4. Планета АЛГОРИТМОВ</div>
                    <div style={{position: 'absolute',color: 'white',fontSize: 18,bottom:230, left: 505}}>3. Планета ANDROID</div>
                    <div style={{position: 'absolute',color: 'white',fontSize: 18,bottom: 520, left: 230}}>2. Планета ОРИЕНТИРОВ</div>
                    <div style={{position: 'absolute',color: 'white',fontSize: 18,bottom: 230, left: 20}}>1. Планета JAVA</div>
                    <img src={planet1} style={{position: 'absolute', width: '150px', marginTop: '450px', bottom: 240}}/>
                    <img src={planet12} style={{position: 'absolute', width: '150px', marginTop: '450px', bottom: 320, left: 140, }}/>
                    <img src={planet23} style={{position: 'absolute', width: '150px', marginTop: '450px', bottom: 335, left: 360, opacity: .3}}/>
                    <img src={planet34} style={{position: 'absolute', marginTop: '450px', height: 200, bottom: 395,left: 510,opacity: .3}}/>
                    <img src={planet45} style={{position: 'absolute', marginTop: '450px', width: 215, bottom: 685,left: 200,opacity: .3}}/>
                    <img src={planet4} style={{position: 'absolute', width: '150px', marginTop: '220px', left: 405, bottom: 575,  opacity: .3}}/>
                    <img src={planet2} style={{position: 'absolute', width: '150px', marginTop: '400px',bottom: 360, left: 250,  opacity: .3}}/>
                    <img src={planet3} style={{position: 'absolute', width: '150px', marginTop: '370px', bottom: 235, left: 505,  opacity: .3}}/>
                </Col>
            </Row>
        </div>
    );
}

export default Map;
