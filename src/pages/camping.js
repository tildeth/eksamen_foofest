import { useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { hentLedigePladser,reseverPlads } from "@/lib/api";
import { useRouter } from "next/router";

export default function Camping(){
    const {area, setArea, billetter, setBilletter, setResId} = useBooking();

    // Initialiser pladser med en tom array
    const [pladser, setPladser] = useState([]);
    const [valgtArea, setValgtArea] = useState(area);
    const router = useRouter();

    useEffect(() => {
        async function fetchPladser(){
            const data = await hentLedigePladser();
            setPladser(data);
        }
        fetchPladser();
    }, []); // Kald kun én gang ved komponentens første render

    const viderePersonOp = async () => {
        const antal = billetter.regular + billetter.vip;
        const reservation = await reseverPlads(valgtArea, antal);
        setArea(valgtArea);
        setResId(reservation.id);
        router.push("/per_oplys");
    };

    return(
        <section>
            <h1>Vælg campingplads</h1>
            <ul>
                {pladser.map((plads)=>(
                    <li key={plads.area}>
                        <label>
                            <input
                                type="radio"
                                name="camping"
                                value={plads.area}
                                checked={valgtArea === plads.area}
                                onChange={() => setValgtArea(plads.area)}
                            />
                            {plads.area} - {plads.ledig} ledige pladser
                        </label>
                    </li>
                ))}
            </ul>
            <button disabled={!valgtArea} onClick={viderePersonOp}>Forsæt</button>
        </section>
    )
}