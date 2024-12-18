import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Res-exit.module.css"

//Lavet i sammenarbejde med ChatGPT
const ReservationExpired = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/billet'); 
    }, 5000); 

    return () => clearTimeout(timer); // Clean up the timeout
  }, [router]);

  return (
    <div className={styles.resExit}>
      <h1>Din reservation er annulleret</h1>
      <p>Reservationen er udløbet. Prøv venligst at lave en ny reservation.</p>
      <p>Du bliver omdirigeret om 5 sekunder...</p>
    </div>
  );
};

export default ReservationExpired;
