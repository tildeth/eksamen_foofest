"use client"

import Link from "next/link";
import styles from "@/styles/NavMenu.module.css";
import Cart from "./Cart";

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          FooFest
        </Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="/schedule">
            Program
          </Link>
        </li>
        <li>
          <Link href="/billet">
            Køb billet
          </Link>
        </li>
        <li><Cart /></li>
      </ul>
    </nav>
  );
};

export default NavMenu;