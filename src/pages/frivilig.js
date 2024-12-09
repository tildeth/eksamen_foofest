import {useState} from 'react';
import { addFrivillig } from '@/lib/supabase';

const Frivillig = () => {
    const [navn, setNavn] = useState('');
    const [nummer, setNummer] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

const handleTilmeld = async () => {
    await addFrivillig(navn, nummer, email);
    setMessage('Tak for at melde dig som frivillig!')
    setNavn(''); // Ryder felterne felterne
    setNummer('');
    setEmail('');
}

    return ( 
        <section>
            <h1>Bliv frivillig!</h1>
            <p>
                Beskrivende tekst
            </p>
            <form onSubmit={handleTilmeld}>
                <input
                type='text'
                placeholder='Fulde navn'
                value={navn}
                onChange={(e) => setNavn(e.target.value)}
                />
                    <input
                type='number'
                placeholder='Telefonnummer'
                value={nummer}
                onChange={(e) => setNummer(e.target.value)}
                />
                    <input
                type='email'
                placeholder='E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit'>Tilmeld</button>

            </form>
            {message && <p>{message}</p>}
        </section>
     );
}
 
export default Frivillig;