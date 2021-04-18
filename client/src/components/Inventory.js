import React, {useState} from 'react';
import { Tabs } from 'antd'
import InventoryGrid from './InventoryGrid';
import { observer, inject } from 'mobx-react'
import { StickyContainer, Sticky } from 'react-sticky'
import { render } from 'jade';
import './inventory.css'

const { TabPane } = Tabs

const styles = {
    container: {
        padding: "40px 0",
    },
    tab:{
        width: "100%",
        borderRadius: '4px',
        border: '4px solid #F8A62B;'
    }
}

const renderTabbar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({ style }) => (
            <DefaultTabBar {...props} className="custom-tab-bar" style={{...style}}/>
        )}
    </Sticky>
)

const Inventory = inject('store')(observer(({ store }) => {
    const callback = (key) => {
        console.log(key)
    }
    return (
        <div style={styles.container}>
            <h2 style={{textAlign: 'center', color: 'white'}}>Инвентарь</h2>
            <StickyContainer>
                <Tabs onChange={callback} style={styles.tab} renderTabBar={renderTabbar}>
                    <TabPane tab="Инвентарь" key='1'>
                        <InventoryGrid data={store.userInfo && (store.userInfo.artefacts || [])}/>
                    </TabPane>
                    <TabPane tab="Еда" key='2'>
                        <InventoryGrid data={store.userInfo && (store.userInfo.food || [])}/>
                    </TabPane>
                    <TabPane tab="Кислород" key='3'>
                        <InventoryGrid data={store.userInfo && (store.userInfo.oxygen || [])}/>
                    </TabPane>
                </Tabs>
            </StickyContainer>
        </div>
    );
}))

export default Inventory;
