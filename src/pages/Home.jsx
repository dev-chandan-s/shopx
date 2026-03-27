import { useNavigate } from "react-router-dom";
import styles from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();

    const categories = [
        {name: "Electronics", emoji: "📱", value: "electronics"},
        {name: "Jewelery", emoji: "💍", value: "jewelery"},
        {name: "Men's clothing", emoji: "👔", value: "men's clothing"},
        {name: "Women's clothing", emoji: "👗", value: "women's clothing"},
    ]

    const features = [
        {emoji: "🚚", title: "Free Delivery", desc: "On all orders above $50"},
        {emoji: "🔒", title: "Secure Payment", desc: "100% secure transactions"},
        {emoji: "↩", title: "Easy Returns", desc: "30 day return policy"},
    ]

    return(
        <div className={styles.page}>

            <section className={styles.hero}>
                <div className={styles.heroContent}>

                    <span className={styles.tag}>New Arrivals 2026</span>

                    <h1 className={styles.heroTitle}>
                        Shop the Latest<br/>
                        <span className={styles.highlight}>Trends</span> on ShopX
                    </h1>

                    <p className={styles.heroDesc}>
                        Discover amazing products at unbeatable prices.
                        From electronics to fashion - we have it all.
                    </p>

                    <button
                        className={styles.heroBtn}
                        onClick={() => navigate('./products')}
                    >
                        Shop Now →
                    </button>
                </div>
            </section>

            <section className={styles.features}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.featureCard}>
                        <span className={styles.featureEmoji}>{feature.emoji}</span>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDesc}>{feature.desc}</p>
                    </div>
                ))}
            </section>

            <section className={styles.categories}>
                <h2 className={styles.sectionTitle}>Shop by Categories</h2>
                <div className={styles.categoryGrid}>
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className={styles.categoryCard}
                            onClick={() => navigate('./products')}
                        >
                            <span className={styles.categoryEmoji}>{cat.emoji}</span>
                            <h3 className={styles.categoryName}>{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;