import React from 'react';
import InventoryItem from './InventoryItem';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '80%',
        margin: '0 auto',
    },
}

const Inventory = () => {
    return (
        <div>
            <h1>Инвентарь</h1>
            <div style={styles.container}>
                <InventoryItem name={"Сапог барсука"} descr={"Легендарный ботинок известного математика"} />
            </div>
        </div>
    );
}

export default Inventory;
