import Form from "@/components/GuestForm";
import { useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/router";

const personlige_oplysninger = () => {
    const router = useRouter();
    const { query } = router;
    const { timer, setTimer, isTimerActive } = useBooking();

    useEffect(() => {
        if (isTimerActive && timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        clearInterval(countdown); // Stop timeren
                        // Aflyse reservationen hvis nødvendig
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [isTimerActive, timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;}

    return (  
        <>
        <h1>Indtast dine oplysninger</h1>
        <h2>Din reservation er undervejs!</h2>
            <p>Du har {formatTime(timer)} til at bekræfte din reservation.</p>
        <Form/>

        </>
    );
}
 
export default personlige_oplysninger;