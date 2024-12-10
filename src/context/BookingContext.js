import { createContext, useContext, useState } from "react";

// Opret context
const BookingContext = createContext();

// Provider komponent
export function BookingProvider({ children }) {
    const [billetter, setBilletter] = useState({ regular: 0, vip: 0 });
    const [area, setArea] = useState(null);
    const [resId, setResId] = useState(null);

    return (
        <BookingContext.Provider value={{ billetter, setBilletter, area, setArea, resId, setResId }}>
            {children}
        </BookingContext.Provider>
    );
}

// Custom hook til at bruge BookingContext
export const useBooking = () => useContext(BookingContext);