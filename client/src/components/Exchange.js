import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Divider, Select } from 'antd'
import { serverUrl } from '../config'
import {inject, observer } from 'mobx-react'

const { Option } = Select

const Exchange = inject('store')(observer(( { store }) => {
    const [loaded, setLoaded] = useState(0)
    useEffect(() => {
        store.getUsers()
    }, [])
    const handleChangeUser = (item) => {
        axios.get(`${serverUrl}/users/artefacts/${item}`).then(res => {
            console.log(res.data)
            setLoaded(1)
        })
    }
    return (
        <div>
            <Select onChange={handleChangeUser} style={{width: 500}}>
                {store.users.map(item => item != store.login && <Option key={item}>{item}</Option>)}
            </Select>
            {
                loaded && (<Select>
                        {store.userInfo.artefacts.map(item => <Option>{item}</Option>)}
                    </Select>)
            }
            {   loaded && (<Select>
                        {store.userInfo.artefacts.map(item => <Option>{item}</Option>)}
                    </Select>)
            }
        </div>
    );
}))

export default Exchange;
