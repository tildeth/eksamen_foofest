// Importer nødvendige hooks og funktioner
import { useState } from "react";
import { useRouter } from "next/router";
import { addGuest } from "@/lib/supabase";
const GuestForm = () => {
    const [formData, setFormData] = useState({
        fornavn: "",
        efternavn: "",
        adresse: "",
        email: "",
        nummer: "",
        betaling: ""
    });

    const [error, setError] = useState(null);
    const router = useRouter();

    // Håndter ændringer i inputfelter
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Håndter formularindsendelse
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Nulstil tidligere fejl

        try {
            const result = await addGuest(
                formData.fornavn,
                formData.efternavn,
                formData.adresse,
                formData.email,
                formData.nummer,
                formData.betaling
            );

            if (result.error) {
                throw new Error(result.error.message);
            }

            // Send brugeren videre til /confirmation med parametre
            router.push({
                pathname: "/confirmation",
                query: formData
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                 <legend>Personlige oplysninger</legend>

                <label htmlFor="fornavn">
                    Fornavn: </label>
                    <input
                        id="fornavn"
                        type="text"
                        name="fornavn"
                        value={formData.fornavn}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="given-name"
                        placeholder="Indtast dit fornavn"
                    />
               

                <label htmlFor="efternavn">
                    Efternavn:   </label>

                    <input
                    id="efternavn"
                        type="text"
                        name="efternavn"
                        value={formData.efternavn}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="family-name"
                        placeholder="Indtast dit efternavn"
                    />

                <label htmlFor="adresse">
                    Adresse: </label>
                    <input
                    id="adresse"
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="address-line1"
                        placeholder="Indtast din adresse"
                    />
               

                <label htmlFor="email">
                    Email:</label>
                    <input
                    id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="email"
                        placeholder="Indtast din email"
                    />
                

                <label htmlFor="telefonnummer">
                    Telefonnummer:</label>
                    <input
                    id="nummer"
                        type="text"
                        name="nummer"
                        value={formData.nummer}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="tel"
                        placeholder="Indtast dit telefonnummer"
                    />
                <fieldset>
                    <legend>Betalingsmetode</legend>

                    <label htmlFor="kort">
                <input
                    type="radio"
                    id="kort"
                    name="betaling"
                    value="kort"
                    checked={formData.betaling === 'kort'}
                    onChange={handleChange}
                    required
                    aria-required="true"
                />
                Betal med kort
            </label>
            <label htmlFor="mobilepay">
                <input
                    type="radio"
                    id="mobilepay"
                    name="betaling"
                    value="mobilepay"
                    checked={formData.betaling === 'mobilepay'}
                    onChange={handleChange}
                    required
                    aria-required="true"
                />
                Betal med MobilePay
            </label>
                </fieldset>
                </fieldset>

                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default GuestForm;
