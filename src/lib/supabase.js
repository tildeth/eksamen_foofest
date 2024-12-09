const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const headersList = {
    Accept: "application/json",
    "Content-type": "application/json",
    apikey: key,
    Prefer: "return=representation",
};

export async function addFrivillig(navn, nummer, email) {
    const body = JSON.stringify({navn, nummer, email});

    const response = await fetch(url, {
        method:"POST",
        headers: headersList,
        body: body,
    });
    return response.json();
}