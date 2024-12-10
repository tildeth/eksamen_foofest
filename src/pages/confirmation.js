import { useRouter } from 'next/router';

const Confirmation = () => {
    const router = useRouter();
    const { fornavn, efternavn, adresse, email, nummer, betaling } = router.query;

    return (
        <section>
            <h1>Bekræftelse</h1>
            <p>Tak for din booking, {fornavn} {efternavn}!</p>
            <p>Adresse: {adresse}</p>
            <p>Email: {email}</p>
            <p>Telefonnummer: {nummer}</p>
            <p>Betalingsmetode: {betaling}</p>
        </section>
    );
};

export default Confirmation;
