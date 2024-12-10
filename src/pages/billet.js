import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Billet(){
    const {billetter, setBilletter} = useBooking();
    const router = useRouter();

    const [regular, setRegular] = useState(billetter?.regular || 0);
    const [vip, setVip] = useState(billetter?.vip || 0);

    const videreCamping = () => {
        // Opdaterer billetter med de nye værdier
        setBilletter({ regular, vip });
        // Naviger til camping-siden
        router.push("/camping");
    };
    
    return(
        <section>
            <h1>Vælg biletter</h1>
            <div>
                <label>
                    Standard (799,-)
                    <input type="number" value={regular} onChange={(e) => setRegular(+e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    VIP (1299,-)
                    <input type="number" value={vip} onChange={(e) => setVip(+e.target.value)} />
                </label>
            </div>
            <button onClick={videreCamping}>Forsæt til valg af campingplads</button>
        </section>
    );
}