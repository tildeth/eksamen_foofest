import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/router";
import { useState } from "react";

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


    return(
        <section>
            <h1>Vælg biletter</h1>
            <div>
                <label>
                    Standard (799,-)
                    <button type="button" onClick={decreaseRegular}>-</button>
                    <span>{regular}</span>
                    <button type="button" onClick={increaseRegular}>+</button>
                </label>
            </div>
            <div>
                <label>
                    VIP (1299,-)
                    <button type="button" onClick={decreaseVip}>-</button>
                    <span>{vip}</span>
                    <button type="button" onClick={increaseVip}>+</button>
                </label>
            </div>
            <div>
                <h2>Samlet pris: {totalPrice} kr. {totalTickets} stk.</h2>
            </div>
            <p style={{ fontSize: "smaller", color: "gray" }}>
                Billetgebyr: {ticketFee} kr.
            </p>
            <button onClick={videreCamping}>Forsæt til valg af campingplads</button>
        </section>
    );
}