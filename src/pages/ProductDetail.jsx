import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
    const { id } = useParams(); // ✅ fixed
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get("category");

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch('/products.json')
            .then(res => res.json())
            .then(data => {
                const foundProduct = data.find(p => p.id === Number(id));
                setProduct(foundProduct);
            })
            .finally(() => setLoading(false));
    }, [categoryFilter, id]);

    const decrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const increase = () => {
        setQuantity(prev => (prev < 10 ? prev + 1 : 10));
    };

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        navigate('/cart');
    };

    if (loading) return <div className={styles.status}>Loading...</div>;

    if (!product) return <div className={styles.status}>Product Not Found.</div>;

    return (
        <div className={styles.container}>
            <div className={styles.imageBox}>
                <img src={product.image} alt={product.title} className={styles.image} />
            </div>

            <div className={styles.details}>
                <span className={styles.category}>{product.category}</span>
                <h1 className={styles.title}>{product.title}</h1>
                <p className={styles.price}>${product.price}</p>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.quantityBox}>
                    <span className={styles.label}>Quantity</span>
                    <div className={styles.counter}>
                        <button onClick={decrease} className={styles.counterBtn}>-</button>
                        <span className={styles.quantity}>{quantity}</span>
                        <button onClick={increase} className={styles.counterBtn}>+</button>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <button onClick={handleAddToCart} className={styles.addBtn}>Add to Cart</button>
                    <button onClick={() => alert("Order Placed")} className={styles.buyBtn}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
