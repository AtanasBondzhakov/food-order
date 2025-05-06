import logoImage from '../assets/logo.jpg';
import Button from './Button.jsx';

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="Restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly>Cart (0)</Button>
            </nav>
        </header>
    );
};