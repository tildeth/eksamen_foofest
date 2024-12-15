import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { fetchBandBySlug } from "@/lib/api";

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
        <section>
        <h2>{band.name}</h2>
        <img src={band.logo.startsWith("https://") ? band.logo : `https://YOUR-APP.glitch.me/logos/${band.logo}`} alt={`${band.name} logo`} />
        {band.logoCredits && <p>Logo kreditering: {band.logoCredits}</p>}
        <p><strong>Genre:</strong> {band.genre}</p>
        <p><strong>Members:</strong> {band.members.join(", ")}</p>
        <p><strong>Bio:</strong> {band.bio}</p>
      </section>
    );
}
 
export default BandDetail;