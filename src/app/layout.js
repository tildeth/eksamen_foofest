import NavMenu from "@/components/NavMenu";
import Footer from "../components/Footer";
import styles from "@/styles/Layout.module.css"; 
import '@/styles/globals.css';


const Layout = ({ children }) => {
    return (
        
        <div className={styles.layout}>
            <NavMenu />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
