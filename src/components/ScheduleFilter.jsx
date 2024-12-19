import React, { useState } from "react";
import styles from "@/styles/ScheduleFilter.module.css";

const ScheduleFilter = ({ days, scenes, onFilter }) => {
  const [selectedDay, setSelectedDay] = useState(""); // Track valgt dag
  const [selectedScene, setSelectedScene] = useState(""); // Track valgt scene

  const handleDayChange = (day) => {
    setSelectedDay(day); // Opdater valgt dag
    onFilter(day, selectedScene); // Kald filtrering med valgt dag og scene
  };

  const handleSceneChange = (scene) => {
    setSelectedScene(scene); // Opdater valgt scene
    onFilter(selectedDay, scene); // Kald filtrering med valgt dag og scene
  };

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
    return dayMap[shortDay] || shortDay;
  };

  return (
    <div className={styles.scheduleFilter}>
      {/* Dag Knapper */}
      <div className={styles.filterIndhold}>
        <h3>Vælg Dag:</h3>
        <div className={styles.buttonGroup}>
          <button
            aria-label="vælg alle dage knap"
            onClick={() => handleDayChange("")}
            className={`${styles.filterSelect} ${
              selectedDay === "" ? styles.filterSelectActive : ""
            }`}
          >
            Alle Dage
          </button>
          {days.map((day) => (
            <button
              aria-label="vælg dag knap"
              key={day}
              onClick={() => handleDayChange(day)}
              className={`${styles.filterSelect} ${
                selectedDay === day ? styles.filterSelectActive : ""
              }`}
            >
              {getFullDayName(day)}
            </button>
          ))}
        </div>
      </div>

      {/* Scene Knapper */}
      <div className={styles.filterIndhold}>
        <h3>Vælg Scene:</h3>
        <div className={styles.buttonGroup}>
          <button
            aria-label="knap til valg af alle scener"
            onClick={() => handleSceneChange("")}
            className={`${styles.filterSelect} ${
              selectedScene === "" ? styles.filterSelectActive : ""
            }`}
          >
            ALLE SCENER
          </button>
          {scenes.map((scene) => (
            <button
              key={scene}
              aria-label="knap ti valg af scene"
              onClick={() => handleSceneChange(scene)}
              className={`${styles.filterSelect} ${
                selectedScene === scene ? styles.filterSelectActive : ""
              }`}
            >
              {scene}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleFilter;
