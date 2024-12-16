// Importer nødvendige hooks og funktioner
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addGuest } from "@/lib/supabase";
import styles from "@/styles/GuestForm.module.css"

const GuestForm = () => {
  const [mainGuest, setMainGuest] = useState({
    fornavn: "",
    efternavn: "",
    adresse: "",
    email: "",
    nummer: "",
    betaling: "",
  });

  const [guests, setGuests] = useState([]); // Liste af ekstra gæster
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { numTickets } = router.query;
    if (numTickets) {
      const ticketCount = parseInt(numTickets, 10) || 1;
      const newGuests = Array(ticketCount - 1).fill({
        fornavn: "",
        efternavn: "",
        adresse: "",
        email: "",
        nummer: "",
        betaling: "",
      });
      setGuests(newGuests);
      console.log("Updated guests:", newGuests); // Log guests here
    }
  }, [router.query]);

  // Håndter ændringer i hovedgæstformularen
  const handleMainGuestChange = (e) => {
    const { name, value } = e.target;
    setMainGuest({ ...mainGuest, [name]: value });
  };

  // Håndter ændringer i gæsteformularerne
  const handleGuestChange = (index, e) => {
    const { name, value } = e.target;
  
    // Kopiér gæstelisten og opdater kun det specifikke indeks
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [name]: value };
  
    setGuests(updatedGuests); // Gem ændringerne
  };

  // Håndter formularindsendelse
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    // Valider hovedgæst og gæster
    const allGuests = [mainGuest, ...guests];
    for (const guest of allGuests) {
      if (!guest.fornavn || !guest.efternavn || !guest.adresse) {
        setError("Alle felter skal udfyldes for hver gæst!");
        return;
      }
    }
  
    console.log("Sending guests:", allGuests); // Log gæsterne før de sendes
  
    try {
      // Send hver gæst til Supabase
      for (const guest of allGuests) {
        await addGuest(
          guest.fornavn,
          guest.efternavn,
          guest.adresse,
          guest.email || "",
          guest.nummer || "",
          mainGuest.betaling || ""
        );
      }
  
      // Redirect til bekræftelsesside
      router.push("/confirmation");
    } catch (err) {
      setError("Der opstod en fejl under indsendelsen. Prøv igen.");
    }
  };
  return (
    <div>
      <form className={styles.guestform} onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personlige oplysninger</legend>

          <label htmlFor="fornavn">Fornavn:</label>
          <input
            id="fornavn"
            type="text"
            name="fornavn"
            value={mainGuest.fornavn}
            onChange={handleMainGuestChange}
            required
            placeholder="Indtast dit fornavn"
          />

          <label htmlFor="efternavn">Efternavn:</label>
          <input
            id="efternavn"
            type="text"
            name="efternavn"
            value={mainGuest.efternavn}
            onChange={handleMainGuestChange}
            required
            placeholder="Indtast dit efternavn"
          />

          <label htmlFor="adresse">Adresse:</label>
          <input
            id="adresse"
            type="text"
            name="adresse"
            value={mainGuest.adresse}
            onChange={handleMainGuestChange}
            required
            placeholder="Indtast din adresse"
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={mainGuest.email}
            onChange={handleMainGuestChange}
            required
            placeholder="Indtast din email"
          />

          <label htmlFor="nummer">Telefonnummer:</label>
          <input
            id="nummer"
            type="text"
            name="nummer"
            value={mainGuest.nummer}
            onChange={handleMainGuestChange}
            required
            placeholder="Indtast dit telefonnummer"
          />

          <fieldset>
            <legend>Betalingsmetode</legend>
            <label>
              <input
                type="radio"
                name="betaling"
                value="kort"
                checked={mainGuest.betaling === "kort"}
                onChange={handleMainGuestChange}
                required
              />
              Kort
            </label>
            <label>
              <input
                type="radio"
                name="betaling"
                value="mobilepay"
                checked={mainGuest.betaling === "mobilepay"}
                onChange={handleMainGuestChange}
                required
              />
              MobilePay
            </label>
          </fieldset>
        </fieldset>

        {guests.map((guest, index) => (
  <div key={index}>
    <h3>Gæst {index + 2}</h3>
    <label htmlFor={`guest-${index}-fornavn`}>Fornavn:</label>
    <input
      type="text"
      id={`guest-${index}-fornavn`}
      name="fornavn"
      value={guest.fornavn}
      onChange={(e) => handleGuestChange(index, e)}
      required
    />

    <label htmlFor={`guest-${index}-efternavn`}>Efternavn:</label>
    <input
      type="text"
      id={`guest-${index}-efternavn`}
      name="efternavn"
      value={guest.efternavn}
      onChange={(e) => handleGuestChange(index, e)}
      required
    />

    <label htmlFor={`guest-${index}-adresse`}>Adresse:</label>
    <input
      type="text"
      id={`guest-${index}-adresse`}
      name="adresse"
      value={guest.adresse}
      onChange={(e) => handleGuestChange(index, e)}
      required
    />
  </div>
        ))}

{error && <p className={styles.error}>{error}</p>}
<button type="submit">Send</button>
      </form>
    </div>
  );
};

export default GuestForm;
