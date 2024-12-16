import React from "react";
import { useBooking } from "@/context/BookingContext";

const Cart = () => {
  const { billetter } = useBooking();
  const totalTickets = billetter.totalTickets;

  return (
    <div>
          {totalTickets} <p>kurv</p>
    </div>
  );
};

export default Cart;
