import React from 'react';
import './inventory_item.css'

const InventoryItem = ({ name, descr, icon }) => {
    return (
        <div className="inv_item">
            <div className="name">{name}</div>
            <div className="descr">{descr}</div>
            <div className="icon">{icon}</div>
        </div>
    );
}

export default InventoryItem;
