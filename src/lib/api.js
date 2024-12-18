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
    return data.id; // Returnerer reservationens ID
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



//********DEL 2*******

// Hent alle bands
export const fetchBands = async () => {
  try {
    const response = await fetch(`${baseUrl}/bands`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Fejl ved hentning af bands");
    }

    const data = await response.json();
    return data; // Returnerer alle bands
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hent et band baseret på slug
export const fetchBandBySlug = async (slug) => {
  try {
    const response = await fetch(`${baseUrl}/bands/${slug}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Fejl ved hentning af band med slug: ${slug}`);
    }

    const data = await response.json();
    return data; // Returnerer information om et specifikt band
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hent festivalens tidsplan
export const fetchSchedule = async () => {
  try {
    const response = await fetch(`${baseUrl}/schedule`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Fejl ved hentning af tidsplan");
    }

    const data = await response.json();
    return data; // Returnerer festivalens tidsplan
  } catch (error) {
    console.error(error);
    throw error;
  }
};


