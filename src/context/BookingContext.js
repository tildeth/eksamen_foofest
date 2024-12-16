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

    // Funktion til at starte timeren
    const startTimer = () => {
        setIsTimerActive(true);
    };

    // Funktion til at stoppe timeren
    const stopTimer = () => {
        setIsTimerActive(false);
    };

    // Funktion til at nulstille timeren
    const resetTimer = () => {
        setTimer(300); // Nulstil timeren til 5 minutter
        setIsTimerActive(false); // Stop timeren
    };

    return (
        <BookingContext.Provider 
            value={{
                billetter,
                setBilletter,
                area,
                setArea,
                resId,
                setResId,
                timer,
                setTimer,
                isTimerActive,
                setIsTimerActive,
                startTimer,  // Funktion til at starte timeren
                stopTimer,   // Funktion til at stoppe timeren
                resetTimer   // Funktion til at nulstille timeren
            }}>
            {children}
        </BookingContext.Provider>
    );
}

// Custom hook til at bruge BookingContext
export const useBooking = () => useContext(BookingContext);
