import React, {useEffect, useState} from "react";
import BandItem from "@/components/BandItem";
import { fetchBands } from "@/lib/api";

const BandsPage = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBands = async () => {
      try {
        const data = await fetchBands();
        setBands(data);
      } catch (err) {
        setError("Failed to load bands. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadBands();
  }, []);

  if (loading) return <div className={styles.loading}>Loading bands...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.bandsPage}>
      <h2 className={styles.title}>All Bands</h2>
      <div className={styles.bandsGrid}>
        {bands.map((band) => (
          <BandItem key={band.slug} band={band} />
        ))}
      </div>
    </section>
  );
};
 
export default BandsPage;