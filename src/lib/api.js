const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Hent ledige pladser
export const hentLedigePladser = async () => {
  try {
    const response = await fetch(`${baseUrl}/available-spots`);
    if (!response.ok) {
      throw new Error("Fejl ved hentning af pladser");
    }
    const data = await response.json();
    return data; // Returnerer de tilgængelige pladser
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Reserver en plads
export const reseverPlads = async (area, amount) => {
  try {
    const response = await fetch(`${baseUrl}/reserve-spot`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        area,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error("Fejl ved reservation af plads");
    }
    const data = await response.json();
    return data; // Returnerer reservationens ID
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fuldfør reservation
export const completeRes = async (resId) => {
  try {
    const response = await fetch(`${baseUrl}/fullfill-reservation`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: resId,
      }),
    });

    if (!response.ok) {
      throw new Error("Fejl ved at fuldføre reservation!");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Aflys reservation
export const cancelReservation = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/cancel-reservation`, {
      method: "POST",
      headers,
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Fejl ved at aflyse reservation");
    } else {
      console.log("Reservation succesfuldt aflyst");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};