import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from './Cart.module.css';

const Cart = () => {
    const {cart, removeFromCart, clearCart, totalItems, totalPrice} = useCart();
    const navigate = useNavigate();

    if(cart.length === 0) {
        return(
            <div className={styles.empty}>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <button className={styles.shopBtn} onClick={() => navigate('/products')}>
                    Browse Products
                </button>
            </div>
        );
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.heading}>
                Your Cart
                <span className={styles.count}>{totalItems} items</span>
            </h1>

            <div className={styles.itemList}>
                {cart.map(item => (
                    <div key={item.id} className={styles.item}>

                        <div className={styles.imageBox}>
                            <img src={item.image} alt={item.title} className={styles.image} />
                        </div>

                        <div className={styles.details}>
                            <h3 className={styles.title}>{item.title}</h3>

                            <p className={styles.price}>
                                ${item.price} x {item.quantity}
                            </p>

                            <p className={styles.subtotal}>
                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </p>

                            <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                                Remove
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span>Total items</span>
                    <span>{totalItems}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span>Total Price</span>
                    <span className={styles.totalPrice}>${totalPrice}</span>
                </div>
            </div>

            <button className={styles.checkoutBtn} onClick={() => alert('Order placed successfully!')}>
                Proceed to Checkout
            </button>

            <button className={styles.clearBtn} onClick={clearCart}>
                Clear Cart
            </button>
        </div>
    );
}

export default Cart;