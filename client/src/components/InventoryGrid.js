import React from 'react';
import './inventory_grid.css'
import { Image } from 'antd'
import icon_1 from '../img/1.svg'
import icon_2 from '../img/2.svg'
import icon_3 from '../img/3.svg'
import icon_4 from '../img/4.svg'

const icons = [0, icon_1, icon_2, icon_3, icon_4]


const InventoryGrid = ({ data }) => {
    
    return (
        <div className="container-inv">
        {!data ? <div>Инвентарь пуст</div> :
            new Array(20).fill(1).map((item, index) => 
                (<div className={`inv_item ${data[index] ? 'allowed' : 'notallowed'}`}>
                    {data[index] && <Image src={icons[data[index].id]} preview={false} />}
                </div>)
            )}
        </div>
    );
}

export default InventoryGrid;
