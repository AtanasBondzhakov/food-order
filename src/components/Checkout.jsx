import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import useFetch from "../hooks/useFetch.js";
import Error from "./Error.jsx";

const url = 'http://localhost:3000/orders';
const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, isLoading: isSending, error, sendRequest } = useFetch(url, requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    const handleClose = () => {
        userProgressCtx.hideCheckout();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        await sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    };

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
};
