import styles from '@/styles/Footer.module.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'; // Ikoner fra react-icons
import Link from 'next/link';


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.section}>
                <ul className={styles.list}>
                    <li><Link href="/" passHref>Kontakt os</Link></li>
                    <li><Link href="/frivillig" passHref>Frivillig på FooFest</Link></li>
                    <li><Link href="/presse" passHref>Presse</Link></li>
                    <li><Link href="/sponsorer" passHref>Sponsorer</Link></li>
                    <li>Cookiepolitik</li>
                    <li>Persondatapolitik</li>
                </ul>
            </div>

            <div className={styles.section}>
                <h4>Følg os på sociale medier</h4>
                <div className={styles.socialIcons}>
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className={styles.icon} />
                    </ Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className={styles.icon} />
                    </Link>
                    <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <FaTiktok className={styles.icon} />
                    </Link>
                </div>
            </div>
            
            <div className={styles.section}>
                <h4>Sponsorer</h4>
                <div className={styles.sponsors}>
                    <img src="/sponsor1.png" alt="Sponsor 1" className={styles.sponsorImg} />
                    <img src="/sponsor2.png" alt="Sponsor 2" className={styles.sponsorImg} />
                    <img src="/sponsor3.png" alt="Sponsor 3" className={styles.sponsorImg} />
                </div>
            </div>
        </footer>
    );
}
