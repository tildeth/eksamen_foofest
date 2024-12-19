"use client"

import Link from "next/link";
import styles from "@/styles/NavMenu.module.css";
import Cart from "./Cart";

const NavMenu = () => {
  return (
    <nav className={styles.nav} aria-label="Hovednavigation">
      <div className={styles.logo}>
        <Link href="/" aria-label="Gå til forside" >
          FooFest
        </Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="/schedule" aria-label="Gå til program">
            Program
          </Link>
        </li>
        <li>
          <Link href="/billet" aria-label="Gå til billey valg">
            Køb billet
          </Link>
        </li>
        <li><Cart  aria-label="gå til billet valg"/></li>
      </ul>
    </nav>
  );
};

export default NavMenu;