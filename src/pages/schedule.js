import React, { useState } from "react";
import BandItem from "@/components/BandItem";
import ScheduleFilter from "@/components/ScheduleFilter";
import styles from "@/styles/Schedule.module.css";

// Importer dine API funktioner
import { fetchSchedule, fetchBands } from "@/lib/api";

// Server-side props til at hente både programdata og banddata
export async function getServerSideProps() {
  try {
    // Hent programdata og banddata via de eksisterende API-kald
    const scheduleData = await fetchSchedule(); // Kald fetchSchedule

    const bandsData = await fetchBands(); // Kald fetchBands

    if (typeof scheduleData !== "object" || Array.isArray(scheduleData)) {
      throw new Error("Programdata er ikke i forventet format!");
    }

    if (typeof bandsData !== "object" || !Array.isArray(bandsData)) {
      throw new Error("Banddata er ikke i forventet format!");
    }

    // Returner begge datasæt som props
    return {
      props: {
        schedule: scheduleData,
        bands: bandsData,
      },
    };
  } catch (err) {
    console.error("Fejl ved hentning af data:", err);
    return {
      props: {
        schedule: null,
        bands: null,
        error: err.message,
      },
    };
  }
}

const Schedule = ({ schedule, bands, error }) => {
  const [selectedDay, setSelectedDay] = useState(""); // Standard: Alle dage
  const [selectedScene, setSelectedScene] = useState(""); // Standard: Alle scener

  if (!schedule || !bands) return <div>Fejl ved hentning af data: {error}</div>; // Fejl håndtering

  // Filtrering af programdata baseret på valgte dag og scene
  const filteredSchedule = Object.entries(schedule).reduce(
    (acc, [scene, days]) => {
      if (selectedScene && scene !== selectedScene) return acc; // Filtrer scene
      const filteredDays = Object.entries(days).reduce(
        (dayAcc, [day, slots]) => {
          if (selectedDay && day !== selectedDay) return dayAcc; // Filtrer dag
          dayAcc[day] = slots.filter((slot) => !slot.cancelled); // Filtrer aflyste bands
          return dayAcc;
        },
        {}
      );
      if (Object.keys(filteredDays).length) acc[scene] = filteredDays;
      return acc;
    },
    {}
  );

  const getFullDayName = (shortDay) => {
    const dayMap = {
      mon: "MANDAG",
      tue: "TIRSDAG",
      wed: "ONSDAG",
      thu: "TORSDAG",
      fri: "FREDAG",
      sat: "LØRDAG",
      sun: "SØNDAG",
    };
    return dayMap[shortDay] || shortDay;  // Returnerer det fulde navn eller forkortelsen hvis ikke fundet
  };

  return (
    <section className={styles.scheduleSection}>
      <h2 className={styles.scheduleHeader}>
        FooFest Program {selectedDay ? getFullDayName(selectedDay) : "Alle Dage"}
      </h2>

      {/* ScheduleFilter */}
      <ScheduleFilter
        days={["mon", "tue", "wed", "thu", "fri", "sat", "sun"]}
        scenes={Object.keys(schedule)}
        onFilter={(day, scene) => {
          setSelectedDay(day);
          setSelectedScene(scene);
        }}
      />

      

      {/* Filtreret schedule */}
      {Object.keys(filteredSchedule).length > 0 ? (
        Object.entries(filteredSchedule).map(([scene, days]) => (
          <div key={scene} className={styles.sceneSchedule}>
            <h3>{scene}</h3>
            {Object.entries(days).map(([day, slots]) => (
              <div key={day} className={styles.daySchedule}>
                <h4>{selectedDay ? getFullDayName(selectedDay): ""}</h4>
                <ul>
                  {slots.map((slot, index) => {
                    const { act, start, end } = slot;

                    const band = bands.find(
                      (band) => band.name.toLowerCase() === act.toLowerCase()
                    );
                    if (!band) {
                      console.log("Band not found for act:", act);
                      return null;
                    }

                    return (
                      <li
                        key={index}
                      >
                        <div className={styles.slot}>
                          <strong className={styles.slot_strong}>{act}</strong>
                          <p>{`${start} - ${end}`}</p>
                          <p className={styles.genre_band}>{band.genre}</p>
                          <BandItem band={band} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Ingen resultater fundet for de valgte filtre.</p>
      )}
    </section>
  );
};

export default Schedule;
