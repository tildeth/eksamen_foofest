"use client"

import Link from "next/link";
import styles from "@/styles/NavMenu.module.css";

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
          <Link href="/bands">
            Bands
          </Link>
        </li>
        <li>
          <Link href="/schedule">
            Schedule
          </Link>
        </li>
        <li>
          <Link href="/billet">
            Buy Tickets
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;