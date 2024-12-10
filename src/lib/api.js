
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export async function hentLedigePladser() {
    const response = await fetch(`${baseUrl}/available-spots`, {method: "GET", headers});
    if(!response.ok){
        throw new Error("Kunne ikke hente ledige pladser");
    }
    return response.json();
}

export async function reseverPlads(area, antal) {
    const body = JSON.stringify({area: area, amount: antal});
    const response= await fetch(`${baseUrl}/reserve-spot`, {method: "PUT", headers, body});
    if(!response.ok){
        throw new Error("Fejl ved reservation");
    }
    return response.json();
}

export async function completeRes(resId) {
    const body = JSON.stringify({id: resId});
    const response = await fetch(`${baseUrl}/fullfill-reservation`, {method: "POST", headers, body});
    if(!response.ok){
        throw new Error("Fejl ved at fuldføre reservation!");
    }
    return response.json()
}