import React from 'react';
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import { serverUrl } from '../config'
import axios from 'axios'

const Manage = inject('store')(observer(( { store } ) => {
    const chargeArt = () => {
        axios.post(`${serverUrl}/artefact/add`,{login: store.login}).then(res => console.log(res))
    }
    return (
        <div className="container">
            <Button type="primary" onClick={chargeArt.bind(this)}>Начислить артефакт</Button>
        </div>
    );
}))

export default Manage;
