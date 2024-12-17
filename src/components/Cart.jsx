import React from "react";
import { useBooking } from "@/context/BookingContext";
import { FaShoppingCart } from "react-icons/fa"; 
import styles from '@/styles/Cart.module.css'; 

const Cart = () => {
  const { totalTickets } = useBooking();

  return (
    <div className={styles.cartContainer}>
      <FaShoppingCart className={styles.cartIcon} />
      {totalTickets > 0 && (
        <div className={styles.ticketCount}>
          {totalTickets}
        </div>
      )}
    </div>
  );
};

export default Cart;
