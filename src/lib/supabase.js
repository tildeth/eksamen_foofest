const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headersList = {
    Accept: "application/json",
    "Content-type": "application/json",
    apikey: key,
    Prefer: "return=representation",
};

export async function addGuest(fornavn, efternavn, adresse, email, nummer, betaling) {
    const body = JSON.stringify({fornavn, efternavn, adresse, email, nummer, betaling});

    const response = await fetch(url, {
        method:"POST",
        headers: headersList,
        body: body,
    });
    const data = await response.json();
   return(data);
}