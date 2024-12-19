import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";
import Head from "next/head";
import styles from "@/styles/Layout.module.css"; 
import '@/styles/globals.css';
import ComHead from "@/components/ComHead";


const Layout = ({ children, title, description}) => {
    return (
        
        <div className={styles.layout}>
           <ComHead title={title} description={description}/>
            <NavMenu />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
