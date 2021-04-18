import React from 'react';
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import axios from 'axios'

const Manage = inject('stote')(observer(( { store } ) => {
    const chargeArt = () => {
        axios.post('http://80.78.207.245:3001/artefact/add',{login: store.login}).then(res => console.log(res))
    }
    return (
        <div className="container">
            <Button type="primary" onClick={chargeArt.bind(this)}>Начислить артефакт</Button>
        </div>
    );
}))

export default Manage;
