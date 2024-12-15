import { createContext, useContext, useState } from "react";

// Opret context
const BookingContext = createContext();

// Provider komponent
export function BookingProvider({ children }) {
    const [billetter, setBilletter] = useState({ regular: 0, vip: 0 });
    const [area, setArea] = useState(null);
    const [resId, setResId] = useState(null);

     // Tilføj timer og isTimerActive
     const [timer, setTimer] = useState(300); // Timer starter ved 300 sekunder (5 minutter)
     const [isTimerActive, setIsTimerActive] = useState(false); // Timerens status (aktiv/inaktiv)

    return (
        <BookingContext.Provider value={{ billetter, setBilletter, area, setArea, resId, setResId,  timer, setTimer, 
            isTimerActive, setIsTimerActive }}>
            {children}
        </BookingContext.Provider>
    );
}

// Custom hook til at bruge BookingContext
export const useBooking = () => useContext(BookingContext);