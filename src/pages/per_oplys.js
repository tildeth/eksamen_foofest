import Form from "@/components/GuestForm";
import { useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/router";
import styles from "@/styles/Per_oplys.module.css"
import { completeRes } from "@/lib/api";
import BackButton from "@/components/BackButton";


const personlige_oplysninger = () => {
    const {
        timer,
        setTimer,
        isTimerActive,
        setIsTimerActive,
        resId,
      } = useBooking();
      const router = useRouter();
    
       // Start timeren automatisk når siden loader
  useEffect(() => {
    console.log("Initial timer:", timer); // Log timer værdi ved side-load
    console.log("Initial isTimerActive:", isTimerActive); // Log om timer er aktiv

    if (!isTimerActive) {
      setIsTimerActive(true); // Sæt isTimerActive til true for at starte timeren
      setTimer(50); // Start timeren med 60 sekunder
      console.log("Timeren starter nu!");
    }

    // Timer logik - stop timer ved 0 og omdiriger til reservation-expired hvis ikke bekræftet
    if (isTimerActive && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          console.log("Timerens værdi under nedtælling:", prevTimer); // Log timer under nedtælling

          if (prevTimer === 1) {
            clearInterval(countdown); // Stop timeren ved 0
            // Hvis timeren udløber uden at brugeren har bekræftet reservationen
            router.push("/reservation-expired"); // Gå til reservation-expired
          }
          return prevTimer - 1;
        });
      }, 1000); // Opdater hvert sekund

      return () => clearInterval(countdown); // Ryd op efter komponent
    }
  }, [isTimerActive, timer, resId, router, setTimer, setIsTimerActive]);

  const handleConfirm = async () => {
    try {
      if (!resId) {
        throw new Error("Ingen reservation ID fundet.");
      }

      // Fuldfør reservationen ved bekræftelse
      await completeRes(resId);

      // Stop timeren og redirect til confirmation
      setIsTimerActive(false);  // Stop timeren når brugeren bekræfter
      router.push("/confirmation");  // Gå til confirmation side
    } catch (error) {
      console.error("Fejl ved bekræftelse:", error);
      alert("Der opstod en fejl under bekræftelsen.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

    return (  
        <>
        <BackButton />
        <h1 className={styles.peroplysh1}>Indtast dine oplysninger</h1>
        
        <div className={styles.reservationTimer}>
        <h2>Din reservation er undervejs!</h2>
            <p>Du har {formatTime(timer)} til at bekræfte din reservation.</p>
            </div>
            <p className={styles.resIdStyle}>Reservation ID: {resId}</p>
        <Form onConfirm={handleConfirm}/>
        

        </>
    );
}
 
export default personlige_oplysninger;