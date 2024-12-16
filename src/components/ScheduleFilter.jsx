import React, { useState } from "react";
import styles from "@/styles/ScheduleFilter.module.css"

const ScheduleFilter = ({ days, scenes, onFilter }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedScene, setSelectedScene] = useState("");

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    onFilter(day, selectedScene); // Opdater filtrering
  };

  const handleSceneChange = (e) => {
    const scene = e.target.value;
    setSelectedScene(scene);
    onFilter(selectedDay, scene); // Opdater filtrering
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

      {/* Dag Filter */}
      <div className={styles.filter}>
        <label htmlFor="day">Vælg Dag:</label>
        <select
         id="day"
          value={selectedDay ? getFullDayName(selectedDay) : ""}
          onChange={handleDayChange}
          className={styles.select}
        >
          <option value="">Alle Dage</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {getFullDayName(day).toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Scene Filter */}
      <div className={styles.filter}>
        <label htmlFor="scene">Vælg Scene:</label>
        <select
          id="scene"
          value={selectedScene}
          onChange={handleSceneChange}
          className={styles.select}
        >
          <option value="">Alle Scener</option>
          {scenes.map((scene) => (
            <option key={scene} value={scene}>
              {scene}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScheduleFilter;
