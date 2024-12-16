import { useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { hentLedigePladser, reseverPlads, cancelReservation } from "@/lib/api";
import { useRouter } from "next/router";
import styles from "@/styles/Camping.module.css";

export default function Camping() {
  const {
    area,
    setArea,
    billetter,
    setBilletter,
    resId,
    setResId,
    timer,
    setTimer,
    isTimerActive,
    setIsTimerActive,
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

// Timer logik
useEffect(() => {
  if (isTimerActive && timer > 0) {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown); // Stop timeren ved 0
          cancelReservation(resId); // Aflyse reservationen
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdown); // Clean up interval
  }
}, [isTimerActive, timer, resId, setTimer]);

  // Format timer til MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

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
    const reservation = await reseverPlads(valgtArea, antal);
    setArea(valgtArea);
    setResId(reservation.id);
    setBilletter({ ...billetter, totalPrice: updatedTotalPrice });
    setIsTimerActive(true); 

    router.push({
      pathname: "/per_oplys",
      query: {
        numTickets: antal,
        timer: timer, 
      },
    });
  } catch (error) {
    console.error("Fejl ved reservation:", error);
  }
};
  const handleTwoPersonTentChange = (e) => {
    // Beregn det samlede antal personer baseret på telte
    const value = Math.min(
      Number(e.target.value),
      Math.floor((totalTickets - threePersonTents * 3) / 2)
    );
    setTwoPersonTents(value);
  };

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
     {isTimerActive && (
        <div>
          <h2>Din reservation er undervejs!</h2>
          <p>Du har {formatTime(timer)} til at bekræfte din reservation.</p>
        </div>
      )}
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
        <label>
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
        disabled={!valgtArea} onClick={viderePersonOp}
      >
        Fortsæt
      </button>
    </section>
  );
}
