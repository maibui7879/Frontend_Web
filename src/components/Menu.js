import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/menu')
            .then(response => setMenu(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Menu</h1>
            <div>
                {menu.map(item => (
                    <div key={item.id}>
                        <img src={item.image_url} alt={item.name} width="100" />
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>{item.price} VND</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
