import React, { useEffect, useState } from "react";
import { fetchSchedule } from "@/lib/api";

const Schedule = () => {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const data = await fetchSchedule();
        if (typeof data !== "object" || Array.isArray(data)) {
          throw new Error("Programdata er ikke i forventet format!");
        }
        setSchedule(data);
      } catch (err) {
        console.error("Fejl ved hentning af program:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, []);

  if (loading) return <div>Loading program...</div>;
  if (error) return <div>Fejl: {error}</div>;

  return (
    <section>
      <h2>Program FooFest 2025</h2>
      {Object.keys(schedule).map((scene) => (
        <div key={scene}>
          <h3>{scene}</h3>
          {Object.keys(schedule[scene]).map((day) => (
            <div key={day}>
              <h4>{day.toUpperCase()}</h4>
              <ul>
                {schedule[scene][day].map((slot, index) => (
                  <li key={`${scene}-${day}-${index}`}>
                    {slot.act === "break"
                      ? `Break from ${slot.start} to ${slot.end}`
                      : `${slot.act} from ${slot.start} to ${slot.end}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Schedule;
