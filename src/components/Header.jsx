import { useContext } from 'react';
import logoImage from '../assets/logo.jpg';
import Button from './Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartItems = cartCtx.items.reduce((totalItems, item) => totalItems + item.quantity, 0);

    const handleShowCart = () => {
        userProgressCtx.showCart();
    };

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="Restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({cartItems})</Button>
            </nav>
        </header>
    );
};