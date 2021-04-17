import React from 'react';
import { Button } from 'antd'
import axios from 'axios'

const Manage = () => {
    const chargeArt = () => {
        axios.post('http://80.78.207.245:3001/artefact/add',{login:'@Homi4us'}).then(res => console.log(res))
    }
    return (
        <div className="container">
            <Button type="primary" onClick={chargeArt.bind(this)}>Начислить артефакт</Button>
        </div>
    );
}

export default Manage;
