import { useContext, useState } from "react";

const UserProgressContext = useContext({
    progress: '',
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { },
});

export const UserProgressContextProvider = ({ children }) => {
    const [userProgress, setUserProgress] = useState('');

    const showCart = () => {
        setUserProgress('cart');
    };

    const hideCart = () => {
        setUserProgress('');
    };

    const showCheckout = () => {
        setUserProgress('checkout');
    };

    const hideCheckout = () => {
        setUserProgress('');
    };

    const userProgressValues = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    };

    return (
        <UserProgressContext.Provider value={userProgressValues}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext;