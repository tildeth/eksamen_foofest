import { useRouter } from "next/router";
import styles from "@/styles/Confirmation.module.css";
import Link from "next/link";

const Confirmation = () => {
  const router = useRouter();
  const { mainGuest, guests } = router.query;

  // Håndter hvis dataene ikke er tilgængelige endnu
  if (!mainGuest || !guests) {
    return <p>Indlæser...</p>;
  }

  // Parse query parametre til objekt
  const mainGuestData = JSON.parse(mainGuest);
  const guestsData = JSON.parse(guests);

  return (
    <div className={styles.confirmContainer}>
      <div className={styles.conLay}>
        <h1>Bekræftelse</h1>
        <div className={styles.conLay2}></div>
        <div className={styles.confirmationContent}>
          <h2>Hovedgæst</h2>
          {mainGuestData && (
            <div>
              <p>
                Navn: {mainGuestData.fornavn} {mainGuestData.efternavn}
              </p>
              <p>Adresse: {mainGuestData.adresse}</p>
              <p>Email: {mainGuestData.email}</p>
              <p>Telefon: {mainGuestData.nummer}</p>
              <p>Betaling: {mainGuestData.betaling}</p>
            </div>
          )}

          <h2>Ekstra Gæster</h2>
          {guestsData.map((guest, index) => (
            <div key={index}>
              <p>
                Navn: {guest.fornavn} {guest.efternavn}
              </p>
              <p>Adresse: {guest.adresse}</p>
            </div>
          ))}
        </div>
        <div className={styles.thankYou}>
          <p>
            Tak fordi du har købt billetter! Vi glæder os til at se dig til
            Foofest 2025!
          </p>
          <p>Tjek programmet ud her: </p>

          <Link href="/schedule">
            <button aria-label="Program knap" className={styles.programLink}>Program</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

export async function getServerSideProps() {
  return {
      props: {
          title: "Bekræftelse", 
          description: "Bekræftelse på gennemført køb. Tjek vores program ud!"
      }
  };
}
