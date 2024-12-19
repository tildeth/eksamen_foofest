import { useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { hentLedigePladser, reseverPlads } from "@/lib/api";
import { useRouter } from "next/router";
import styles from "@/styles/Camping.module.css";
import BackButton from "@/components/BackButton";

export default function Camping() {
  const {
    area,
    setArea,
    billetter,
    setBilletter,
    resId,
    setResId,
  } = useBooking();
  const [pladser, setPladser] = useState([]);
  const [valgtArea, setValgtArea] = useState(null);
  const [greenCamping, setGreenCamping] = useState(false);
  const [twoPersonTents, setTwoPersonTents] = useState(0);
  const [threePersonTents, setThreePersonTents] = useState(0);
  const router = useRouter();

 // Hent ledige pladser
 useEffect(() => {
  const fetchPladser = async () => {
    try {
      const data = await hentLedigePladser();
      setPladser(data);
    } catch (error) {
      console.error("Fejl ved hentning af ledige pladser:", error);
    }
  };

  fetchPladser();
}, []);


  const { totalPrice, totalTickets } = billetter;

  const greenCampingPrice = greenCamping ? 249 : 0;
  const twoPersonTentPrice = twoPersonTents * 299;
  const threePersonTentPrice = threePersonTents * 399;
  const updatedTotalPrice =
    totalPrice + greenCampingPrice + twoPersonTentPrice + threePersonTentPrice;

 // Reservér en plads
 const reserverPlads = async () => {
  if (valgtArea) {
    try {
      const valgtPlads = pladser.find((plads) => plads.area === valgtArea);
      
      if (valgtPlads && valgtPlads.available > 0) {
        const response = await reserverPlads(valgtArea, 1); 
        setPladser((prevPladser) =>
          prevPladser.map((plads) =>
            plads.area === valgtArea
              ? { ...plads, available: Math.max(0, plads.available - 1) }
              : plads
          )
        );
        alert("Pladsen er blevet reserveret!");
      } else {
        alert("Ingen ledige pladser i det valgte område.");
      }
    } catch (error) {
      console.error("Fejl ved reservation:", error);
      alert("Der opstod en fejl under reservationen.");
    }
  } else {
    alert("Vælg et område først.");
  }
};
  
const viderePersonOp = async () => {
  try {
    const antal = billetter.totalTickets;

    // Reserver plads og få et reservation ID
    const reservationId = await reseverPlads(valgtArea, antal);

    // Gem værdier i context
    setArea(valgtArea);
    setResId(reservationId);
    setBilletter({ ...billetter, totalPrice: updatedTotalPrice });

    // Naviger til næste side med de relevante data
    router.push({
      pathname: "/per_oplys",
      query: {
        numTickets: antal,
        resId: reservationId, // Send reservation ID som query-parameter
        greenCamping: greenCamping, // Send valgte camping muligheder videre
        twoPersonTents,
        threePersonTents,
      },
    });
  } catch (error) {
    console.error("Fejl ved reservation:", error);
    alert("Der opstod en fejl under reservationen. Prøv igen.");
  }
};

 const handleTwoPersonTentChange = (e) => {
  const value = Math.min(
    Number(e.target.value),
    Math.floor((totalTickets - threePersonTents *3) /2)
  );
 setTwoPersonTents(value)
}


  const handleThreePersonTentChange = (e) => {
    // Beregn det samlede antal personer baseret på telte
    const value = Math.min(
      Number(e.target.value),
      Math.floor((totalTickets - twoPersonTents * 2) / 3)
    );
    setThreePersonTents(value);
  };

  const increaseTwoPersonTents = () =>
    handleTwoPersonTentChange({ target: { value: twoPersonTents + 1 } });
  const decreaseTwoPersonTents = () =>
    handleTwoPersonTentChange({ target: { value: twoPersonTents - 1 } });

  const increaseThreePersonTents = () =>
    handleThreePersonTentChange({ target: { value: threePersonTents + 1 } });
  const decreaseThreePersonTents = () =>
    handleThreePersonTentChange({ target: { value: threePersonTents - 1 } });

  const maxTwoPersonTents = Math.floor(
    (totalTickets - threePersonTents * 3) / 2
  ); // Begræns 2-personers telte baseret på 3-personers telte
  const maxThreePersonTents = Math.floor(
    (totalTickets - twoPersonTents * 2) / 3
  ); // Begræns 3-personers telte baseret på 2-personers telte


  return (
    
    <section className={styles.campingSection}>
      <BackButton />
     <h1 className={styles.heading}>Vælg campingplads</h1>
     
      <ul className={styles.pladsList}>
        {pladser.map((plads) => (
          <li key={plads.area} className={styles.pladsItem}>
            <label>
              <input
                type="radio"
                name="camping"
                value={plads.area}
                checked={valgtArea === plads.area}
                onChange={() => setValgtArea(plads.area)}
              />
              {plads.area} - {plads.spots - plads.available} ledige pladser
            </label>
          </li>
        ))}
      </ul>
      <div className={styles.option}>
        <label aria-label="Green camping valg">
          <input
            type="checkbox"
            checked={greenCamping}
            onChange={() => setGreenCamping(!greenCamping)}
          />
          Green camping option (+249,-)
        </label>
      </div>
      <div className={styles.tentSection}>
        <div className={styles.tentOption}>
          <label>Antal 2-personers telte:</label>
          <div className={styles.tentControls}>
            <button 
            aria-label="minusknap 2 persontelte"
              type="button"
              onClick={decreaseTwoPersonTents}
              disabled={twoPersonTents <= 0}
              className={styles.controlButton}
            >
              -
            </button>
            <input
              type="number"
              value={twoPersonTents}
              onChange={handleTwoPersonTentChange}
              min="0"
              max={maxTwoPersonTents}
              disabled={maxTwoPersonTents === 0}
              className={styles.tentInput}
            />
            <button
              aria-label="plusknap 2 persontelte"
              type="button"
              onClick={increaseTwoPersonTents}
              disabled={twoPersonTents >= maxTwoPersonTents}
              className={styles.controlButton}
            >
              +
            </button>
          </div>
          <p>(299,- per telt)</p>
        </div>
        <div className={styles.tentOption}>
          <label>Antal 3-personers telte:</label>
          <div className={styles.tentControls}>
            <button
              type="button"
              aria-label="minusknap 3 persontelte"
              onClick={decreaseThreePersonTents}
              disabled={threePersonTents <= 0}
              className={styles.controlButton}
            >
              -
            </button>
            <input
              type="number"
              value={threePersonTents}
              onChange={handleThreePersonTentChange}
              min="0"
              max={maxThreePersonTents}
              disabled={maxThreePersonTents === 0}
              className={styles.tentInput}
            />
            <button
              type="button"
              aria-label="plusknap 3 persontelte"
              onClick={increaseThreePersonTents}
              disabled={threePersonTents >= maxThreePersonTents}
              className={styles.controlButton}
            >
              +
            </button>
          </div>
          <p>(399,- per telt)</p>
        </div>
      </div>
      <p className={styles.totalPrice}>
        Samlet pris: {billetter.totalPrice + greenCamping * 249} kr.
      </p>
      <button
        className={styles.submitButton}
        aria-label="forsæt knap"
        disabled={!valgtArea} onClick={viderePersonOp}
      >
        Fortsæt
      </button>
    </section>
  );
}

export async function getServerSideProps() {
  return {
      props: {
          title: "Vælg campingplads", 
          description: "Vælg din campingplads her, og find ekstra tilkøb til din oplevelse!"
      }
  };
}
