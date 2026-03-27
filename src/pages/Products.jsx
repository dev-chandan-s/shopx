import useProducts from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import styles from './Products.module.css'
import { useState } from "react";

const Products = () => {
    const {products, loading, error} = useProducts();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const filteredProducts = products.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "all" || p.category === category;

        return matchSearch && matchCategory;
    });

    if(loading) return <div className={styles.status}>Loading Products...</div>
    if(error) return <div className={styles.status}>{error}</div>

    return(
        <div className={styles.container}>

            <div className={styles.filterBar}>
            <input type="text" placeholder="search products..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />

            <div className={styles.buttons}>
            <button className={styles.button} onClick={() => setCategory("all")}>All</button>
            <button className={styles.button} onClick={() => setCategory("electronics")}>Electronics</button>
            <button className={styles.button} onClick={() => setCategory("jewelery")}>Jewelery</button>
            <button className={styles.button} onClick={() => setCategory("men's clothing")}>Men's</button>
            <button className={styles.button} onClick={() => setCategory("women's clothing")}>Women's</button>
            </div>
            </div>

            <h1 className={styles.title}>All Products</h1>
            <div className={styles.grid}>
                {filteredProducts.length === 0 ? (
                    <p>No products found</p>
                ) : (
                filteredProducts.map(product => (
                    <div key={product.id} className={styles.card} onClick={() => navigate(`/products/${product.id}`)}>
                        <img src={product.image} alt={product.title} className={styles.image} />
                        <div className={styles.info}>
                            <h3 className={styles.name} >{product.title}</h3>
                            <p className={styles.price} >${product.price}</p>
                        </div>
                    </div>
                )
                ))}
            </div>
        </div>
    );
}
export default Products;