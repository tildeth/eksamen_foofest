import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Billet.module.css";
import BackButton from "@/components/BackButton";

export default function Billet(){
    const {billetter, setBilletter} = useBooking();
    const router = useRouter();

    // Standard og VIP billettens priser
    const regularPrice = 799;
    const vipPrice = 1299;
    const ticketFee= 99;

    // Initialisering af billetterne med standard- eller VIP-værdier fra konteksten
    const [regular, setRegular] = useState(billetter?.regular || 0);
    const [vip, setVip] = useState(billetter?.vip || 0);

     // Beregn den samlede pris
     const totalPrice = (regular * regularPrice) + (vip * vipPrice) + ticketFee;

     // Beregn samlet antal billetter
     const totalTickets = regular + vip;

     // Funktion til at opdatere billetterne og navigere videre
     const videreCamping = () => {
         setBilletter({ regular, vip, totalPrice, totalTickets });
         router.push("/camping");
     };

    //plus og minus knapper
    const increaseRegular = () => setRegular(regular + 1)
    const decreaseRegular = () => setRegular(regular > 0 ? regular - 1 : 0);

    const increaseVip = () => setVip(vip + 1);
    const decreaseVip = () => setVip(vip > 0 ? vip - 1 : 0);


    return (
        <section className={styles.ticketSection}>
          <BackButton />
          <h1 className={styles.heading}>Vælg billetter</h1>
          
          <div className={styles.ticketType}>
            <label className={styles.ticketLabel}>
              Standard (799,-)
              <div className={styles.counter}>
                <button type="button" className={styles.counterButton} onClick={decreaseRegular}>
                  -
                </button>
                <span className={styles.ticketCount}>{regular}</span>
                <button type="button" className={styles.counterButton} onClick={increaseRegular}>
                  +
                </button>
              </div>
            </label>
          </div>
          <div className={styles.ticketType}>
            <label className={styles.ticketLabel}>
              VIP (1299,-)
              <div className={styles.counter}>
                <button type="button" className={styles.counterButton} onClick={decreaseVip}>
                  -
                </button>
                <span className={styles.ticketCount}>{vip}</span>
                <button type="button" className={styles.counterButton} onClick={increaseVip}>
                  +
                </button>
              </div>
            </label>
          </div>
          <div className={styles.summary}>
            <h2 className={styles.total}>
              Samlet pris: <span>{totalPrice} kr.</span> ({totalTickets} stk.)
            </h2>
            <p className={styles.fee}>Billetgebyr: {ticketFee} kr.</p>
          </div>
          <button className={styles.nextButton} onClick={videreCamping}>
            Fortsæt til valg af campingplads
          </button>
        </section>
      );
    }