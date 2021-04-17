import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import Auth from './components/Auth'
import Main from './components/Main'
import Inventory from './components/Inventory'
import { Menu, Layout } from 'antd'
import './index.css'
import Map from './components/Map'
import Manage from './components/Manage'
const { Sider, Header } = Layout

const pages = [
    {route: 'auth', name: 'Вход', component: <Auth/>},
    {route: 'main', name: 'Главная', component: <Main/>},
    {route: 'inventory', name: 'Инвентарь', component: <Inventory/>},
    {route: 'exchange', name: 'Точка обмена'},
    {route: 'shop', name: 'Магазин'},
    {route: 'map', name: 'Путь обучения', component: <Map/>},
    {route: 'manage', name: 'Управление', component: <Manage/>}
]

 const App = inject("store")(observer(({ store, props })=> {
    useEffect(() => {
        store.getUser()
    }, [])
    return (
    <Layout style={{height: '100vh'}}>
        <Sider style={{background: '#F8A62B'}}>
            <Menu
        mode="inline"
        defaultSelectedKeys={[store.activePage]}
        style={{ height: '100%', borderRight: 0 }}
        >
                {pages.map(page => <Menu.Item key={page.route} onClick={store.setActivePage.bind(this,page.route)}>{page.name}</Menu.Item>)}
            </Menu>
        </Sider>
        <Layout> 
            <Header className='header' ></Header>
            {pages.filter(page => page.route == store.activePage).pop().component}
        </Layout>
    </Layout>)
        
}))


export default App;
