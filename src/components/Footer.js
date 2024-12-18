import styles from "@/styles/Footer.module.css";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.section}>
    <h4>Kontakt</h4>
      <ul className={styles.list}>
        <li>
          <Link href="https://kattens-vaern.dk/adopter-en-kat/" passHref>
            Kontakt os
          </Link>
        </li>
        <li>
          <Link href="https://kattens-vaern.dk/stoet-os/bliv-katteven/" passHref>
            Frivillig på FooFest
          </Link>
        </li>
        <li>
          <Link href="https://kattens-vaern.dk/vaerd-at-vide/nyheder-fra-kattens-vaern/" passHref>
            Presse
          </Link>
        </li>
        <li>
          <Link href="https://kattens-vaern.dk/stoet-os/sponsor/" passHref>
            Sponsorer
          </Link>
        </li>
      </ul>
    </div>

    <div className={styles.section}>
      <h4>Følg os på sociale medier</h4>
      <div className={styles.socialIcons}>
        <Link
          href="https://www.facebook.com/KattensVaern"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className={styles.icon} />
        </Link>
        <Link
          href="https://www.instagram.com/kattensvaern/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className={styles.icon} />
        </Link>
        <Link
          href="https://www.tiktok.com/@kattensvaern"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className={styles.icon} />
        </Link>
      </div>
    </div>

    <div className={styles.section}>
      <h4>Sponsorer</h4>
      <div className={styles.sponsors}>
        <Image
          src="/sponsor1.avif"
          alt="Sponsor 1"
          width={150}
          height={150}
          className={styles.sponsorImg}
        />
    
      </div>
    </div>
  </footer>
);

export default Footer;
