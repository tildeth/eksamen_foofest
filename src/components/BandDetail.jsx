import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchBandBySlug } from "@/lib/api";
import styles from "@/styles/BandDetail.module.css"
import BandImage from "./BandImage";

const BandDetail = () => {
    const [band, setBand] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() =>{
        if(slug) {
            const loadBand = async () => {
                try {
                    const data = await fetchBandBySlug(slug);
                    setBand(data);
                    setLoading(false);
                } catch (error){
                    console.error(error);
                    setLoading(false);
                }
            };
            loadBand();
        }
    }, [slug]);

    if (loading) return <div>Loading band details...</div>;

    if (!band) return <div>Band not found</div>;

    return (
    <section className={styles.bandDetail}>
      <h2 className={styles.bandName}>{band.name}</h2>
      <div className={styles.imageContainer}>
        <BandImage logo={band.logo}  bandName={band.name} />
      </div>
      <p className={styles.info}>
        <strong>Genre:</strong> {band.genre}
      </p>
      <p className={styles.info}>
        <strong>Members:</strong> {band.members.join(", ")}
      </p>
      <p className={styles.info}>
        <strong>Bio:</strong> {band.bio}
      </p>
      <p className={styles.info}>
        <strong>Credits:</strong> {band.logoCredits}
      </p>
    </section>
  );
};
 
export default BandDetail;

 