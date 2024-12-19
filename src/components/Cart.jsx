import React from "react";
import { useBooking } from "@/context/BookingContext";
import { FaShoppingCart } from "react-icons/fa"; 
import styles from '@/styles/Cart.module.css'; 
import Link from "next/link";

const Cart = () => {
  const { totalTickets } = useBooking();

  return (
    <div className={styles.cartContainer}>
      <Link href="/billet">
      <FaShoppingCart className={styles.cartIcon} />
      {totalTickets > 0 && (
        <div className={styles.ticketCount}>
          {totalTickets}
        </div>
      )}
      </Link>
    </div>
  );
};

export default Cart;
