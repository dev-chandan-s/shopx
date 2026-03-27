import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/themeContext";
import { Sun, Moon } from "lucide-react";
import styles from './Navbar.module.css';

const Navbar = () => {

    const {totalItems} = useCart();

    const { isDark, toggleTheme } = useTheme();

    return(
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>ShopX</Link>
            <div className={styles.links}>
                <Link to="/products">Products</Link>
                <Link to="/cart" className={styles.cartLink}>
                    Cart
                    {totalItems > 0 && (
                        <span className={styles.bagde}>{totalItems}</span>
                    )}
                </Link>

                <div className={styles.themeToggle} onClick={toggleTheme}>

                    <span className={`${styles.themeIcon} ${!isDark ? styles.activeIcon : ''}`}>
                        <Sun size={16} strokeWidth={2} />
                    </span>

                    <div className={`${styles.track} ${isDark ? styles.trackDark : ''}`}>
                        <div className={`${styles.thumb} ${isDark ? styles.thumbDark : ''}`} />
                    </div>

                    <span className={`${styles.themeIcon} ${isDark ? styles.activeIcon : ''}`}>
                        <Moon size={16} strokeWidth={2} />
                    </span>
                    
                </div>
            </div>
        </nav>
    );
}
export default Navbar;