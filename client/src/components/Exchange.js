import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Divider, Select, Row, Button } from 'antd'
import { serverUrl } from '../config'
import {inject, observer } from 'mobx-react'

const { Option } = Select

const Exchange = inject('store')(observer(( { store }) => {
    const [loaded, setLoaded] = useState(0)
    const [selectedFrom, setSelectedFrom] = useState(null)
    const [selectedTo, setSelectedTo] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const handleChange = () => {
        axios.post(`${serverUrl}/exchange/create`, {from: store.login, to: selectedUser, artefact_from: selectedFrom, artefact_to: selectedTo}).then(res => {
            console.log(res.data)
        })
    }
    useEffect(() => {
        store.getUsers()
    }, [])
    const handleChangeUser = (item) => {
        axios.get(`${serverUrl}/users/artefacts/${item}`).then(res => {
            store.setEnemyInventory(res.data.artefacts)
            setSelectedUser(item)
            setLoaded(1)
        })
    }
    const handler1 = item => setSelectedFrom(item)
    const handler2 = item => setSelectedTo(item)
    return (
        <div>
        <Row>
            <Select onChange={handleChangeUser} style={{width: 500}}>
                {store.users.map(item => item != store.login && <Option key={item}>{item}</Option>)}
            </Select>
        </Row>
        <Row>
        { loaded && (<Select onChange={handler1} style={{width: 500}}>
                        {store.userInfo.artefacts.map(item => <Option key={item._id}>{item.name}</Option>)}
                    </Select>)
            }
        </Row>
        <Row>
        { loaded && (<Select onChange={handler2}  style={{width: 500}}>
                        {store.enemyInventory.map(item => <Option key={item._id}>{item.name}</Option>)}
                    </Select>)
            }
        </Row>
        <Button type="primary" onClick={handleChange.bind(this)}>Обменяться</Button>
            
        </div>
    );
}))

export default Exchange;
