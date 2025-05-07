import { useContext } from 'react';
import logoImage from '../assets/logo.jpg';
import Button from './Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);

    const cartItems = cartCtx.items.reduce((totalItems, item) => totalItems + item.quantity, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="Restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({cartItems})</Button>
            </nav>
        </header>
    );
};