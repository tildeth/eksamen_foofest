import NavMenu from "@/components/NavMenu";
import styles from "../styles/Layout.module.css"; 

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <NavMenu />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
